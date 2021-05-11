import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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
}
