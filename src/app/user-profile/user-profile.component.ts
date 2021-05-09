import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
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
		//let iGender = !!!!!!!

		this.db.collection("Users").doc(iCNP).set({
		    CID: iCID,
		    First_Name: iFirst_Name,
		    Last_Name: iLast_Name,
		    Email: "",
		    City: iCity,
		    Street: iStreet,
		    Number: iNumber,
		    Gender: ""
		})
		.then(() => {
    console.log("Document successfully written!");
		})
		.catch((error) => {
		    console.error("Error writing document: ", error);
		});
	}
}
