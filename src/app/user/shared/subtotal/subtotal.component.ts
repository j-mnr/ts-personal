import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.css'],
})
export class SubtotalComponent implements OnInit {
  @Input() orderTotal!: number;
  @Output() clearCart: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
