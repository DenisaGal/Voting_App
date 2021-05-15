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

	//election: Observable<any<any>>;
	//candidates_from_firestore: Observable<any[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit(): void {
  	// First get the election id from the current route (so we can find it in the db and get the details)
	  /*const routeParams = this.route.snapshot.paramMap;
	  const electionIdFromRoute = String(routeParams.get('electionId'));*/

	  //get details and subcollection from db
	  //this.election = this.db.collection('Elections').doc(electionIdFromRoute).get();
	  //this.candidates_from_firestore = this.election.collection('Candidates').valueChanges({idField: 'id'})
  }

}
