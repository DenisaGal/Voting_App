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
    let iUID = 'PlsWork';
    let iName = this.profileForm.value.details.electionName;
    let iDescription = this.profileForm.value.details.electionDescription;
    let iStart_Date = this.profileForm.value.duration.startDate;
    let iStart_Time = this.profileForm.value.duration.startTime;
    let iEnd_Date = this.profileForm.value.duration.endDate;
    let iEnd_Time = this.profileForm.value.duration.endTime;

    this.db.collection("Elections").doc(iUID).set({
        Name: iName,
        Description: iDescription,
        Start_Date: iStart_Date,
        End_Date: iEnd_Date,
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
