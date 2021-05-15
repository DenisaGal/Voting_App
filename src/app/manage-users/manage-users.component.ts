import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

	users_from_firestore: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
  	this.users_from_firestore = this.db.collection('Users').valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
  }

}
