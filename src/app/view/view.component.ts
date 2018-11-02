import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  weights: AngularFireList<any[]>;

  constructor(private af: AngularFireDatabase) {
    this.weights = af.list('/').valueChanges();
  }

  ngOnInit() {}

}
