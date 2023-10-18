import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output, Renderer2
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseControlValueAccessor} from "./BaseControlValueAccessor";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent  extends BaseControlValueAccessor<any>
  implements AfterViewInit{

  @Input() stars = [0, 1, 2, 3, 4]; // default is 5 stars
  @Input() messages: Array<string> = [] // optional text descriptors for each rating value
  @Input() label: string  =''; // optional Label
  @Input() override  value: any = null; // un-touched value should be null
  displayText: any ;
  override disabled: boolean  =false;
  ratingText: any;

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {
    super();
  }

  override writeValue(val: any) {
    this.value = val;
    super.writeValue(this.value);
  }

  setRating(rating: any) {
    this.value = rating;

    // set the value for the control
    this.onChange(this.value);
    this.onTouched();

    // SVG STAR & DOM STUFF
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');

    for (let i = 0, j = svgs.length; i < j; i++) {
      if (i <= rating) {
        this.renderer.addClass(svgs[i], 'active');
      } else {
        this.renderer.removeClass(svgs[i], 'active');
      }
    }
  }
  hoverRating(index: number){
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');
    for (let i = 0, j = svgs.length; i < j; i++) {
      this.renderer.addClass(svgs[i], 'hover');
      if (i <= index) {

      } else {
        this.renderer.removeClass(svgs[i], 'hover');
      }
    }
  }
  mouseOutRating(index: number) {
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');
    for (let i = 0, j = svgs.length; i < j; i++) {
      this.renderer.removeClass(svgs[i], 'hover');
    }
  }

  ngAfterViewInit() {
    if (this.value !== null) {
      let initialValue = this.value;
      this.setRating(--initialValue);
    }
  }
}
