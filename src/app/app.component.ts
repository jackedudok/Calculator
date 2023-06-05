import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { NumbersOnlyDirective } from './numbers-only.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild(NumbersOnlyDirective) numbersOnlyDirective!: NumbersOnlyDirective;

  private unsubscribe$ = new Subject<void>();

  calculatorFormGroup = new FormGroup({
    amount: new FormControl(),
    currency: new FormControl(),
    period: new FormControl(),
  })

  profit!: number
  percent!: number
  currencyCode!: string

  currencies = [
    {
      id: 1,
      currencyCode: 'USD',
      name: 'TUSD (Test US Dollar)',
      apr: '12'
    },
    {
      id: 2,
      currencyCode: 'EUR',
      name: 'TEUR (Test Euro)',
      apr: '13'
    },
    {
      id: 3,
      currencyCode: 'CNY',
      name: 'TCNY (Test Chinese Yuan)',
      apr: '20'
    },
    {
      id: 4,
      currencyCode: 'INR',
      name: 'TINR (Test Indian Rupee)',
      apr: '33'
    },
    {
      id: 5,
      currencyCode: 'BRL',
      name: 'TBRL (Test Brazilian Real)',
      apr: '21'
    },
    {
      id: 6,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 7,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 8,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 9,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },    {
      id: 10,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 6,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 11,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 12,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 13,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 14,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 15,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 16,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 17,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 18,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 19,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 20,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 21,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    },
    {
      id: 22,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 23,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
    ,
    {
      id: 24,
      currencyCode: 'IDR',
      name: 'TIDR (Test Indonesian Rupiah)',
      apr: '80'
    }
  ];
  period = [
    { value: 1 },
    { value: 3 },
    { value: 6 },
    { value: 12 },
    { value: 24 },
  ];
  ratingStars = [
    { width: '17px', height: '16px' },
    { width: '20px', height: '19px' },
    { width: '22px', height: '21px' },
    { width: '23px', height: '20px' },
    { width: '24px', height: '23px' },
  ];

  constructor() {
    this.calculatorFormGroup.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        const amount = this.getAmount(value.amount)
        const duration = value.period
        const currency = this.currencies.find(el => el.id === value.currency)
        this.currencyCode = currency?.currencyCode as string
        this.percent = +currency!.apr
        this.profit = this.calculateProfit(amount, +currency!.apr, duration)
      })

    this.calculatorFormGroup.setValue({amount: '50000', currency: this.currencies[0].id, period: this.period[3].value})
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private calculateProfit(amount: number, interestRate: number, duration: number): number {
    return (amount * (interestRate / 100) * (duration / 12))
  }

  private getAmount(value: string) {
    const maxAmount = 1000000
    const minAmount: number = 1000
    const amount: number = +value.replace(/\D/g, '');

    if(amount < minAmount) {
      return minAmount
    } else if (amount > maxAmount) {
      return  maxAmount
    } else {
      return amount
    }
  }

  addAmount() {
    this.calculatorFormGroup.patchValue({
      amount: (this.getAmount(this.calculatorFormGroup.get('amount')?.value) + 1000).toString()
    })
  }

  subtractAmount() {
    this.calculatorFormGroup.patchValue({
      amount: (this.getAmount(this.calculatorFormGroup.get('amount')?.value) - 1000).toString()
    })
  }
}
