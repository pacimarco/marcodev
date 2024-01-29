import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements AfterViewInit {

  constructor(private el: ElementRef) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.animateImages();
    this.animateText();
  }

  private animateImages(): void {
    const rows = this.el.nativeElement.querySelectorAll('.row');
    rows.forEach((row: Element) => {
      const img = row.querySelector('img') as Element | null;
      if (img && this.checkIfInViewport(row)) {
        this.animateImage(img);
      }
    });

    gsap.utils.toArray<Element>('.img-container.right img').forEach(img => {
      this.animateImage(img, true);
    });

    gsap.utils.toArray<Element>('.img-container.left img').forEach(img => {
      this.animateImage(img, true);
    });
  }

  private animateImage(img: Element, withScrollTrigger: boolean = false): void {
    let animationConfig: any = {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    };

    if (withScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: img,
        start: 'top 75%',
        end: 'bottom 70%',
        scrub: true
      };
    }

    gsap.to(img, animationConfig);
  }

  private animateText(): void {
    gsap.utils.toArray<Element>('.img-container p').forEach(text => {
      gsap.from(text, {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: text,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  private checkIfInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
