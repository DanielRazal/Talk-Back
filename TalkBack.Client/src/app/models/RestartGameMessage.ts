export class RestartGameMessage {
  senderId: string = '';
  receiverId: string = '';
  playerX: string = '';
  playerO: string = '';
  accept: boolean = false;

  assign(senderId?: string, receiverId?: string, playerX?: string,
     playerO?: string, accept?: boolean) {
    this.senderId = senderId == undefined ? '' : senderId;
    this.receiverId = receiverId == undefined ? '' : receiverId;
    this.playerX = playerX == undefined ? '' : playerX;
    this.playerO = playerO == undefined ? '' : playerO;
    this.accept = accept == undefined ? false : accept;
  }
}