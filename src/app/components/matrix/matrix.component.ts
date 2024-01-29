import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})

export class MatrixComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef;
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private W!: number;
  private H!: number;
  private fontSize = 16;
  private columns!: number;
  private drops: number[] = [];
  private str = "Marco Paci Developer 7628";

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d')!;
    this.W = window.innerWidth;
    this.H = window.innerHeight;

    this.canvas.width = this.W;
    this.canvas.height = this.H;

    this.columns = Math.floor(this.W / this.fontSize);

    for (let i = 0; i < this.columns; i++) {
      this.drops.push(0);
    }

    this.draw();
    setInterval(() => this.draw(), 35);
  }

  private draw(): void {
    this.context.fillStyle = "rgba(0,0,0,0.05)";
    this.context.fillRect(0, 0, this.W, this.H);
    this.context.font = "700 " + this.fontSize + "px monospace";
    this.context.fillStyle = /*"#00cc33"*/ "#30ff19";

    for (let i = 0; i < this.columns; i++) {
      const index = Math.floor(Math.random() * this.str.length);
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.context.fillText(this.str[index], x, y);

      if (y >= this.canvas.height && Math.random() > 0.99) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }
}
