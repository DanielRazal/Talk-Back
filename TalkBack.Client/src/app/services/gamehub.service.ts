import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { gameEnvironment } from 'src/environments/environment';
import { Game } from '../models/Game';
import { RestartGameMessage } from '../models/RestartGameMessage';

@Injectable({
  providedIn: 'root'
})
export class GamehubService {
  private hubConnection?: HubConnection;
  private gameSocket = gameEnvironment.gameSocket;
  onReceiveMove: BehaviorSubject<any> = new BehaviorSubject({});
  onStartGame: BehaviorSubject<any> = new BehaviorSubject({});
  onRestartGame: BehaviorSubject<any> = new BehaviorSubject({});
  onGameEnd: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.gameSocket).withAutomaticReconnect().build()
    this.hubConnection.start().catch(error => console.log(error));
    //ReceiveMove A parameter of the SendMove function (located in the server)
    this.hubConnection.on("ReceiveMove", message => { this.onReceiveMove.next(message); });

    //StartGame A parameter of the StartGame function (located in the server)
    this.hubConnection.on("StartGame", message => { this.onStartGame.next(message); });

    //RestartGame A parameter of the RestartGame function (located in the server)
    this.hubConnection.on("RestartGame", message => { this.onRestartGame.next(message); });

    //Exit A parameter of the EndGame function (located in the server)
    this.hubConnection.on("Exit", message =>{this.onGameEnd.next(message);});

  }
  //invoke to SendMove function (located in the server)
  sendMove(gameMessage: Game) {
    this.hubConnection?.invoke('SendMove', gameMessage).catch(error => console.log(error));
  }

  //invoke to StartGame function (located in the server)
  startGame(gameMessage: Game) {
    this.hubConnection?.invoke('StartGame', gameMessage).catch(error => console.log(error));
  }

  //invoke to RestartGame function (located in the server)
  restartGame(restartGameMessage: RestartGameMessage){
    this.hubConnection?.invoke('RestartGame', restartGameMessage)
    .catch(error => console.log(error));
  }
  
  //invoke to EndGame function (located in the server)
  endGame(flag: RestartGameMessage){
    this.hubConnection?.invoke("EndGame", flag).catch(error => console.log(error));
  }

  stopConnection(){
    this.hubConnection?.stop();
  }
 
}
