import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	public static emailAddress: string = '';
	isProfileComplete: boolean = false;

	//we need a more secure place for encPassword
	encPassword: String = 'unicorn';

	selectedGender: string = '';
	genders: any = ['Male', 'Female'];

  	constructor(private db: AngularFirestore) { }

  	ngOnInit(): void {
  	}


	radioChangeHandler (event: any){
		this.selectedGender = event.target.value;
	}

	getEmailAddress(): string {
     return UserProfileComponent.emailAddress;
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
		//to decrypt use CryptoJS.AES.decrypt(encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

		this.db.collection("Users").doc(eCNP).set({
		    CID: eCID,
		    First_Name: eFirst_Name,
		    Last_Name: eLast_Name,
		    Email_Address: eEmailAddress,
		    City: eCity,
		    Street: eStreet,
		    Number: eNumber,
		    Gender: eGender,
		    Admin: false
		})
		.then(() => {
			this.isProfileComplete = true;
    		console.log("Document successfully written!");
		})
		.catch((error) => {
		    console.error("Error writing document: ", error);
		});
	}
}
