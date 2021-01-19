import { FhubService } from './../shared/fhub.service';
import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { GithubService } from './../shared/github.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    encapsulation: ViewEncapsulation.None,
    providers: [GithubService],
    templateUrl: './profile.template.html'
})
export class ProfileComponent {
    public isLoading = true;
    public user: any = {};
    public profileDialogVisible = false;
    public deleteDialogVisible = false;

    @HostBinding('attr.id') get get_id() { return 'profile'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }

    constructor(public githubService: GithubService, private router: Router, private fhubService: FhubService ) {
        
        this.fhubService.getUsers().subscribe(data => {
            this.user = data[1];
            this.isLoading = false;
        }, (err) => {
            this.isLoading = false;
        });
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
}
