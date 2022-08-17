import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { chatEnvironment } from 'src/environments/environment';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChathubService {
  private hubConnection?: HubConnection;
  private chatsocket = chatEnvironment.chatsocket;
  onReceiveOne: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.chatsocket).withAutomaticReconnect().build()
    this.hubConnection.start().catch(error => console.log(error));

    //ReceiveOne A parameter of the SendMessage function (located in the server)
    this.hubConnection.on("ReceiveOne", message => { this.onReceiveOne.next(message); });
  }

  //invoke to SendMessage function (located in the server)
  sendMessage(message: Message) {
    this.hubConnection?.invoke('SendMessage', message).catch(error => console.log(error));
  }
  
  stopConnection(){
    this.hubConnection?.stop();
  }
}
