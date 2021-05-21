import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from "@angular/router";
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-election-results',
  templateUrl: './election-results.component.html',
  styleUrls: ['./election-results.component.css']
})
export class ElectionResultsComponent implements OnInit {

  electionId: string = '';
  electionName: string = '';
  electionDescription: string = '';
  electionStart_Date: string = '';
  electionStart_Time: string = '';
  electionEnd_Date: string = '';
  electionEnd_Time: string = '';
  candidates_from_firestore: Observable<any[]>;


  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router) {
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

  ngOnInit(): void {
  }

}
