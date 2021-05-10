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

                //send account verification email
                  var current = this.auth.currentUser;
                  current.then((currentuser) => {
                          if(currentuser)
                                currentuser.sendEmailVerification();});

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
    //trebuie sa vedem cum encriptam datele
    //UPDATE vezi user profile, acolo sunt datele
}
