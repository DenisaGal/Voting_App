import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
   profileForm = this.fb.group({
     details: this.fb.group({
      electionName: ['', Validators.required],
      electionDescription: ['', Validators.required]
     }),
     duration: this.fb.group({
       startDate: [''],
       startTime: [''],
       endDate: [''],
       endTime: ['']
     }),
     candidates: this.fb.array([
       this.fb.group({
              candidateName: [''],
              candidateDetails: ['']
       })
     ])
   });

  constructor(private fb: FormBuilder, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    window.alert(this.profileForm.value.details.electionName);
  }

/*updateName() {
  this.name.setValue('Nancy');
}

updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
}*/

  get candidates() {
    return this.profileForm.get('candidates') as FormArray;
  }

  addCandidate() {
    this.candidates.push(this.fb.group({
        candidateName: [''],
        candidateDetails: [''],
     }));
  }

  add_election(): void {
    let iName = this.profileForm.value.details.electionName;
    let iDescription = this.profileForm.value.details.electionDescription;
    let iStart_Date: Date = new Date(this.profileForm.value.duration.startDate);
    let iStart_Time = this.profileForm.value.duration.startTime;
    let sTime = iStart_Time.split(':', 2);
    let iStart_Timestamp = new Date(iStart_Date.getFullYear(), iStart_Date.getMonth(), iStart_Date.getDate(), sTime[0], sTime[1], 0o0, 0o0);
    let iEnd_Date: Date = new Date(this.profileForm.value.duration.endDate);
    let iEnd_Time = this.profileForm.value.duration.endTime;
    let eTime = iEnd_Time.split(':', 2);
    let iEnd_Timestamp = new Date(iEnd_Date.getFullYear(), iEnd_Date.getMonth(), iEnd_Date.getDate(), eTime[0], eTime[1], 0o0, 0o0);
    let iUID = iName + ' ' + iStart_Date.toDateString();
    //let iCandidates = this.profileForm.get('candidates');

    this.db.collection("Elections").doc(iUID).set({
        Name: iName,
        Description: iDescription,
        Start_Date: iStart_Timestamp,
        End_Date: iEnd_Timestamp,
        Candidates: 'tbd'
    })
    .then(() => {
        console.log("Election successfully added!");
    })
    .catch((error) => {
        console.error("Error adding election: ", error);
    });
  }
}
