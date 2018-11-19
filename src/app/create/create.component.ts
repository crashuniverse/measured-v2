import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  weightsRef: AngularFireList<Weight>;

  weight = new Weight('', {
    date: new Date().toISOString(),
  });

  isSubmitted = false;
  error = false;

  constructor(private af: AngularFireDatabase) { }

  public AddWeight(): void {
    this.isSubmitted = false;
    this.error = false;
    this.weightsRef.push(this.weight)
      .then(() => {
        this.isSubmitted = true;
      }, (error) => {
        this.error = true;
        console.error(error);
      });
  }

  ngOnInit() {
    this.weightsRef = this.af.list('weights');
  }

}

class Weight {
  constructor(
    public text: string,
    public _created_at: object,
  ) {}
}
