import { Component } from '@angular/core';
import { Highlight } from '../../shared/directives/highlight';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.html',
  imports: [
    Highlight
  ],
  styleUrl: './product-list.scss'
})
export class ProductList {

  products = new Array(15);
}
