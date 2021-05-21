import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { TokenService } from "../token.service"
import { UserProfileComponent } from "../user-profile/user-profile.component"




@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.css']
})
export class VotingPageComponent implements OnInit {

	electionName: string = '';
	realElectionName: string = '';
	candidates_from_firestore: Observable<any[]>;
	currentUID : string ='';
	encPassword: String = 'unicorn';
	public static emailAddress: string = '';
	vote_data: any ='';

	test : any =''
	incr : any =''

  constructor(private route: ActivatedRoute, private db: AngularFirestore , private service : TokenService) {
  	//First get the election id from the current route (so we can look for it in the db and get the details)
		const routeParams = this.route.snapshot.paramMap;
		const electionIdFromRoute = String(routeParams.get('electionId'));

		this.test = electionIdFromRoute;

	  //get details of election from db
		var result = this.db.collection<any>("Elections").valueChanges({idField: 'id'})
                                 .subscribe(data=>{
                                 			let n = data.length;
                                 			for(let i = 0; i < n; i++){
	                                 			if(electionIdFromRoute == data[i].id){
	                                 				this.electionName = data[i].id; // numele sa fie in functie de ID ca sa putem gasi mai usor unde sa incrementam votu :)
													this.realElectionName= data[i].Name
	                                 			}
                                 			}
                                 });


    //get candidates subcollection from the db
	  this.candidates_from_firestore = this.db.collection<any>('Elections').doc(electionIdFromRoute).collection<any>('Candidates').valueChanges({idField: 'id'});

	}


    getEmailAddress(): string {
		return UserProfileComponent.emailAddress;
	}

	ngOnInit(): void {

	}

	isSignedIn(): boolean{
		return TopBarComponent.isSignedIn;
	}

	generateTokenAPI(inf : any) : any
	{

		this.service.generateToken(inf).subscribe(
			(val) =>{
				console.log(val);
				var x = {election_name:this.electionName ,val}
				this.vote_data = x;
				console.log(x);
				this.OneTimeVoteAPI(x)
			},
			(error) => {console.log("Error occured ",error)}
		)

	}

	OneTimeVoteAPI(inf : any ) : void
	{

		this.service.OneTimeVote(inf).subscribe(
			info =>
			{
				if (info === false)
				{
					console.log(info)

					this.service.AddVote(this.vote_data).subscribe()
					{
						() =>{}
					}

					this.service.Increment(this.incr).subscribe()
					{
						() => {}
					}


					window.alert("Voted Succesfully");
				}
				else
				{
					window.alert("You already voted in this election!");
				}
			}
		)
	}

  vote(candidate_name: string): void{

	const msg:JSON = <JSON><unknown>{
        "email": this.getEmailAddress(),
        "election": this.electionName
      }


	const incr_detail:JSON = <JSON><unknown>{
        "candidate": candidate_name,
        "election": this.electionName
      }

	 // console.log(incr_detail);

	this.vote_data=msg;
	this.incr=incr_detail
	this.OneTimeVoteAPI(msg);

  	//window.alert("Yey you voted for " + candidate_name);


  }



}
