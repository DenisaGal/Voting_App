import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http : HttpClient) { }

  generateToken()
  {
    return this.http.get('api/GenerateToken');
  }

  decodeToken()
  {
    return this.http.get('api/DecodeToken');
  }

  OneTimeVote(){
    return this.http.get('api/OneTimeVote');
  }



}
