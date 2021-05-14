import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { ApplicationRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as CryptoJS from 'crypto-js';
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public static isSignedIn: boolean = false;
  encPassword: String = 'unicorn';

  constructor( private ref: ApplicationRef, private auth: AngularFireAuth, public router: Router, private db: AngularFirestore) {
    let var1 = this.ref
          this.auth.onAuthStateChanged(function(user) {
            if (user) {
              UserProfileComponent.emailAddress = user.email!;
              TopBarComponent.isSignedIn = true
              var1.tick()
              // User is signed in.
            } else {
              TopBarComponent.isSignedIn = false
              var1.tick()

              // No user is signed in.
            }
          });
  }

  ngOnInit(): void {
  }

  getStatus(): boolean {
     return TopBarComponent.isSignedIn;
  }

  isAdmin(): boolean {
     //email from current logged in user:
     var email = UserProfileComponent.emailAddress;
     var encrypted_email = CryptoJS.AES.encrypt(email.trim(), this.encPassword.trim()).toString();

     //email from database:
     var result = this.db.collection("Users", ref => ref.where("Email_Address", "==", encrypted_email).limit(1)).valueChanges()
                                 .subscribe(data=>{ console.log(data);  console.log(email);});

    /* this.auth.authState.subscribe(user => {
           var current_user = user;
           if(current_user != null){
                var current_email = current_user.email;

                var encrypted_email = CryptoJS.AES.encrypt(current_email!.trim(), this.encPassword.trim()).toString();

                           var result = this.db.collection("Users", ref => ref.where("Email_Address", "==", encrypted_email).limit(1)).valueChanges()
                            .subscribe(data=>{ console.log(data); });

           }
     });*/


     //deocamdata iti returneaza un array de entries din db, trebuie luat gen data.isAdmin


     return TopBarComponent.isSignedIn;
  }

  public logout(): void {
    this.auth.signOut().then(() => {
          TopBarComponent.isSignedIn = false;
          this.router.navigate(['./']);
        }).catch((error) => {
          window.alert("Something went wrong :(");
        });
  }

}
