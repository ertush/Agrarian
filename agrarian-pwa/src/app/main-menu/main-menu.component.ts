import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import isMobileTablet from '../shared/deviceUtil';
import { FhubService } from '../shared/fhub.service';

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

    constructor(private router: Router, private element: ElementRef, private fhubService: FhubService) {
        if ( window.innerWidth < 1200 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
        this.menuTitle = 'Dashboard';

        this.fhubService.getUsers().subscribe(data => {
            this.user = data[1];
        }, (err) => {
            console.log(err);
        });
    }
    ngOnInit(): void {
        this.isMobile = isMobileTablet();
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
        this.router.navigate(['/signin']);
    }

    public toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    public setTitle(e: any): void {
        const title = e.originalTarget.childNodes[1].data;
        if (this.isMobile) { this.toggleNav(); }
        if (title) {
        (title === 'Log Out' ? this.menuTitle = 'Dashboard' : this.menuTitle = title);
        } else {
        this.menuTitle = '';
        }
    }

}
