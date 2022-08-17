export class RequestAcknowledged {
    public senderId: string = '';
    public receiverId: string = '';
    public isaccept: boolean = false;
      
    assign(senderId?: string, receiverId?: string, isaccept?: boolean) {
      this.senderId = senderId == undefined ? '' : senderId;
      this.receiverId = receiverId == undefined ? '' : receiverId;
      this.isaccept = isaccept == undefined ? false : isaccept;
    }
  }