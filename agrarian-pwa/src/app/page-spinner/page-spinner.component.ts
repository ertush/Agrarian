import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-spinner',
  template:`
      <div class="container spinner-container">
        <div class="k-i-loading text-center spinner">
        </div>
      </div>
  ` ,
  styles: [`
  .spinner-container{
    width:100%;
    height:100vh; 
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .spinner{
    width:100px; 
    font-size: 100px; 
    height:100px;
  }
  `]
})
export class PageSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
