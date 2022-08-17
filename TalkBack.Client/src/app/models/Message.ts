export class Message {
  senderId: string = '';
  receiverId: string = '';
  user: string = '';
  msgText: string = '';

  assign(senderId?: string, receiverId?: string, user?: string, msgText?: string) {
    this.senderId = senderId == undefined ? '' : senderId;
    this.receiverId = receiverId == undefined ? '' : receiverId;
    this.user = user == undefined ? '' : user;
    this.msgText = msgText == undefined ? '' : msgText;
  }
}