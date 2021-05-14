import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elections-page',
  templateUrl: './elections-page.component.html',
  styleUrls: ['./elections-page.component.css']
})
export class ElectionsPageComponent{

	elections_from_firestore: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
  	this.elections_from_firestore = this.db.collection('Elections').valueChanges({idField: 'id'});
  }

  print(){
	  console.log("successful");
	  console.log(this.elections_from_firestore);
 	}
}
