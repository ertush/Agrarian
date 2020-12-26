import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-statistics-clone',
    template: `
        <div class="row">
            <div class="col-12">
                <div *ngIf="loading" class="k-card" style="height: 400px">
                    <app-loading-spinner>
                    </app-loading-spinner>
                </div>
                <app-active-issues-clone
                [data]="data"
                [duration]="duration">
                </app-active-issues-clone>
            </div>
            <!--
            <div *ngIf="!loading && dataset.length" class="col-xl-4">
                <app-issue-types-clone [data]="dataset"></app-issue-types-clone>
            </div>
             <div *ngIf="!loading && issues.active.length" class="col-xl-8">
                <app-types-distribution [data]="issues.typesDistribution" [months]="months" *ngIf="issues.active.length">
                </app-types-distribution>
            </div> -->
        </div>

    `
})
export class StatisticsCloneComponent {
    @Input() public duration;
    @Input() public data;
    @Input() public loading;
}
