import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { 
      this.xyz();
      this.wxyz();
      this.moreAPI();
      this.thenmoreAPI();
  }
  xyz(){
      let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
      bulbasaur.subscribe(pokemoninfo => 
        console.log("Hi", pokemoninfo)

      );
  }
  wxyz(){
      let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
      bulbasaur.subscribe(pokemoninfo => 
        console.log("Base EXP", pokemoninfo["base_experience"])

      );
  }
  moreAPI(){
      let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
      bulbasaur.subscribe(pokemoninfo => 
        {let btb = this._http.get(pokemoninfo["abilities"][1]["ability"]["url"])
        btb.subscribe(abilityinfo =>
            console.log("# of pokemon with ability Overgrowth   " + abilityinfo["pokemon"].length)
        )

        }
      
      );

    
  }
  thenmoreAPI(){
      let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
      bulbasaur.subscribe(pokemoninfo => 
        {let btb = this._http.get(pokemoninfo["abilities"][1]["ability"]["url"])
        btb.subscribe(abilityinfo =>
            {for ( var i =0; i< abilityinfo["pokemon"].length; i++){
                console.log ("Pokemon W/ overgrowth " + (i+1) + " " + abilityinfo["pokemon"][i]["pokemon"]["name"])
            }
          }
        )

        }
      
      );

    
  }


}
