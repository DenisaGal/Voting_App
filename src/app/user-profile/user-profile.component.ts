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

    if(!iCNP || !iCID || !iFirst_Name || !iLast_Name || !iCounty || !iCity || !iStreet || !iNumber || !iGender)
      window.alert("You must complete all the fields in your profile!");
    else{
      var isValid = this.validateCNP(iCNP);
      if( isValid != 0){
        if(isValid == 1)
            window.alert("CNP must be 13 digits");
        if(isValid == 2)
            window.alert("CNP gender doesn't match to selected gender");
        if(isValid == 3)
            window.alert("CNP birth date is invalid");
        if(isValid == 4)
            window.alert("We're sorry, but you can't vote until you are of legal age! :(");
        if(isValid == 5)
            window.alert("CNP value doesn't match county in address or in CI series");
        if(isValid == 6)
            window.alert("CNP isn't valid (last digits)");
      }
      else{
        var isValid = this.validateCI(iCID);
        if( isValid != 0){
          if(isValid == 1)
            window.alert("CI series formatted badly");
          if(isValid == 2)
            window.alert("CI county doesn't match address");
        }
        else{
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
    }
	}

  validateCI(iCID : string): number{
   //check format
    let regex = /^[A-Z]{2}[0-9]{6}$/;
    if(!regex.test(iCID))
      return 1;

    //check county
    let county = (<HTMLInputElement>document.getElementById("county")).value;
    let counties = new Map([
                ["AB", "Alba"],["AR", "Arad"], ["AG", "Arges"], ["BC", "Bacau"], ["BH", "Bihor"],
                ["BN", "Bistrita-Nasaud"],["BT", "Botosani"], ["BV", "Brasov"], ["BR", "Braila"], ["BZ", "Buzau"],
                ["CS", "Caras-Severin"],["CJ", "Cluj"],["CT", "Constanta"],["CV", "Covasna"],["DB", "Dambovita"],
                ["DJ", "Dolj"],["GL", "Galati"],["GJ", "Gorj"],["HR", "Harghita"],["HD", "Hunedoara"],
                ["IL", "Ialomita"],["IS", "Iasi"],["IF", "Ilfov"],["MM", "Maramures"],["MH", "Mehedinti"],
                ["MS", "Mures"], ["NT", "Neamt"], ["OT", "Olt"],["PH", "Prahova"],["SM", "Satu Mare"],
                ["SJ", "Salaj"],["SB", "Sibiu"], ["SV", "Suceava"],["TR", "Teleorman"],["TM", "Timis"],
                ["TL", "Tulcea"],["VS", "Vaslui"],["VL", "Valcea"],["VN", "Vrancea"],["B", "Bucuresti"],
                ["CL", "Calarasi"],["GR", "Giurgiu"]]);
    if ( counties.get(iCID.slice(0, 2)) != county)
          return 2;


    return 0;
  }

	validateCNP(cnp:string): number {
	  //test lentgh
    if(cnp.length != 13)
      return 1;

    //test first digit vs gender
    if( ((parseInt(cnp[0]) % 2 == 1) && (this.selectedGender == "Female"))  || ((parseInt(cnp[0]) % 2 == 0) && (this.selectedGender == "Male")))
      return 2;

    let year = 0;
    //check valid date and then age
    if(parseInt(cnp[0]) < 3)
       year = parseInt(cnp.slice(1, 3)) + 1000;
    else
       year = parseInt(cnp.slice(1, 3)) + 2000;
    let month = parseInt(cnp.slice(3, 5));
    if(month > 13)
      return 3;
    let day  = parseInt(cnp.slice(5, 7));

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(yyyy - year < 18)
      return 4;
    else if (yyyy - year == 18)
      if(parseInt(mm) - month <= 0)
        return 4;
      else if (parseInt(mm) == month)
         if(parseInt(dd) - day <= 0)
           return 4;

    //check county code
    let counties = new Map([
            ["AB", 1],["AR", 2], ["AG", 3], ["BC", 4], ["BH", 5], ["BN", 6],["BT", 7], ["BV", 8], ["BR", 9], ["BZ", 10],
            ["CS", 11],["CJ", 12],["CT", 13],["CV", 14],["DB", 15],["DJ", 16],["GL", 17],["GJ", 18],["HR", 19],["HD", 20],
            ["IL", 21],["IS", 22],["IF", 23],["MM", 24],["MH", 25],["MS", 26], ["NT", 27], ["OT", 28],["PH", 29],["SM", 30],
            ["SJ", 31],["SB", 32], ["SV", 33],["TR", 34],["TM", 35], ["TL", 36],["VS", 37],["VL", 38],["VN", 39],["B", 40],
            ["B", 31],["B", 42],["B", 43],["B", 44],["B", 45],["B", 46],["CL", 51],["GR", 52]]);
    let county = parseInt(cnp.slice(7, 9));
    if (county > 52)
      return 5;
    if ( counties.get((<HTMLInputElement>document.getElementById("serie")).value.slice(0, 2)) != county)
      return 5;

    //lastly, the checksum digits at the end:
    let control = "279146358279";
    var i, checksum = 0 ;
    for( i = 0; i < 12; i++){
      checksum += parseInt(control[i]) * parseInt(cnp[i]);
    }
    var digit = checksum % 11;
    if(digit == 10)
      digit = 1;
    if(digit != parseInt(cnp[12]))
      return 6;

    return 0;
	}

	test(): void{
	  window.alert((<HTMLInputElement>document.getElementById("cnp")).value[12]);
	}
}
