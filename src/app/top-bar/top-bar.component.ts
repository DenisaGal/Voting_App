import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public static isSignedIn:boolean = false;

  constructor( private ref: ApplicationRef, private auth: AngularFireAuth, public router: Router ) {
    let var1 = this.ref
          this.auth.onAuthStateChanged(function(user) {
            if (user) {
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

  public logout(): void {
    this.auth.signOut().then(() => {
          TopBarComponent.isSignedIn = false;
          this.router.navigate(['./']);
        }).catch((error) => {
          window.alert("Something went wrong :(");
        });
  }

}
