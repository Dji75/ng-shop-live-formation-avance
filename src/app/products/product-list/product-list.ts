import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Highlight } from '../../shared/directives/highlight';
import { ProductCard } from '../core/product-card/product-card';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.html',
  imports: [
    Highlight,
    ProductCard
  ],
  styleUrl: './product-list.scss'
})
export class ProductList implements AfterViewInit, OnInit {
  products = new Array(15);


  @ViewChild(ProductCard) card?: ProductCard;

  ngOnInit(): void {
    console.log('ProductList: ngOnInit -> card index is: ', this.card?.index);
  }

  ngAfterViewInit(): void {
    console.log('ProductList: ngAfterViewInit -> card index is: ', this.card?.index);
  }
}
