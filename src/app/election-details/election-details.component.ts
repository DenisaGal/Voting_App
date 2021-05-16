import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.css']
})
export class ElectionDetailsComponent implements OnInit {

	electionName: String = '';
	electionDescription: String = '';
	electionStart_Date: String = '';
	electionStart_Time: String = '';
	electionEnd_Date: String = '';
	electionEnd_Time: String = '';
	candidates_from_firestore: Observable<any[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { 
  	// First get the election id from the current route (so we can look for it in the db and get the details)
	  const routeParams = this.route.snapshot.paramMap;
	  const electionIdFromRoute = String(routeParams.get('electionId'));
	  console.log('ID: ' + electionIdFromRoute + '\n' + this.db.collection<any>('Elections').doc(electionIdFromRoute).get());

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

}
