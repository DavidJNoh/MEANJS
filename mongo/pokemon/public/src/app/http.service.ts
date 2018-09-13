import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' 
})
export class HttpService {
  constructor(private _http: HttpClient) {
  }
  xyz(){
      // let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
      // bulbasaur.subscribe(pokemoninfo => 
      //   console.log("Hi", pokemoninfo)

      // );
      return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  }
  wxyz(){
      return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');

  }
  moreAPI(){
      return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  }

  apiInception(x){
      return this._http.get(x);
  }
  postToServer(num){
        // use the .post() method of HttpClient
        // num must be an object
        // provide the url of your post route - make sure this is set up in your server!
        return this._http.post('/link', num);  
    }


}
