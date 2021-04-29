import { AngularFireAuth } from '@angular/fire/auth';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


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
    year = new Date().getFullYear();
    navState: string;
    menuTitle: string;
    isMobile: boolean;

    return = '';
    user: any;
    // defaultPhoto: string = '../../assets/avatar-placeholder.png';

    constructor(
        private router: Router,
        private deviceService: DeviceDetectorService,
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute
        ) {
        if ( window.innerWidth < 1200 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
        this.menuTitle = 'Home';

        this.afAuth.authState.subscribe(user => {
            if(user){
                this.user = user;
            }
        });

     
      
    
        // Load default user if user not set
        if (this.user === undefined) {
            this.user = {
                displayName: 'user',
                email: 'user@email.domain',
                photoURL: null
            };
        }

    }

    ngOnInit(): void {
        this.isMobile = this.deviceService.isMobile();
        this.route.queryParams
        .subscribe(params => this.return = params['return'] || '/dashboard');


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

    showNav() {
        return this.router.url !== '/signin';
    }


    logOut() {
        if (this.isMobile) {
            this.toggleNav();
            this.menuTitle = 'Home';
        }
        
        if (this.afAuth.auth.currentUser) {
            this.afAuth.auth.signOut();
           this.router.navigate(['/signin']);
        }
    }


    toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    navigate(path: string): void {

        if (this.isMobile) {
            this.toggleNav();
        }

        this.menuTitle = (path.split('/')[1] === 'issues' ? 'reports' : path.split('/')[1]);

        this.router.navigate([path]);
    }

}
