import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  protected value = 0;

  ngOnInit() {
    setInterval(() => {
      this.value++;
      this.cdRef.markForCheck();
    }, 1000);
  }
}
