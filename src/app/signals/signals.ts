import { Component, computed, effect, linkedSignal, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';


interface Product { id: string, category: string };

@Component({
  selector: 'app-signals',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class Signals {
  protected readonly compteur = signal(0);

  protected readonly model  = model(5);
  protected readonly valeur1  = signal(5);
  protected readonly valeur2 = signal(2);
  protected readonly somme = computed(() => this.valeur1() + this.valeur2());

  protected readonly texte = signal<string>(window.localStorage.getItem('texte') ?? '');

  private readonly saveToLocalStorage = effect(() => {
    window.localStorage.setItem('texte', this.texte());
  })


  protected readonly productsHttpRessource = httpResource<Product[]>(() => `https://fakestoreapi.com/products`);


  protected categories = computed<string[]>(() => {
    if (!this.productsHttpRessource.hasValue()) {
      return [];
    }
    return [...new Set(this.productsHttpRessource.value().map(p => p.category)).values()];
  })

  protected readonly selectedCategory = linkedSignal(() => this.categories()[0]);

  protected readonly filteredProducts = computed<Product[]>(() =>
    this.productsHttpRessource.value()?.filter(p => p.category === this.selectedCategory()) ?? []
  );

  increment():void {
    this.compteur.update(v => v + 1);
  }

  decrement():void {
    this.compteur.update(v => v - 1);
  }

  selectCategory(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }
}
