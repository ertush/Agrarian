import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  isLoadForm = false;
  isGetInTouch = true;
  isDialogVisible = false;
  isUserEmailVerified = true;
  isVerify = false;
  isMobile = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private deviceDetectorService: DeviceDetectorService,
    ) { }

  ngOnInit(): void {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.isUserEmailVerified =
    this.router.url.split('?')[1].split('=')[1] === 'false' ? false : true;
  }

  loadForm(e): void {
    if (this.isLoadForm === false) this.isLoadForm = true;
    // e.target.parentElement.hidden = true;
    this.isGetInTouch = false;
  }
  onSubmissionDialogClose(): void {
    this.isDialogVisible = false;
  }

  onSubmit(e): void {
    e.preventDefault();
    this.isLoadForm = false;
    this.isGetInTouch = true;
    this.isDialogVisible = true;
  }


  closeModal() {
    this.isUserEmailVerified = true; 
  }

  verifyUser(){
    this.afAuth.user.subscribe(success => {
      if (success) success.sendEmailVerification();
    },
    e => console.log(e.message));
    this.isVerify = true;
  }

}
