import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  isLoadForm = false;
  isGetInTouch = true;
  isDialogVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  loadForm(e): void {
    if (this.isLoadForm === false) this.isLoadForm = true;
    // e.target.parentElement.hidden = true;
    this.isGetInTouch = false;
  }
  onSubmissionDialogClose(): void{
    this.isDialogVisible = false;
  }

  onSubmit(e): void{
    e.preventDefault();
    this.isLoadForm = false;
    this.isGetInTouch = true;  
    this.isDialogVisible = true;
  }

}
