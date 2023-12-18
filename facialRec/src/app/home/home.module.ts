import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import {AzureAPIsService} from 'src/app/services/azure-apis.service'
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // NativeGeocoder,
    HttpClientModule
  ],
  providers: [
    AzureAPIsService, // Add your service to the providers array
    // other services
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
