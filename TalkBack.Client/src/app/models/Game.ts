export class Game {
  senderId: string = '';
  receiverId: string = '';
  position: number = -1;
  mark: string = '';

  assign(senderId?: string, receiverId?: string, position?: number, mark?: string) {
    this.senderId = senderId == undefined ? '' : senderId;
    this.receiverId = receiverId == undefined ? '' : receiverId;
    this.position = position == undefined ? -1 : position;
    this.mark = mark == undefined ? '' : mark;
  }
}