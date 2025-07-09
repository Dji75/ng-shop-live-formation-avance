import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard implements AfterContentInit {
  @ContentChild('content') content?: ElementRef;

  @Input() index: number = 0;

  ngAfterContentInit(): void {
    console.log('ProductCard:ngAfterContentInit -> content: ', this.content?.nativeElement.innerHTML);
  }
}
