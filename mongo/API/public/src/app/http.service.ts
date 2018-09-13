import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient){
      this.getUsers();  
      this.getUsers2();
  }
  getUsers(){
    // our http response is an Observable, store it in a variable
    let observable1 = this._http.get('/users');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable1.subscribe(data => console.log("Got our Users!", data));
  }
  getUsers2(){
    // our http response is an Observable, store it in a variable
    let observable1 = this._http.get('/users/5b9956e65da3f8690e41d368');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable1.subscribe(data => console.log("Got our special User!", data));
  }
  
  
}


