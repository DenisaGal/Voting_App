import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http : HttpClient) { }

  generateToken(information : any) 
  {   
    return this.http.get('api/GenerateToken',
    {
      params:{
         msg:information
      }
      
    });
  }

  decodeToken(information : any)
  {
  //  return this.http.get('api/DecodeToken',
  //   {params: 
  //     {
  //       name:information.token
  //     }
  }

  OneTimeVote(inf : any){
    console.log("OneTimeVote Service : ", inf);
    
    
    return this.http.get('api/OneTimeVote',{
      params:{
        mail:inf.email,
        election:inf.election
      }

    });
  }

  AddVote(inf : any){
      console.log("AddVote",inf)
      
      return this.http.get('api/InsertToken/',  {params:{
        mail:inf.email,
        election:inf.election
      }
    })
  }

  Increment(inf : any){
    return this.http.get('api/increment',
      {params:{
          election:inf.election,
          candidate:inf.candidate 
        }
        
      }
    )
  }


  
}
