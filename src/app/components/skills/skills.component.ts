import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements AfterViewInit {

  positions = [
    { top: "0%", left: "0%" },
    { top: "0%", left: "10%" },
    { top: "0%", left: "60%" },
    { top: "16%", left: "15%" },
    { top: "16%", left: "40%" },
    { top: "16%", left: "90%" },
    { top: "32%", left: "50%" },
    { top: "32%", left: "75%" },
    { top: "48%", left: "0%" },
    { top: "64%", left: "30%" },
    { top: "64%", left: "50%" },
    { top: "64%", left: "90%" },
    { top: "80%", left: "20%" },
    { top: "80%", left: "70%" }
    // ... altre posizioni ...
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  initializeAnimations(): void {
    const imgs = this.el.nativeElement.querySelectorAll('.img');

    const imgArray = Array.from(imgs);

    gsap.set(imgs, {
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)"
    });

    gsap.from(this.el.nativeElement.querySelectorAll('p'), {
      y: 40,
      ease: "power4.inOut",
      duration: 1,
      stagger: {
        amount: 0.15
      },
      delay: 0.5
    });

    gsap.to(imgs, {
      scale: 1,
      width: "300px",
      height: "400px",
      stagger: 0.15,
      duration: 0.75,
      ease: "power2.out",
      delay: 1,
      onComplete: () => this.scatterAndShrink(imgs)
    });

    gsap.to(this.el.nativeElement.querySelectorAll('p'), {
      top: "40px",
      ease: "power4.inOut",
      duration: 1,
      stagger: {
        amount: 0.15
      },
      delay: 3,
      onComplete: () => {
        this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.querySelector(".header"));
      }
    });

    gsap.from(this.el.nativeElement.querySelectorAll('a'), {
      y: 20,
      opacity: 0,
      ease: "power2.out",
      duration: 1,
      stagger: {
        amount: 0.15
      },
      delay: 4
    });

    imgArray.forEach((img, i) => {
      this.renderer.setAttribute(img, 'data-original-position', JSON.stringify(this.positions[i]));
      this.renderer.setAttribute(img, 'data-enlarged', 'false');
      this.renderer.listen(img, 'click', (event) => this.toggleImageSize(event, img));
    });
  }

  scatterAndShrink(imgs: NodeList): void {
    gsap.to(imgs, {
      top: (i) => this.positions[i].top,
      left: (i) => this.positions[i].left,
      transform: "none",
      width: "100px",
      height: "100px",
      stagger: 0.075,
      duration: 0.75,
      ease: "power2.out"
    });
  }

  toggleImageSize(event: any, img: any): void {
    const isEnlarged = img.getAttribute('data-enlarged') === 'true';
    const originalPosition = JSON.parse(img.getAttribute('data-original-position'));
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (!isEnlarged) {
      // ... Logica per ingrandire l'immagine ...
      img.setAttribute('data-enlarged', 'true');
      this.applyBlurEffect();
    } else {
      // ... Logica per rimpicciolire l'immagine ...
      img.setAttribute('data-enlarged', 'false');
      setTimeout(() => this.removeBlurEffect(), 100);
    }
  }

  applyBlurEffect(): void {
    const elementsToBlur = this.el.nativeElement.querySelectorAll('.nav, .footer, .header, .text, .img:not([data-enlarged="true"])');
    gsap.to(elementsToBlur, {
      filter: 'blur(20px)',
      duration: 0.75,
      ease: 'power2.out'
    });
  }

  removeBlurEffect(): void {
    const elementsToBlur = this.el.nativeElement.querySelectorAll('.nav, .footer, .header, .text, .img:not([data-enlarged="true"])');
    gsap.to(elementsToBlur, {
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    });
  }

}
