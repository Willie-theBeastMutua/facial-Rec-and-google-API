import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder } from '@capgo/nativegeocoder';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GoogleDistanceService } from '../services/google-distance.service';
// import { GoogleDistanceService } from '../services/google-distance.service';
// import { Geofence, GeofenceTransitionType, LocalNotifications } from '@ionic-native/geofence/ngx';
import { Plugins } from '@capacitor/core';
const { Geofence } = Plugins;

declare var window: any;

declare var google: any;


// import { Component,  } from '@angular/core';
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  map!: GoogleMap;
  public lat!: number;
  public long!: number;
  private apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  private apiKey = 'AIzaSyDac6ZrCZExw86GubhTfRqVWJs0-RVy40U';


  constructor(private http: HttpClient, private googledistance: GoogleDistanceService) { }
  geofencing() {
    const predeterminedLocation = new google.maps.LatLng(-1.285790,36.820030);

   const result = google.maps.geometry.spherical.computecomputeDistanceBetween(
    new google.maps.LatLng(this.lat, this.long),predeterminedLocation
    );
    console.log(result)
  }
  ngAfterViewInit() {
    this.loadmap();

  }
  //Loads maps navigator
  async tokencom() {

    console.log(this.lat, this.long)
    window.open('https://www.google.com/maps/dir/' + this.lat + ',' + this.long + '/-1.285790,36.820030/am=t/data=!3m1!4b1?entry=ttu')
  }
// calculates the distance between points
  getdistance(origin: number[], destination: number[]){
    const params = new HttpParams()
      .set('origins', origin.map(coord => `${coord[0]},${coord[1]}`).join('|'))
      .set ('destinations', destination.map(coord => `${coord[0]},${coord[1]}`).join('|'))
      .set ('key', this.apiKey);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

    
    this.http.post(
      this.apiUrl, null, {headers, params}
      ).subscribe((res)=>{
      console.log('this',res)
    },
    (error)=>{
      console.log(error)
    })
    return;
  }

  // loads map on start
  async loadmap() {
    const mapRef = document.getElementById('map');

    [this.lat, this.long] = await this.getlocation()
    // console.log(this.getlocation())
    // console.log(this.lat)
    // console.log(this.long)
    this.map = await GoogleMap.create({
      id: 'locationmap',

      apiKey: 'AIzaSyDac6ZrCZExw86GubhTfRqVWJs0-RVy40U',

      config: {
        center: {
          lat: this.lat,
          lng: this.long,
        },
        zoom: 18
      },

      element: mapRef,

      forceCreate: true

    })
    this.addMarkers();
    // this.geofencing()
    // let lat = (this.lat).toString()
    this.googledistance.getDistanceMatrix((this.lat+',' +this.long), ('-1.285790,36.820030'))
    .subscribe((res)=>{
      console.log(res.rows[0].elements[0].distance.text)
    })
    this.googledistance.test()
  }

  // Gets current location
  async getlocation() {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates.coords);
    // console.log(this.lat)
    // console.log(this.long)
    const options = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      apiKey: 'AIzaSyDac6ZrCZExw86GubhTfRqVWJs0-RVy40U'
    };
    console.log('text location: ', NativeGeocoder.reverseGeocode(options)
      // )
      // console.log(this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude)
    )
    return [coordinates.coords.latitude, coordinates.coords.longitude]
  }

  async addMarkers() {
    [this.lat, this.long] = await this.getlocation()
    const markers: Marker = {
      coordinate: {
        lat: this.lat,
        lng: this.long
      }
    }
    this.map.addMarker(markers)
  }
  ngOnInit() {
  }


}
