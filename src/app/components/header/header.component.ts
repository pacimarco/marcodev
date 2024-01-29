import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private menuActive = false;
  private pixels: HTMLElement[] = [];
  private resizeListener!: () => void;
  private menu!: HTMLElement;
  private tog!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.menu = this.el.nativeElement.querySelector('.menu');
    this.tog = this.el.nativeElement.querySelector('.toggle');
    
    this.getDimensions();
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.getDimensions();
      this.reset();
    });

    this.renderer.listen(this.tog, 'click', () => {
      this.toggleMenu();
    });

    this.initializeItemAnimations(); //aggiunta
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private initializeItemAnimations(): void {      //aggiunta
    const items = this.el.nativeElement.querySelectorAll('.item');

    items.forEach((item: Element) => {
      this.renderer.listen(item, 'mouseenter', () => this.animateText(item, true));
      this.renderer.listen(item, 'mouseleave', () => this.animateText(item, false));
    });
  }

  private animateText(item: Element, isEntering: boolean): void {
    const spans = item.querySelectorAll('span');
    const animationConfig: any = {
      opacity: isEntering ? 1 : 0,
      duration: 0.075,
      stagger: {
        from: 'random',
        each: 0.02
      },
      ease: isEntering ? 'power2.out' : 'power2.in'
    };

    gsap.to(spans, animationConfig);
  }                                  //aggiunta delle due img fino a qui

  getDimensions() {
    const pixelWrapper = this.el.nativeElement.querySelector('.pixel_wrapper');
    pixelWrapper.innerHTML = '';
    let size = window.innerWidth < 400 ? 10 : window.innerWidth < 1000 ? 30 : 50;
    this.pixels = [];

    let pixelWidth = window.innerWidth / size;
    let height = window.innerHeight;

    for (let i = 0; i < size; i++) {
      let pixelColumn = this.renderer.createElement('div');
      this.renderer.addClass(pixelColumn, 'pixel_column');
      this.renderer.setStyle(pixelColumn, 'width', `${100 / size}vw`);
      this.renderer.appendChild(pixelWrapper, pixelColumn);

      for (let j = 0; j < height; j += pixelWidth) {
        let pixelDiv = this.renderer.createElement('div');
        this.renderer.addClass(pixelDiv, 'pixel');
        this.renderer.setStyle(pixelDiv, 'height', `${pixelWidth}px`);
        this.pixels.push(pixelDiv);
        this.renderer.appendChild(pixelColumn, pixelDiv);
      }
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    for (let i = 0; i < this.pixels.length; i++) {
      setTimeout(() => {
        let random = Math.floor(Math.random() * this.pixels.length);
        if (this.menuActive) {
          this.renderer.addClass(this.pixels[random], 'active');
        } else {
          this.renderer.removeClass(this.pixels[random], 'active');
        }
        this.pixels.splice(random, 1);
      }, i);

      if (i === this.pixels.length - 1) {
        setTimeout(() => {
          this.pixels = Array.from(this.el.nativeElement.querySelectorAll('.pixel'));
          if (this.menuActive) {
            this.renderer.setStyle(this.menu, 'pointerEvents', 'all');
            this.renderer.setStyle(this.menu, 'opacity', '1');
          }
        }, i + 10);
      }
      if (!this.menuActive) {
        this.renderer.setStyle(this.menu, 'pointerEvents', 'none');
        this.renderer.setStyle(this.menu, 'opacity', '0');
      }
    }
  }

  reset() {
    this.menuActive = false;
    this.pixels = Array.from(this.el.nativeElement.querySelectorAll('.pixel'));
    this.pixels.forEach(pixel => this.renderer.removeClass(pixel, 'active'));
    this.renderer.setStyle(this.menu, 'pointerEvents', 'none');
    this.renderer.setStyle(this.menu, 'opacity', '0');
  }
}