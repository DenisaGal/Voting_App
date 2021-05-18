import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.css']
})
export class VotingPageComponent implements OnInit {

	electionName: string = '';
	candidates_from_firestore: Observable<any[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { 
  	//First get the election id from the current route (so we can look for it in the db and get the details)
	  const routeParams = this.route.snapshot.paramMap;
	  const electionIdFromRoute = String(routeParams.get('electionId'));

	  //get details of election from db
		var result = this.db.collection<any>("Elections").valueChanges({idField: 'id'})
                                 .subscribe(data=>{
                                 			let n = data.length;
                                 			for(let i = 0; i < n; i++){
	                                 			if(electionIdFromRoute == data[i].id){
	                                 				this.electionName = data[i].Name;
	                                 			}
                                 			}
                                 });
    //get candidates subcollection from the db
	  this.candidates_from_firestore = this.db.collection<any>('Elections').doc(electionIdFromRoute).collection<any>('Candidates').valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
  }

  isSignedIn(): boolean{
  	return TopBarComponent.isSignedIn;
  }

  vote(candidate_name: string): void{
  	window.alert("Yey you voted for " + candidate_name);
  }

}
