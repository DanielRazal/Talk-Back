import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contact!:Contact;

  constructor(private contactsService: ContactsService) { }
  
  ngOnInit(): void {
    //Displays in HTML the name of the contact
    this.contact = this.contactsService.GetLiveContact();
  }
}

