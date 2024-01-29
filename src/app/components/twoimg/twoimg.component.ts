import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-twoimg',
  templateUrl: './twoimg.component.html',
  styleUrls: ['./twoimg.component.css']
})
export class TwoimgComponent implements AfterViewInit {

  @ViewChild('navWrapper')
  navWrapper!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    const links = this.navWrapper.nativeElement.querySelectorAll('.hover-this');
    const cursor = this.navWrapper.nativeElement.querySelector('.cursor');

    const animateit = (event: MouseEvent) => {
      const span = (event.target as HTMLElement).querySelector('span');
      const { offsetX: x, offsetY: y } = event,
      { offsetWidth: width, offsetHeight: height } = event.target as HTMLElement,

      move = 25,
      xMove = x / width * (move * 2) - move,
      yMove = y / height * (move * 2) - move;

      this.renderer.setStyle(span, 'transform', `translate(${xMove}px, ${yMove}px)`);

      if (event.type === 'mouseleave') {
        this.renderer.setStyle(span, 'transform', '');
      }
    };

    const editCursor = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      this.renderer.setStyle(cursor, 'left', `${x}px`);
      this.renderer.setStyle(cursor, 'top', `${y}px`);
    };

    links.forEach((link: any) => {
      this.renderer.listen(link, 'mousemove', animateit);
      this.renderer.listen(link, 'mouseleave', animateit);
    });
    this.renderer.listen(window, 'mousemove', editCursor);
  }
}