import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestAcknowledged } from 'src/app/models/RequestAcknowledged';
import { Contact } from 'src/app/models/Contact';
import { Message } from 'src/app/models/Message';
import { ChathubService } from 'src/app/services/chathub.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { RequesthubService } from 'src/app/services/requesthub.service';
import { ChatRequest } from 'src/app/models/ChatRequest';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-chatsingle',
  templateUrl: './chatsingle.component.html',
  styleUrls: ['./chatsingle.component.css']
})
export class ChatsingleComponent implements OnInit {
  massage: Message = new Message();
  massageArray: Message[] = [];
  senderContact?: Contact;
  receiverContact?: Contact;
  receiverDisplayName: string = '';
  massageText: string = '';
  userDisplayName: string = '';
  isaccept: boolean = true;
  playerX: string = '';
  playerO: string = '';
  chatRequest?: ChatRequest;
  clientIDs : any;

  constructor(private contactService: ContactsService,private chathubService: ChathubService,
    private requesthubService: RequesthubService,
    private router: Router,private swal:SwalService) { }

  ngOnInit(): void {
    this.clientIDs = JSON.parse(localStorage.getItem("chatIds")??"") ;
    let senderId = this.clientIDs.id;
    let receiverid = this.clientIDs.receiverId;
    let isAck = this.clientIDs.isAck;

    //Send message button
    this.isaccept = isAck;
    
    this.playerX = localStorage.getItem('playerx')??"";
    this.playerO = localStorage.getItem('playero')??"";
    
    //Search by Id of the user who send the request and overrides it in the new value
    this.contactService.GetContactByUserId(senderId).subscribe((result) => {
    if (result) {
      this.senderContact = result;
      this.userDisplayName = this.senderContact.displayName;
    }});

    //Search by Id of the user who receives the request and overrides it in the new value
    this.contactService.GetContactByUserId(receiverid).subscribe((result) => {
      if (result) {
        this.receiverContact = result;
        this.receiverDisplayName = this.receiverContact.displayName;
      }
    });

    this.chathubService.createHubConnection();
    this.chathubService.onReceiveOne.subscribe((x: Message) => {
      if (x) {
        this.addToInbox(x);
      }
    });

 //Checks whether the request was accept or not.
 this.requesthubService.onChatRequestAcknowledged.subscribe((x: RequestAcknowledged) => {
  if(x && x.senderId && x.receiverId){
    this.isaccept = x.isaccept;
    this.clientIDs.isAck = this.isaccept;
    if (this.senderContact == undefined || this.receiverContact == undefined) {
      return;
    }
    if ((this.senderContact?.userId === x.senderId && this.receiverContact?.userId === x.receiverId) ||
      (this.senderContact?.userId === x.receiverId && this.receiverContact?.userId === x.senderId)) {
      if (this.isaccept) {
       this.playerX = x.receiverId;
       this.playerO = x.senderId;
       this.swal.messageToUser(`You move into a room with ${this.receiverContact.displayName}`);
      } else {
       this.swal.messageToUser(`${this.receiverContact.displayName} Rejected your request`)
      .then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['/contact'])
          .then(() => {
            window.location.reload();
          });
        }});
      }
    }
  }});
 }

  //Push messages to array by id
  addToInbox(msg: Message) {
    if ((this.senderContact?.userId === msg.senderId && this.receiverContact?.userId === msg.receiverId) ||
      (this.senderContact?.userId === msg.receiverId && this.receiverContact?.userId === msg.senderId)) {
      this.massage = msg;
      this.massageArray.push(msg);
    }
  }
  
  //Sending the messages only if the user has accept the request
  sendMessage() {
    if (!this.isaccept) {
        this.swal.messageToUser(`Waiting for approval from ${this.receiverContact?.displayName}`);
      return;
    }
    if (this.massageText) {
      let msg: Message = new Message();
      msg.assign
      (this.senderContact?.userId, this.receiverContact?.userId, this.senderContact?.displayName,this.massageText)
      this.chathubService.sendMessage(msg)
      this.massageText = "";
    } else {
        this.swal.messageToUser('Please enter the message!');
    }
  }
}
