import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {
  protected readonly activatedRoute = inject(ActivatedRoute);
}
