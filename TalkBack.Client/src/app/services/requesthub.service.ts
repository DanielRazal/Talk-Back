import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { chatEnvironment } from 'src/environments/environment';
import { RequestAcknowledged } from '../models/RequestAcknowledged';
import { ChatRequest } from '../models/ChatRequest';

@Injectable({
  providedIn: 'root'
})
export class RequesthubService {
  private hubConnection?: HubConnection;
  private request  = chatEnvironment.request
  onChatRequest: BehaviorSubject<any> = new BehaviorSubject({});
  onChatRequestAcknowledged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.request).withAutomaticReconnect().build()
    this.hubConnection.start().catch(error => console.log(error));

    //ChatRequest A parameter of the SendRequest function (located in the server)
    this.hubConnection.on("ChatRequest", message => { this.onChatRequest.next(message); });
    
    //ChatRequestAcknowledged A parameter of the SendRequestAcknowledged 
    //function (located in the server)
    this.hubConnection.on("ChatRequestAcknowledged", message => 
    { this.onChatRequestAcknowledged.next(message); });
  }

  //invoke to SendRequest function (located in the server)
  sendRequest(chatRequest: ChatRequest) {
    this.hubConnection?.invoke('SendRequest', chatRequest).catch(error => console.log(error));
  }

  //invoke to SendRequestAcknowledged function (located in the server)
  sendRequestAck(chatRequestAck: RequestAcknowledged) {
    this.hubConnection?.invoke('SendRequestAcknowledged',
     chatRequestAck).catch(error => console.log(error));
  }

  stopConnection(){
    this.hubConnection?.stop();
  }
}
