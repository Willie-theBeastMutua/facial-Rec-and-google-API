import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationPage } from './location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    // NativeGeocoder,
    LocationPageRoutingModule
  ],
  declarations: [LocationPage
    ],
    providers: [
      // NativeGeocoder, // 👈 add Geolocation into MypositionPageModule's providers array
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LocationPageModule {}
