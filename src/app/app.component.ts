import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  count = 1

  constructor(){}
  onChange() {
    this.count = this.count+1;
    debugger
    console.log(this.count)
  }
}
