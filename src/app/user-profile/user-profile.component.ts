import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';  
import { ManageUsersComponent } from "../manage-users/manage-users.component";
import { TopBarComponent } from "../top-bar/top-bar.component";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	public static emailAddress: string = '';
	currentUID: string = '';
	isProfileComplete: boolean = false;
	aFlag: boolean = false;
	//we need a more secure place for encPassword
	encPassword: String = 'unicorn';

	selectedGender: string = '';
	genders: any = ['Male', 'Female'];

  	constructor(private db: AngularFirestore, private auth: AngularFireAuth, public router: Router) { }

  	ngOnInit(): void {
  	}


	radioChangeHandler (event: any){
		this.selectedGender = event.target.value;
	}

	getEmailAddress(): string {
     return UserProfileComponent.emailAddress;
  	}

  	getProfileStatus(): boolean{
  		var temp = '';
  		var uid = '';
  		var flag: boolean = false;
  		var sEmail = this.getEmailAddress();
  		var encrypted_email = CryptoJS.AES.encrypt(sEmail.trim(), this.encPassword.trim()).toString();
  		var result = this.db.collection<any>("Users").valueChanges({idField: 'id'})
                                 .subscribe(data=>{ //console.log('data: ' + data[1].Email_Address);
                                 			let n = data.length;
                                 			for(let i = 0; i < n; i++){
	                                 			temp = CryptoJS.AES.decrypt(data[i].Email_Address.trim(), this.encPassword.trim()).toString(CryptoJS.enc.Utf8);
	                                 			if(temp == this.getEmailAddress()){
	                                 				uid = data[i].id;
	                                 				this.currentUID = data[i].id;
	                                 				flag = true;
	                                 				this.aFlag = true;
	                                 				this.isProfileComplete = true;
	                                 			}
                                 			}
                                 });
  		//console.log('Email: ' + this.getEmailAddress() + '\nencrypted_email: ' + encrypted_email + '\nResult: ' + result + '\nflag: ' + flag);
  		console.log(this.aFlag);
  		return this.aFlag;
  	}

  	getPS():boolean {
  		return this.getProfileStatus();
  	}

	//basically dupa ce si fac cont, aici trebuie sa iti completezi profilul si abia dupa e ok ca user so now we have to see abt database cu user info

	//!!add data validation rules!! (cnp sa fie 13 cifre etc)

	add_data(): void {
		let iCNP = (<HTMLInputElement>document.getElementById("cnp")).value;
		let iCID = (<HTMLInputElement>document.getElementById("serie")).value;
		let iFirst_Name = (<HTMLInputElement>document.getElementById("firstname")).value;
		let iLast_Name = (<HTMLInputElement>document.getElementById("lastname")).value;
		let iCounty = (<HTMLInputElement>document.getElementById("county")).value;
		let iCity = (<HTMLInputElement>document.getElementById("city")).value;
		let iStreet = (<HTMLInputElement>document.getElementById("street")).value;
		let iNumber = (<HTMLInputElement>document.getElementById("number")).value;
		let iGender = this.selectedGender;
		let iEmailAddress = this.getEmailAddress();

		let eCNP = CryptoJS.AES.encrypt(iCNP.trim(), this.encPassword.trim()).toString();
		let eCID = CryptoJS.AES.encrypt(iCID.trim(), this.encPassword.trim()).toString();
		let eFirst_Name = CryptoJS.AES.encrypt(iFirst_Name.trim(), this.encPassword.trim()).toString();
		let eLast_Name = CryptoJS.AES.encrypt(iLast_Name.trim(), this.encPassword.trim()).toString();
		let eCounty = CryptoJS.AES.encrypt(iCounty.trim(), this.encPassword.trim()).toString();
		let eCity = CryptoJS.AES.encrypt(iCity.trim(), this.encPassword.trim()).toString();
		let eStreet = CryptoJS.AES.encrypt(iStreet.trim(), this.encPassword.trim()).toString();
		let eNumber = CryptoJS.AES.encrypt(iNumber.trim(), this.encPassword.trim()).toString();
		let eGender = CryptoJS.AES.encrypt(iGender.trim(), this.encPassword.trim()).toString();
		let eEmailAddress = CryptoJS.AES.encrypt(iEmailAddress.trim(), this.encPassword.trim()).toString();

		//to decript use CryptoJS.AES.decrypt(encryptText.trim(), this.encPassword.trim()).toString(CryptoJS.enc.Utf8);


		this.db.collection("Users").doc(eCNP).set({
		    CID: eCID,
		    First_Name: eFirst_Name,
		    Last_Name: eLast_Name,
		    Email_Address: eEmailAddress,
		    County: eCounty,
		    City: eCity,
		    Street: eStreet,
		    Number: eNumber,
		    Gender: eGender,
		    Admin: false
		})
		.then(() => {
			this.isProfileComplete = true;
    		console.log("Document successfully written!");
    		this.getProfileStatus();
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
		    console.error("Error writing document: ", error);
		});
	}
}
