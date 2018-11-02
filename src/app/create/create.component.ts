import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor() { }

  private weightCounter = 100;

  public AddWeight(): void {
    console.log('will add weight');
  }

  ngOnInit() {
  }

}
