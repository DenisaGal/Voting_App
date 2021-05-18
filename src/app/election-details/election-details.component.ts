import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.css']
})
export class ElectionDetailsComponent implements OnInit {

	electionId: string = '';
	electionName: string = '';
	electionDescription: string = '';
	electionStart_Date: string = '';
	electionStart_Time: string = '';
	electionEnd_Date: string = '';
	electionEnd_Time: string = '';
	candidates_from_firestore: Observable<any[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router) {
  	//First get the election id from the current route (so we can look for it in the db and get the details)
	  const routeParams = this.route.snapshot.paramMap;
	  const electionIdFromRoute = String(routeParams.get('electionId'));
	  this.electionId = electionIdFromRoute;
	  //get details of election from db
		var result = this.db.collection<any>("Elections").valueChanges({idField: 'id'})
                                 .subscribe(data=>{
                                 			let n = data.length;
                                 			for(let i = 0; i < n; i++){
	                                 			if(electionIdFromRoute == data[i].id){
	                                 				this.electionName = data[i].Name;
	                                 				this.electionDescription = data[i].Description;
	                                 				this.electionStart_Date = data[i].Start_Date;
																					this.electionStart_Time = data[i].Start_Time;
																					this.electionEnd_Date = data[i].End_Date;
																					this.electionEnd_Time = data[i].End_Time;
	                                 			}
                                 			}
                                 });
    //get candidates subcollection from the db
	  this.candidates_from_firestore = this.db.collection<any>('Elections').doc(electionIdFromRoute).collection<any>('Candidates').valueChanges({idField: 'id'});
  }

  ngOnInit(): void { }

  isSignedIn(): boolean{
  	return TopBarComponent.isSignedIn;
  }

  isActive(): boolean {
  	//returns true if election can be voted for today
  	let today:Date = new Date();
  	//convert start date and time to timestamp type
    let iStart_Date: Date = new Date(this.electionStart_Date);
    let iStart_Time = this.electionStart_Time;
    let sTime = iStart_Time.split(':', 2);
    let Start_Timestamp = new Date(iStart_Date.getFullYear(), iStart_Date.getMonth(), iStart_Date.getDate(), +sTime[0], +sTime[1], 0o0, 0o0);
    //convert end date and time to timestamp type
    let iEnd_Date: Date = new Date(this.electionEnd_Date);
    let iEnd_Time = this.electionEnd_Time;
    let eTime = iEnd_Time.split(':', 2);
    let End_Timestamp = new Date(iEnd_Date.getFullYear(), iEnd_Date.getMonth(), iEnd_Date.getDate(), +eTime[0], +eTime[1], 0o0, 0o0);

    if(today.getTime() === Start_Timestamp.getTime() || today.getTime() === End_Timestamp.getTime()){
    	return true;
    }
   	else if(today >= Start_Timestamp && today <= End_Timestamp){
   		return true;
   	}
   	else{
   		return false;
   	}
  	return false;
  }

}
