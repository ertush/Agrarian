import { environment as env } from './../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  template: `
    <div class="k-card">
        <h2 class="k-card-header text-center m-0">Weather</h2>
        <div class="row">
          <div *ngIf="isLoading" style="height: 400px">
              <app-loading-spinner></app-loading-spinner>
          </div>
          <div  *ngIf="!isLoading" class="weather-icon">
            <h1 class="mt-2">
              <i [ngClass]="getClasses(icon)"></i>
            </h1>
            <h3>{{ location }}</h3>
          </div>
       </div>
  </div>
        `,
  styles: [`
    .weather-icon{
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 400px;
    justify-content: center;
    align-items: center;
    font-size: 3em;
  }

  .weather-icon i {
    flex: 1;
    padding: 1em;
  }
  `]
})
export class WeatherComponent implements OnInit {

  @Input() public lat: number;
  @Input() public lon: number;

  public isLoading = true;
  public icon: string;
  public location: string;
  public uri: string;
  constructor() { }

  ngOnInit() {
    
    this.uri = `${env.api.url}?lat=${this.lat}&lon=${this.lon}&APPID=${env.api.appId}`;
    // Debug
    console.log({uri: this.uri});
    fetch(this.uri)
    .then( res => {
      if (res.ok ) {
        this.isLoading = false;
        res.json()
        .then( value => {
          // Debug
          console.log({value});

          this.icon = value.icon;
          this.location = value.loaction;
        })
        .catch(err => console.log(err))
      }
    })
    .catch( error => {
      console.log(error);
    })
  }

  public getClasses(icon: string): string{
    return `fa-4x wi wi-owm-${icon}`;
  }
}
