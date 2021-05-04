import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  register(): void{  //for now verific ca merge butonul si ia datele din field
    let name = (<HTMLInputElement>document.getElementById("firstname")).value;
    alert(name);
  }
}
