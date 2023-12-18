import { Component } from '@angular/core';
import { CameraResultType, CameraSource, Camera, Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';
import {AzureAPIsService} from 'src/app/services/azure-apis.service'
import { HttpClientModule } from '@angular/common/http';
import { NavController } from '@ionic/angular';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private AzureAPIsService:AzureAPIsService, private navCtrl: NavController) { }
  public capturedImage: string = '';
  public recognitionImage!: Photo;
  public url!: any;
  public result!: any;
  public fName!:string;
  public lName!:string;
  // public faceids!: string[];

  async register() {
    try {
      // Capture a photo for recognition
        this.recognitionImage = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });

      this.url = this.recognitionImage?.base64String;
      const jsonimage = atob(this.url)
      console.log(jsonimage)
      this.AzureAPIsService.createperson(this.fName + " " + this.lName)
      .subscribe((response) => {
       this.result= response.personId
        console.log(response.personId)
      });
      
      // console.log(result)

      this.AzureAPIsService.addface('https://i.postimg.cc/65Gr3cXx/Passport-Photo.jpg', this.result).
      subscribe((response)=>{
        console.log(response)
      },(error)=>{
        console.log(error)
      })
    }catch (error){
      console.log('error hapa', error)
    }
  }
  async recognise(){
    this.AzureAPIsService.detectface('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D').subscribe((response)=>{
      console.log(response[0].faceId)
      const faceids = []
      faceids.push(response[0].faceId)
      console.log(faceids)
      this.AzureAPIsService.recogniseface(faceids).subscribe((res)=>{
        console.log(res)
      },(error)=>{
        console.log(error)
      })

    }, (error)=>{
      console.log(error)
    })
  }
  location(){
    this.navCtrl.navigateForward('/location');

  }

}

