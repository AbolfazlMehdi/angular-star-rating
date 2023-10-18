import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  restaurant = 'Chili\'s';

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      cleanliness: this.fb.control(null),
      quality: this.fb.control(2)
    });

    // confirm values
    this.form.valueChanges.subscribe(data => { console.log(data); });
  }

  onSubmit(){ console.log(this.form.value); }

  public ratingMessage(ratingName: string) {

  }
}
