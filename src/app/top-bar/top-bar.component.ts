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

   /*async getUserFromDb() : Promise<boolean>{
     return new Promise<boolean>((resolve,reject)=>{
            setTimeout(() => {
                                this.db.collection<any>("Users").valueChanges()
                                  .subscribe( data=>
                                     {
                                         let isAdmin: boolean = false;
                                         var i;

                                         for ( i = 0; i < data.length; i++){
                                           var decrypted = CryptoJS.AES.decrypt(data[i].Email_Address.trim(), this.encPassword.trim()).toString(CryptoJS.enc.Utf8);

                                           if(decrypted == UserProfileComponent.emailAddress){

                                             if(data[i].Admin == true){
                                                resolve(isAdmin);
                                             }
                                           }
                                         }

                                         reject("Not admin");
                                     })

            }, 1500);
     }).then( b => {  return true; })
     .catch((error) => { return false;});
  }

  isAdmin(): boolean {
      return this.getUserFromDb().then( b => {  return true; }).catch((error) => { return false;});
*/

    /* this.auth.authState.subscribe(user => {
           var current_user = user;
           if(current_user != null){
                var current_email = current_user.email;

                var encrypted_email = CryptoJS.AES.encrypt(current_email!.trim(), this.encPassword.trim()).toString();

                           var result = this.db.collection("Users", ref => ref.where("Email_Address", "==", encrypted_email).limit(1)).valueChanges()
                            .subscribe(data=>{ console.log(data); });

           }
     });*/

  isAdmin(): boolean {
     if(UserProfileComponent.emailAddress == "denisagal09@yaho.com")
        return true;
     return false;
  }

  public logout(): void {
    this.auth.signOut().then(() => {
          TopBarComponent.isSignedIn = false;
          UserProfileComponent.emailAddress = "";
          this.router.navigate(['./']);
        }).catch((error) => {
          window.alert("Something went wrong :(");
        });
  }

}
