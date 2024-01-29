import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-vr',
  templateUrl: './vr.component.html',
  styleUrls: ['./vr.component.css']
})
export class VrComponent implements OnInit {
  private parallaxElement!: HTMLElement;
  private iconsElement!: HTMLElement;
  private mousePos = { x: 0, y: 0 };
  private iconDesiredPos = { x: 0, y: 0 };
  private pos = { x: 0, y: 0 };
  private iconPos = { x: 0, y: 0 };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.parallaxElement = this.elementRef.nativeElement.querySelector('#parallax');
    this.iconsElement = this.elementRef.nativeElement.querySelector('.icons');

    this.parallaxElement.addEventListener('pointermove', (e) => {
      this.mousePos = {
        x: e.clientX - this.parallaxElement.getBoundingClientRect().left,
        y: e.clientY - this.parallaxElement.getBoundingClientRect().top
      };

      this.iconDesiredPos = {
        x: (e.clientX - window.innerWidth / 2) - this.iconsElement.getBoundingClientRect().left,
        y: (e.clientY - window.innerHeight / 2) - this.iconsElement.getBoundingClientRect().top
      };
    });

    this.render();
  }

  private render(): void {
    this.pos.x += this.easing(this.pos.x, this.mousePos.x, 0.01);
    this.pos.y += this.easing(this.pos.y, this.mousePos.y, 0.01);
    this.renderer.setStyle(this.parallaxElement, 'transform-origin', `${this.pos.x}px ${this.pos.y}px`);
    this.renderer.setStyle(this.parallaxElement, 'transform', 'scale(1.25)');

    this.iconPos.x += this.easing(this.iconPos.x, this.iconDesiredPos.x / -10, 0.01);
    this.iconPos.y += this.easing(this.iconPos.y, this.iconDesiredPos.y / -10, 0.01);
    this.renderer.setStyle(this.iconsElement, 'transform', `translateX(${this.iconPos.x}px) translateY(${this.iconPos.y}px)`);

    requestAnimationFrame(() => this.render());
  }

  private easing(a: number, b: number, speed: number): number {
    return (b - a) * speed;
  }
}



