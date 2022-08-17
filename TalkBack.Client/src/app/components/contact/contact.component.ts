import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatRequest } from 'src/app/models/ChatRequest';
import { Contact } from 'src/app/models/Contact';
import { User } from 'src/app/models/User';
import { ContactsService } from 'src/app/services/contacts.service';
import { RequesthubService } from 'src/app/services/requesthub.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];
  onlineUsers: Contact[] = [];
  offlineUsers: Contact[] = [];
  user!: User;

  constructor(private contactsService: ContactsService
   ,private usersService: UsersService,private router: Router,
    private requethubService: RequesthubService) { }

  ngOnInit(): void {
    let contact = this.contactsService.GetLiveContact();
    this.usersService.GetUserById(contact.userId).subscribe((response) => {
      this.user = response;
      this.GetAllContacts();
    });
  }

  //Divides the display of names by online,offline and all system users
  GetAllContacts() {
    this.contactsService.GetAllContacts()
    .subscribe((contacts) => {
        this.contacts = contacts;
        this.onlineUsers = this.contacts.filter(a => a.status && a.userId != this.user.id);
        this.offlineUsers = this.contacts.filter(a => !a.status && a.userId != this.user.id);
      });
  }
  
  //Sends a request to the user I choose to move to the game and chat room
  sendRequest(contact: Contact) {
    let chat: ChatRequest = new ChatRequest();
    let userCon = this.contacts.find(a => a.userId === this.user.id);
    chat.assign(this.user.id, contact.userId, userCon?.displayName);
    this.requethubService.sendRequest(chat);
    localStorage.setItem
    ("chatIds",JSON.stringify({id: this.user.id, receiverId: contact.userId}));
    this.router.navigate(['/room']);
  }
}