import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit/*, OnDestroy*/ {
  protected readonly activatedRoute = inject(ActivatedRoute);
  // private readonly destroyed$ = new Subject<void>();
  private readonly destroyRef$ = inject(DestroyRef);

  constructor() {
    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe(() => {
      // do stuff
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
        /*takeUntil(this.destroyed$)*/
        takeUntilDestroyed(this.destroyRef$)).subscribe((params) => {
      console.log('params: ', params);
    });
  }

  // ngOnDestroy(): void {
  //   this.destroyed$.next();
  //   this.destroyed$.complete();
  // }
}
