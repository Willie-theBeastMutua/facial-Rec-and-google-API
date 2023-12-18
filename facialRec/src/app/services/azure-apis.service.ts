import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureAPIsService {
  public headers = new HttpHeaders({

    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': environment.azureKey
  })

  constructor(private http: HttpClient) { }
  createperson(name: string):Observable<any> {
    
    const requestBody = {
      name: name
    };
    // console.log(environment.azureurl + "/face/v1.0/largepersongroups/wilsontest/persons")
    return this.http.post(environment.azureurl + "/face/v1.0/largepersongroups/wilsontest/persons",
      requestBody,
      { headers: this.headers }
    
    )

  }

  addface(url:string, personid: string){
    const requestbody = {
      url: url
    }
    
    return this.http.post(environment.azureurl + "/face/v1.0/largepersongroups/wilsontest/persons/"+ personid
    +"/persistedfaces?overload=stream&detectionModel=detection_01",
    requestbody, {headers: this.headers})

  }
  detectface (url:string):Observable<any>{
    const requestbody = {
      url: url
    }
    return this.http.post(environment.azureurl+"/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_01&faceIdTimeToLive=86400",
    requestbody, {headers: this.headers})
  }
  recogniseface(faceids:string[]){
    const requestBody = {
      largePersonGroupId: "wilsontest",
      faceids:faceids,
      maxNumOfCandidatesReturned: 1,
      confidenceThreshold: 0.5
    }
    return this.http.post(environment.azureurl+"/face/v1.0/identify",
    requestBody, {headers: this.headers})

  }
}
