import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight],[highlightOnOverWhenActive]',
  host: {
    '[class.highlighted]': 'isActive && isHovered',
  }
})
export class Highlight {
  protected isHovered = false;
  protected isActive = false;

  @HostListener('mouseenter')
  onHover() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.isHovered = false;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'a') {
      this.isActive = true;
    } else if (event.key === 'q') {
      this.isActive = false;
    }
  }
}
