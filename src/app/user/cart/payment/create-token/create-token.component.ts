import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css'],
})
export class CreateTokenComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  @Output() stripeToken: EventEmitter<string> = new EventEmitter();
  isProcessing!: boolean;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666ee8',
        color: '#fff',
        fontWeight: '300',
        fontSize: '18px',
        '::placeholder': {
          color: '#cfd7e0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.isProcessing = false;
  }

  createToken(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.stripeToken.emit(result.token.id);
        } else if (result.error) {
        }
      });
  }
}
