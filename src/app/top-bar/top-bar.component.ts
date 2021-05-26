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
              TopBarComponent.isSignedIn = true;
              
              var1.tick();
              
              // User is signed in.
            } else {
              TopBarComponent.isSignedIn = false
              var1.tick();
              
              // No user is signed in.
            }
          });
         
  }

  ngOnInit(): void {
  
  this.db.collection<any>("Users").valueChanges()
                                        .subscribe( data=>
                                           {
                                               var i;
                                               for ( i = 0; i < data.length; i++){
                                                 var decrypted = CryptoJS.AES.decrypt(data[i].Email_Address.trim(), this.encPassword.trim()).toString(CryptoJS.enc.Utf8);
                                                 if(decrypted == UserProfileComponent.emailAddress){
                                                   if(data[i].Admin == true){
                                                      (<HTMLInputElement>document.getElementById("admin-button")).style.display = "inline";
                                                   }
                                                   
                                                 }
                                               }
                                           });
  }

  getStatus(): boolean {
     return TopBarComponent.isSignedIn;
  }


  public logout(): void {
    this.auth.signOut().then(() => {
          TopBarComponent.isSignedIn = false;
          UserProfileComponent.emailAddress = "";
          (<HTMLInputElement>document.getElementById("admin-button")).style.display = "none";
          this.router.navigate(['./']);
        }).catch((error) => {
          window.alert("Something went wrong :(");
        });
  }

}
