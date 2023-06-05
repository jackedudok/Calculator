import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective implements AfterViewInit {
  @Input() currencyCode = 'USD';

  private currencyPipe: CurrencyPipe;

  constructor(private _el: ElementRef) {
    this.currencyPipe = new CurrencyPipe('en-US');
  }

  ngAfterViewInit() {
    this.applyFormatting(this.currencyCode)
  }

  @HostListener('ngModelChange', ['$event']) onInputChange() {
    this.applyFormatting(this.currencyCode)
  }

   applyFormatting(currencyCode: string) {
    const maxAmount = 1000000
    const minAmount: number = 1000
    const initialValue = this._el.nativeElement.value;
    const numericValue = initialValue.replace(/[^0-9]*/g, '');

    let transformedValue = numericValue;

    if (numericValue < minAmount) {
      transformedValue = minAmount;
    }

    if (numericValue > maxAmount) {
      transformedValue = maxAmount;
    }

    this._el.nativeElement.value = this.currencyPipe.transform(transformedValue, currencyCode, 'symbol', '1.0-0');
  }
}
