import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  register(): void{  //for now verific ca merge butonul si ia datele din field
    let name = (<HTMLInputElement>document.getElementById("firstname")).value;
    alert(name);
  }
}
