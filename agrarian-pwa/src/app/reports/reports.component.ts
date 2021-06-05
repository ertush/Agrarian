
import { Component, HostBinding, ViewEncapsulation, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { GithubService } from '../shared/github.service';
// import { IssuesProcessor } from '../shared/issues-processor.service';
// import data from './data';

@Component({
    selector: 'app-reports',
    encapsulation: ViewEncapsulation.None,
    providers: [/*
        GithubService,
        IssuesProcessor
        */
    ],
    templateUrl: './reports.template.html'
})

export class ReportsComponent implements OnInit{
    isMobile = this.deviceService.isMobile();
    isLoading = true;
    // selectedPeriod = 3;
    // issues: any;
    // allIssues: any;
    // view: any;
    // total = 5;
    // pageSize = 10;
    // skip = 0;
    // today = new Date();
    // months = 3;
    // range: {
    //     to: Date,
    //     from: Date
    // } = this.dateRange();

    timeOut;
    timedOut = false;
    wait = 4000;

    @HostBinding('attr.id') get get_id() { return 'issues'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }

    constructor(/*
         private githubService: GithubService,
         private issuesProcessor: IssuesProcessor,
         */
         private deviceService: DeviceDetectorService
         ) {

        // this.githubService.getGithubIssues({ pages: 5 }).subscribe((data: any[]) => {
        //     data = data.reduce((agg, curr) => [...agg, ...curr], []).filter(issue => issue.pull_request ? false : true);
        //     this.allIssues = data;
        //     console.log({allIssues: this.allIssues, months: this.months}) //debug
        //     this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, this.months));
        //     this.isLoading = false;
        // }, () => this.isLoading = false);



        // data().subscribe(data => {
        //     this.allIssues = data;
        // }, () => this.isLoading = false)

    }
    ngOnInit(): void {
        this.timeOut = setTimeout(() => {
            this.timedOut = true;
            this.isLoading = false;
        }, this.wait);
    }

    // onFilterClick(e) {
    //     this.selectedPeriod = e;
    //     this.skip = 0;
    //     this.months = e;
    //     this.range = this.dateRange();
    //     this.applyPaging(this.issuesProcessor.filterByMonth(this.allIssues, e));
    // }

    // onPageChange(e) {
    //     this.skip = e.skip;
    //     this.view = this.getView(e.skip, e.take);

    // }

    // applyPaging(data) {
    //     this.issues = data;
    //     this.view = this.getView(this.skip, this.pageSize);
    //     console.log({view: this.view}); // debug
    // }

    // getView(skip, take) {
    //     return {
    //         data: this.issues.slice(skip, skip + take),
    //         total: this.issues.length
    //     };
    // }

    // dateRange() {
    //     return {
    //         to: new Date(),
    //         from: this.issuesProcessor.getMonthsRange(this.months)
    //     };
    // }
}
