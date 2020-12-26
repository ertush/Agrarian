import { IssueTypesCloneComponent } from './../charts/issue-types-clone.component';
import { Component, ViewEncapsulation, HostBinding, OnDestroy } from '@angular/core';
import { GithubService } from './../shared/github.service';
import { IssuesProcessor } from './../shared/issues-processor.service';
import { IssuesModel } from './../shared/issues.model';

import 'hammerjs';
import { Subscription, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MqttService } from './../shared/mqtt.service';

@Component({
    selector: 'app-dashboard',
    providers: [GithubService, IssuesProcessor],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dashboard.template.html'
})
export class DashboardComponent implements OnDestroy {

    public min: Date = new Date();
    public max: Date = new Date(this.min.getTime() + 20000);
    public style = 'smooth';
    public unit = 'fit';

    public espData = [];
    public isLoading = true;
    public today: Date = new Date();
    public rangeStart: Date;
    public issues: any;
    public months = 3;
    private data: any;
    private subscription: Subscription;
    private selectedIndex = 0;

    public _espData = [];
    public _tempHumidityData = [];
    public _tempData = [];



    @HostBinding('attr.id') get get_id() { return 'dashboard'; }
    @HostBinding('class') get get_class() { return 'container-fluid'; }


    /**/
    /* private asyncMqttService: NgxMqttService*/
    constructor(
        public githubService: GithubService,
        public issuesProcessor: IssuesProcessor,
        // tslint:disable-next-line: no-shadowed-variable
        private MqttService: MqttService
        ) {


        this.rangeStart = this.issuesProcessor.getMonthsRange(this.months);
        this.subscription =
          merge(
            githubService
              .getGithubIssues({pages: 5})
              .pipe(map(data => {
                  this.data = data;
                  this.isLoading = false;
                  return this.issuesProcessor.process(data, this.months);
              }, (err) => this.isLoading = false)),
              of(new IssuesModel())
          )
          .subscribe((data: IssuesModel) => {
              this.issues = data;
              // Debug
              console.log({data: data});
          });

        /* Line Real time chart */
        this.MqttService.fetchData()
        .subscribe(m => {
          const payload = m.split('/')[0];
          const topic = m.split('/')[1];

          switch (topic) {
              case 'esp8266':
                const data_esp: any = JSON.parse(payload);
                this.isLoading = false;
                this._espData = data_esp;
                  break;
              case 'humidTemp':
                  const data_ht: any = JSON.parse(payload);
                  this.isLoading = false;
                  this._tempHumidityData = data_ht;
                  this._tempHumidityData.forEach((value, index, array) => value.date = new Date());
                  console.log({_tempHumid: this._tempHumidityData});

                  break;
              case 'custom':
                  const data_custom: any = JSON.parse(payload);
                    this.isLoading = false;
                  break;
              case 'temp':
          const item: any = JSON.parse(payload);
          this.isLoading = false;

          item.time = new Date(item.time);
          if (item.value) {
            this._tempData = [...this._tempData, item];
            if (this._tempData.length > 20) {
              this.min = this._tempData[this._tempData.length - 20].time;
              this.max = item.time;
            }
            // prevent running out-of-memory when client is connected for too long
            if (this._tempData.length > 500) {
              this._tempData = this._tempData.slice(480);
            }
          }
                    break;
              default:
                  break;
          }

        },
        error => {
            console.log({error});
        }
        );
    }

    onFilterClick(months) {
        if (this.months !== months) {
            this.months = months;
            this.rangeStart = this.issuesProcessor.getMonthsRange(months);
            this.issues = this.issuesProcessor.process(this.data, months);
            this.filterIssues(this.selectedIndex);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onTabSelect(event) {
        this.filterIssues(event.index);
    }

    filterIssues(index) {
        switch (index) {
            case 0 :
                this.issues = this.issuesProcessor.process(this.data, this.months);
                this.selectedIndex = 0;
                break;
            case 1 :
                const assigned = this.issuesProcessor.flatten(this.data)
                  .filter(item => item.assignee ? item.assignee.login === 'ggkrustev' : false);
                this.issues = this.issuesProcessor.process(assigned, this.months);
                this.selectedIndex = 1;
                break;
            case 2 :
                const created = this.issuesProcessor.flatten(this.data).filter(item => item.user.login === 'ggkrustev');
                this.issues = this.issuesProcessor.process(created, this.months);
                this.selectedIndex = 2;
                break;
            default : this.issues = this.issuesProcessor.process(this.data, this.months);
        }
    }

}
