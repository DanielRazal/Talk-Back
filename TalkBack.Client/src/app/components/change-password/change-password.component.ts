import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ErrorsService } from 'src/app/services/errors.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user!:User;
  visible:boolean = true;
  changetype:boolean =true;

  constructor(private router:Router,private usersService:UsersService
    ,private swal:SwalService,
    public errorsService:ErrorsService) { }

    ngOnInit(): void {
      let userString = localStorage.getItem("fUser")??"";
      this.user = JSON.parse(userString);
    }

    changePassword() {
      this.usersService.UpdateUser(this.user?.id, this.user)
      .subscribe(() => {
          this.swal.success("The update has been saved!");
          localStorage.removeItem("fUser");
          this.router.navigate(['login']);
        },(e)=> {
          this.errorsService.userValidation(e);
      })
    }

      //password visible or not visible by type (text/password)
      togglePassword(){
        const input = document.getElementById('InputPassword') as HTMLInputElement | null;
        const value = input?.value;
        
        if(value?.length === 0){
          this.swal.messageToUser('The password field is empty!');
        }
        else{
          this.visible = !this.visible;
          this.changetype = !this.changetype;
        }
      }
    } 
