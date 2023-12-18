import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GoogleDistanceService {
  private apiUrl = 'http://localhost:3000/getDistanceMatrix';
  private apiKey = 'AIzaSyDac6ZrCZExw86GubhTfRqVWJs0-RVy40U';

  constructor(private http: HttpClient) { }
  getDistanceMatrix(
    origins: string,
    destinations: string,
  ): Observable<any> {
    const payload = { 
      origins: origins,
      destinations: destinations, 
      key:this.apiKey 
    };
    console.log(origins)
    return this.http.post(this.apiUrl, payload);
  }
test(){
  console.log("working")
}
}
