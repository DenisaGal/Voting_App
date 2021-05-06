import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;

    this.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
              //TopBarComponent.isSignedIn = true;
              this.router.navigate(['./']);
        })
        .catch((error) => {
              window.alert(error.message);
        });
  }
}
