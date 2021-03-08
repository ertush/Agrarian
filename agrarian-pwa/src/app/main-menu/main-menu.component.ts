import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    animations: [trigger(
        'toggleNav',
        [
            state( 'collapsed, void', style({transform: 'translateX(-100%)'}) ),
            state( 'expanded', style({transform: 'translateX(0)'}) ),
            transition( 'collapsed <=> expanded',
                [
                    animate( 200 ),
                    animate( 200 )
                ]
            )
        ]
    )],
    encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent implements OnInit {
    public year = new Date().getFullYear();
    public navState: string;
    public menuTitle: string;
    public isMobile: boolean;

    // 'https://www.w3schools.com/w3images/avatar2.png',

    public user: any;

    constructor(
        private router: Router,
        private deviceService: DeviceDetectorService,
        private authService: AuthService
        ) {
        if ( window.innerWidth < 1200 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
        this.menuTitle = 'Dashboard';

        

        // const userProfile = this.cacheService.get('userProfile');
        // const userInfo = this.cacheService.get('userInfo');
        
        // const providerData = this.cacheService.getProviderData();

        // Load default user if user not set
        if (this.user === undefined) {
            console.log({userInfo: this.authService.getUserInfo()});
            this.user = {
                given_name: 'user',
                email: 'user@email.domain',
                picture: '../../assets/avatar-placeholder.png'
            };
        }

        // if (userProfile !== undefined) this.user = userProfile;
        // console.log({userProfile, userInfo}); // Debug
    }

    ngOnInit(): void {
        this.isMobile = this.deviceService.isMobile();


    }

    @HostBinding('attr.id') protected get id(): string {
        return 'app';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'app container-fluid';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if ( event.target.innerWidth < 1200 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    public showNav() {
        return this.router.url !== '/signin';
    }


    public logOut() {
        if (this.isMobile) {
            this.toggleNav();
            this.menuTitle = 'dashboard';
        }
        this.authService.doLogOut()
        .then(val => {
            console.log({logoutResponse: val});
            this.router.navigate(['/signin']);
        })
        .catch(err => console.log({logoutError: err}));

    }

    public toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    public navigate(path: string): void {

        if (this.isMobile) {
            this.toggleNav();
        }

        this.menuTitle = (path.split('/')[1] === 'issues' ? 'reports' : path.split('/')[1]);

        this.router.navigate([path]);
    }

}
