import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, ViewEncapsulation, OnChanges, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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
export class MainMenuComponent {
    public year = new Date().getFullYear();
    public navState: string;
    public menuTitle: string;

    constructor(private router: Router, private element: ElementRef) {
        if ( window.innerWidth < 1200 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
        this.menuTitle = 'Dashboard';
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

    public toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    public setTitle(e: any): void {
        (e.target.innerHTML === 'Sign Out' ? this.menuTitle = 'Dashboard' : this.menuTitle = e.target.innerHTML);
    }

}
