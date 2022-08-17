import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ErrorsService } from 'src/app/services/errors.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup = new FormGroup({});
  user!:User

  constructor(private formBuilder:FormBuilder
    ,private router:Router,private usersService:UsersService
    ,private swal:SwalService,public errorsService:ErrorsService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      userName:[''],
    });
  }
  //Search the user by his username (the logic is on the server)
  forgotPassword(){
    this.usersService.GetUserByName(this.forgotForm.value.userName)
    .subscribe(res=> {
      if(res.userName === this.forgotForm.value.userName){
        localStorage.setItem("fUser", JSON.stringify(res));
        this.swal.success("The name is correct, you may change your password!");
        this.router.navigate(['changePassword'])
      }
    },(e)=>{ 
      this.errorsService.userValidation(e);
    });
  }
}
