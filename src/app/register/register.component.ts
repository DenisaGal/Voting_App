import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  register(): void{

    //gotta make a profile completion page and move this complex form there, while register is only  mail and pwd
     let email = (<HTMLInputElement>document.getElementById("email")).value;
     let password = (<HTMLInputElement>document.getElementById("password")).value;

      this.auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                  this.router.navigate(['./login']);
                })
                .catch((error) => {
                  window.alert(error.message);
                });
      }

    //have to check AGE!!, maybe address dar nu cred ca reusim
    //putem trimite e-mail de confirmare
    //trebuie sa vedem cum encriptam datele
  }
