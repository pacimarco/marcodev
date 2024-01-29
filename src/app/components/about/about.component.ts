import { Component, OnInit } from '@angular/core';
import { gsap, Expo } from 'gsap';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.animateElements();
  }

  private animateElements(): void {
    gsap.from(".left-container", { duration: 2, width: "0", ease: Expo.easeInOut });
    gsap.from(".right-container", { duration: 2, delay: 1.5, width: "0", opacity: "0", ease: Expo.easeInOut });
    gsap.from(".center-container", { duration: 2, delay: 3, width: "0", x: -20, ease: Expo.easeInOut });
    gsap.from(".logo", { duration: 2, delay: 1.5, y: 20, opacity: 0, ease: Expo.easeInOut });
    gsap.from(".info", { duration: 2, delay: 1.5, y: 50, opacity: 0, scale: 2.5, ease: Expo.easeInOut });
    gsap.from(".story", { duration: 2, delay: 2.5, y: 20, opacity: 0, ease: Expo.easeInOut });
    gsap.from(".menu", { duration: 2, delay: 3.5, y: 20, opacity: 0, rotation: 90, ease: Expo.easeInOut });
    gsap.from(".social ul", { duration: 2, delay: 3.8, opacity: 0, y: 20, ease: Expo.easeInOut, stagger: 0.1 });
  }

}
