import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { User } from 'src/app/models/User';
import { ContactsService } from 'src/app/services/contacts.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  user!:User;

  constructor(private formBuilder:FormBuilder
    ,private router:Router,
     private usersService:UsersService
    ,private swal:SwalService,public errorsService:ErrorsService,
    private contactService:ContactsService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:[''],
      password:['']
    });
  }

 //Checks if the username and password are correct and sets a token and contact to localStorage
   login(){
    this.usersService.Login(this.loginForm.value)
    .subscribe((res)=> {
      this.swal.success("The connection to the site was successful!");
        this.loginForm.reset();
        localStorage.setItem("token", JSON.stringify(res.token))
        this.contactService.GetContactByUserId(res.user.id).subscribe((c)=>{
          localStorage.setItem("contact", JSON.stringify(c));
          this.router.navigate(['home'])
        });
      },(e)=>{
        this.errorsService.userValidation(e);
      });
    }
}