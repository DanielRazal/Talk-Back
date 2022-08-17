import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestAcknowledged } from 'src/app/models/RequestAcknowledged';
import { ChatRequest } from 'src/app/models/ChatRequest';
import { Contact } from 'src/app/models/Contact';
import { User } from 'src/app/models/User';
import { ContactsService } from 'src/app/services/contacts.service';
import { RequesthubService } from 'src/app/services/requesthub.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-default-layout-site',
  templateUrl: './default-layout-site.component.html',
  styleUrls: ['./default-layout-site.component.css']
})
export class DefaultLayoutSiteComponent implements OnInit {

  user!: User;
  contact!: Contact;
  findRequest: boolean = false;
  chatRequest?: ChatRequest;

  constructor(
    private contactService: ContactsService, private usersService: UsersService,
    private contactsService: ContactsService, private router: Router,
    private requesthubService: RequesthubService,
    private swal:SwalService) {
  }

  ngOnInit(): void {   
    //user who receives the request
    this.contact = this.contactService.GetLiveContact();
    this.usersService.GetUserById(this.contact.userId)
    .subscribe(
      response => {
        this.user = response;
        this.requesthubService.createHubConnection();
        this.requesthubService.onChatRequest.subscribe((chatRequest: ChatRequest) => {
          if (this.user.id === chatRequest.receiverId) {
            this.chatRequest = chatRequest;
            this.findRequest = true;
          }
        });
      })
  }

  //The Yes button navigates to the room of the sending and receiving user
  buttonYes() {
    let request: RequestAcknowledged = new RequestAcknowledged();
    request.assign(this.chatRequest?.receiverId, this.chatRequest?.senderId, true);
    this.requesthubService.sendRequestAck(request);
    this.requesthubService.onChatRequest.unsubscribe();
    this.findRequest = true;
    localStorage.setItem("chatIds",JSON.stringify({id: this.user.id, receiverId: request.receiverId, isAck:true}))
    localStorage.setItem("playerx", this.chatRequest?.senderId??"");
    localStorage.setItem("playero", this.chatRequest?.receiverId??"");
    this.router.navigate(['/room']);
  }

  //The request between the sending user and the receiving was not accept
  buttonNo() {
    this.swal.isConfirm('Are you sure to refuse the request?')
    .then((result: any) => {
      if (result.isConfirmed) {
        let request: RequestAcknowledged = new RequestAcknowledged();
        request.assign(this.chatRequest?.receiverId, this.chatRequest?.senderId, false);
        this.requesthubService.sendRequestAck(request);
        this.findRequest = false;
      }
    });
  }

  navigate(nav:string){
    this.router.navigate([`/${nav}`])
              .then(() => {
          window.location.reload();
    });
  }
  
  //When I logout of the site I update the status to false (user offline) and remove the token
  logout() {
    localStorage.clear();
    this.contactService.UpdateStatus(this.user.id, false).subscribe(() => {
    this.router.navigate(['login'])
    .then(()=>{
        window.location.reload();
    });
  });
 }

  deleteUser(user: User) {
    this.swal.isConfirm(`Are you sure to delete user ${user.userName}?`)
    .then((result:any) => {
      if (result.isConfirmed) {
        this.usersService.DeleteUser(user.id)
          .subscribe(() => {
            this.contactsService.DeleteContact(this.contact.id)
              .subscribe(() => {
                this.logout();
              })
          })
      }
    });
  }
}
