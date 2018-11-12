import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {

  weightsRef: AngularFireList<any[]>;
  weights: Observable<any[]>;
  recentWeights: Observable<RecentWeightItem[]>;

  constructor(private af: AngularFireDatabase) { }

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
