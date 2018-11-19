import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  weightsRef: AngularFireList<any[]>;
  weights: Observable<any[]>;
  recentWeights: Observable<RecentWeightItem[]>;
  context: CanvasRenderingContext2D;
  chart: any;

  chartConfig = {
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
      },
    },
    type: 'line',
  };

  constructor(private af: AngularFireDatabase) {}

  getFormattedDate = (date) => {
    const dateObject = new Date(date);
    const dateString = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
    return dateString;
  }

  ngOnInit() {
    this.weightsRef = this.af.list('weights');
    this.weights = this.weightsRef.valueChanges();
    this.recentWeights = this.weights.pipe(
      map(item => {
        return item.map((s) => {
          return new RecentWeightItem(s._created_at && s._created_at.date, s.text);
        });
      })
    );

    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');

    this.recentWeights.subscribe((weights) => {
      const labels = weights.map(weight => this.getFormattedDate(weight.createdAt));
      const data = weights.map(weight => weight.text);
      this.chart = new Chart(this.context, {
        ...this.chartConfig,
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: 'rgba(44,62,80,1)',
          }]
        }
      });
    });
  }
}

class RecentWeightItem {
  createdAt: Date;
  text: string;

  constructor(createdAt: string, text: string) {
    this.createdAt = new Date(createdAt);
    this.text = text;
  }
}
