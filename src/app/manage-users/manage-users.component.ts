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
  	this.users_from_firestore = this.db.collection<any>('Users').valueChanges({idField: 'id'});
  }

  ngOnInit(): void {
  }

  make_admin(userid: string): void{
    this.db.collection<any>("Users").doc(userid).set({
                              Admin: true},
                               { merge: true }); //altfel sterge valorile celorlalte campuri.. jeez
  }

  remove_admin(userid: string): void{
    this.db.collection<any>("Users").doc(userid).set({
                              Admin: false},
                               { merge: true });
  }

}
