import { TempComponent } from './charts/temp.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Kendo UI
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RippleModule } from '@progress/kendo-angular-ripple';

// Components
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';
import { LabelClass } from './issues/label.directive';
import { MarkdownComponent } from './markdown/markdown.component';

import { LoadingComponent } from './shared/spinner.component';
import { DefaultComponent } from './charts/default.component';
import { ChartDonutComponent } from './charts/chart-donut.component';
import { ChartsLineComponent } from './charts/charts-line.component';
import { ChartsAreaComponent } from './charts/charts-area.component';




// environment
import { environment } from '../environments/environment';
import { AvgPipe } from './charts/avg.pipe';
import { MinmaxPipe } from './charts/minmax.pipe';
import { UserAvatarComponent } from './profile/user-avatar/user-avatar.component';
import { HeaderComponent } from './header/header.component';


Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http as any, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        LabelClass,
        AppComponent,
        MainMenuComponent,
        SigninComponent,
        DashboardComponent,
        ProfileComponent,
        IssuesComponent,
        TempComponent,
        MarkdownComponent,
        LoadingComponent,
        DefaultComponent,
        ChartsLineComponent,
        ChartsAreaComponent,
        ChartDonutComponent,
        AvgPipe,
        MinmaxPipe,
        UserAvatarComponent,
        HeaderComponent
        

    ],
    imports: [
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        BrowserModule,
        ChartsModule,
        GridModule,
        DialogModule,
        InputsModule,
        ButtonsModule,
        LayoutModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClientModule]
            }
        }),
        RippleModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
