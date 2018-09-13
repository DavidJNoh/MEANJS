import { Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Pokemon';
  pokemon = [];
  num: number;
  randNum: number;
  str: string;
  first_name: string;
  snacks: string[];
  loggedIn: boolean;
  onButtonClick(): void { 
    console.log(`Click event is working`);
  }
  onButtonClickParam(num: Number): void { 
      console.log(`Click event is working with num param: ${num}`);
      let observable = this._httpService.postToServer({data: num});
      observable.subscribe(data => console.log("Got our data!", data));
  }
  onButtonClickParams(num: Number, str: String): void { 
      console.log(`Click event is working with num param: ${num} and str param: ${str}`);
  }
  onButtonClickEvent(event: any): void { 
      console.log(`Click event is working with event: ${event}`);
  }


  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.xyz();
    this.wxyz();
    this.moreAPI();
    this.thenmoreAPI();

    this.num = 7;
    this.randNum = Math.floor( (Math.random()  * 2 ) + 1);
    this.str = 'Hello Angular Developer!';
    this.first_name = 'Alpha';

    this.snacks = [];
    this.loggedIn = true;

    
  }
  xyz(){
    let observable = this._httpService.xyz();
      observable.subscribe(data => { 
        console.log("Hi", data)
        this.pokemon = data['pokemon'];
      });
  }
  wxyz(){
      let observable = this._httpService.wxyz();
      observable.subscribe(data => {
        console.log("Base EXP", data["base_experience"]);
        console.log(data["name"])
      }
      );
  }
  moreAPI(){
      let observable = this._httpService.moreAPI();
      observable.subscribe(data => 
        {
        let btb = this._httpService.apiInception(data["abilities"][1]["ability"]["url"])
        btb.subscribe(abilityinfo =>
            console.log("# of pokemon with ability Overgrowth   " + abilityinfo["pokemon"].length)
        )

        }
      );
  }

  thenmoreAPI(){
      let observable = this._httpService.moreAPI();
      observable.subscribe(data => 
        {
        let btb = this._httpService.apiInception(data["abilities"][1]["ability"]["url"])
        btb.subscribe(abilityinfo =>
          {for ( var i =0; i< abilityinfo["pokemon"].length; i++){
              console.log ("Pokemon W/ overgrowth " + (i+1) + " " + abilityinfo["pokemon"][i]["pokemon"]["name"])
              this.snacks.push(abilityinfo["pokemon"][i]["pokemon"]["name"])
          }
        }
        )

        }
      );
  }
}


