import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  sendMail(): void{
    let email = (<HTMLInputElement>document.getElementById("emailfield")).value;
        if(!email)
         window.alert("Please provide your email!");
        else{
           this.auth.sendPasswordResetEmail(email).then(function() {
            window.alert("Email sent! Check your inbox");
          }).catch(function(error) {
            window.alert("Something went wrong :(");
          });
        }
  }

}
