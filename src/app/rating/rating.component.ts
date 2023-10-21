import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {range} from "rxjs";

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
export class RatingComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {

  @Input() starsLength: number = 5;
  value: any = null;
  stars: Array<number> = []

  public onChange(newVal: any) {
  }

  public onTouched(_?: any) {
  }

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  writeValue(val: any) {
    this.value = val;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setStarts();
  }

  setStarts() {
    this.stars = [];
    range(0, this.starsLength).subscribe({
      next: (res) => {
        this.stars.push(res)
      }
    })
  }

  ngOnInit() {
    this.setStarts()
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
        this.addSelected(svgs[i], 'active')
      } else {
        this.removeSelected(svgs[i], 'active')
      }
    }
  }

  hoverRating(index: number) {
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');
    for (let i = 0, j = svgs.length; i < j; i++) {
      if (i <= index) {
        this.addSelected(svgs[i], 'hover')
      } else {
        this.removeSelected(svgs[i], 'hover')
      }
    }
  }

  mouseOutRating(index: number) {
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');
    for (let i = 0, j = svgs.length; i < j; i++) {
      this.removeSelected(svgs[i], 'hover')
    }
  }

  removeSelected(item: any, className: string) {
    this.renderer.removeClass(item, className);
  }

  addSelected(item: any, className: string) {
    this.renderer.addClass(item, className);
  }


  ngAfterViewInit() {
    if (this.value !== null) {
      let initialValue = this.value;
      this.setRating(--initialValue);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
