import { Component, OnInit } from '@angular/core';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-default-layout-login',
  templateUrl: './default-layout-login.component.html',
  styleUrls: ['./default-layout-login.component.css']
})
export class DefaultLayoutLoginComponent implements OnInit {

  constructor(private errorService:ErrorsService) { }

  ngOnInit(): void {
    this.errorService.errorsArray = [];
  }

}
