export class ChatRequest {
    senderId: string = '';
    receiverId: string = '';
    user: string = '';
  
    assign(senderId?: string, receiverId?: string, user?: string) {
      this.senderId = senderId == undefined ? '' : senderId;
      this.receiverId = receiverId == undefined ? '' : receiverId;
      this.user = user == undefined ? '' : user;
    };
  }