import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	public static emailAddress: string = '';
	
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
		
		this.db.collection("Users").doc(iCNP).set({
		    CID: iCID,
		    First_Name: iFirst_Name,
		    Last_Name: iLast_Name,
		    Email_Address: iEmailAddress,
		    City: iCity,
		    Street: iStreet,
		    Number: iNumber,
		    Gender: iGender
		})
		.then(() => {
    console.log("Document successfully written!");
		})
		.catch((error) => {
		    console.error("Error writing document: ", error);
		});
	}
}
