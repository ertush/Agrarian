import { AngularFireAuth } from '@angular/fire/auth';
import { Component, ViewEncapsulation, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './profile.template.html'
})
export class ProfileComponent implements OnInit{
    public isLoading = true;
    
    public profileDialogVisible = false;
    public deleteDialogVisible = false;

    user: any;
    error = '';
    errorCode: any;
    userName: string;
    defaultPhoto = '../../assets/avatar-placeholder.png';

    @HostBinding('attr.id') get get_id() { return 'profile'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth ) {
            this.afAuth.authState.subscribe(user => {
                if (user) {
                    this.isLoading = false;
                    this.user = user;
                }
            },error => { 
                this.errorCode = error.code;
                this.error = error;
            });
    }
    ngOnInit(): void {
    }

    public onProfileDialogClose() {
        this.profileDialogVisible = false;
    }

    public onSignOutClick() {
        this.router.navigate(['/signin']);
    }

    public onUpdateClick() {
        this.profileDialogVisible = true;
    }

    public onDeleteClick() {
        this.deleteDialogVisible = true;
        
    }

    public onDeleteDialogClose() {
        this.deleteDialogVisible = false;
    }

    onPictureEdit(event: any) {    
        console.log({event});
    }
}
