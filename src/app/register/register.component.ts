import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from "@angular/fire/auth";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { UserProfileComponent } from "../user-profile/user-profile.component";

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
     let confirm = (<HTMLInputElement>document.getElementById("confirm")).value;

     if(!confirm)
        window.alert("Please confirm your password!");
     else if(confirm != password)
        window.alert("Passwords don't match!");
     else{
      this.auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                  //send email address to user profile component to add to user database
                  UserProfileComponent.emailAddress = email;
                  //fireauth logs the user in automatically on register, so I'm logging him out lol
                  this.auth.signOut().then(() => {
                            TopBarComponent.isSignedIn = false;
                          }).catch((error) => {
                            window.alert("Something went wrong :(");
                          });
                  //now log URSELF in.
                  this.router.navigate(['./login']);
                })
                .catch((error) => {
                  window.alert(error.message);
                });
      }
   }

    //have to check AGE!!, maybe address dar nu cred ca reusim
    //putem trimite e-mail de confirmare
    //trebuie sa vedem cum encriptam datele
    //UPDATE vezi user profile, acolo sunt datele
}
