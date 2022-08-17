import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  errorsArray:string[] = []

  constructor() { }

  userValidation(e:any){
    if (e.error) {
        this.errorsArray = [];
        if(e.error?.errors?.Password == null && e.error?.errors?.UserName == null){
          this.errorsArray.push(e.error);
        }
      }
      if (e.error?.errors?.Password[0]) {
        this.errorsArray.push(e.error?.errors?.Password[0]);
      }
      if(e.error?.errors?.Password[1]){
        this.errorsArray.push(e.error?.errors?.Password[1]);
      }
      if (e.error?.errors?.UserName[0]) {
        this.errorsArray.push(e.error?.errors?.UserName[0]);
      }

      if(e.error?.errors?.UserName[1]){
        this.errorsArray.push(e.error?.errors?.UserName[1]);
      }
  }

  fullNameValidation(){
    const input = document.getElementById('InputName') as HTMLInputElement | null;
    const value = input?.value;
    if (Number(value?.length) === 0) {
      this.errorsArray.push('Full Name is a required field');
    }
    if (Number(value?.length) < 3 || Number(value?.length) > 15) {
      this.errorsArray.push('The full name should be between 3 characters to 15');
    }
  }
}
