'use client';

import { useEffect } from 'react';

const useCanvasCursor = () => {
  interface OscillatorConfig {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  }

  class Oscillator {
    phase: number;
    offset: number;
    frequency: number;
    amplitude: number;
    result: number;

    constructor(config: OscillatorConfig = {}) {
      this.phase = config.phase || 0;
      this.offset = config.offset || 0;
      this.frequency = config.frequency || 0.001;
      this.amplitude = config.amplitude || 1;
      this.result = 0;
    }

    update(): number {
      this.phase += this.frequency;
      this.result = this.offset + Math.sin(this.phase) * this.amplitude;
      return this.result;
    }

    value(): number {
      return this.result;
    }
  }

  interface LineConfig {
    spring?: number;
  }

  interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
  }

  interface TrailConfig {
    debug?: boolean;
    friction: number;
    trails: number;
    size: number;
    dampening: number;
    tension: number;
  }

  class Line {
    spring: number;
    friction: number;
    nodes: Node[];

    constructor(config: LineConfig = {}) {
      this.spring = (config.spring || 0.4) + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let n = 0; n < E.size; n++) {
        const node: Node = { x: 0, y: 0, vx: 0, vy: 0 };
        node.x = pos.x;
        node.y = pos.y;
        this.nodes.push(node);
      }
    }

    update(): void {
      let springFactor = this.spring;
      const firstNode = this.nodes[0];
      firstNode.vx += (pos.x - firstNode.x) * springFactor;
      firstNode.vy += (pos.y - firstNode.y) * springFactor;
      
      for (let i = 0; i < this.nodes.length; i++) {
        const currentNode = this.nodes[i];
        if (i > 0) {
          const previousNode = this.nodes[i - 1];
          currentNode.vx += (previousNode.x - currentNode.x) * springFactor;
          currentNode.vy += (previousNode.y - currentNode.y) * springFactor;
          currentNode.vx += previousNode.vx * E.dampening;
          currentNode.vy += previousNode.vy * E.dampening;
        }
        currentNode.vx *= this.friction;
        currentNode.vy *= this.friction;
        currentNode.x += currentNode.vx;
        currentNode.y += currentNode.vy;
        springFactor *= E.tension;
      }
    }

    draw(): void {
      if (!ctx) return;
      const firstNode = this.nodes[0];
      ctx!.beginPath();
      ctx!.moveTo(firstNode.x, firstNode.y);
      
      for (let i = 1; i < this.nodes.length - 2; i++) {
        const currentNode = this.nodes[i];
        const nextNode = this.nodes[i + 1];
        const midX = 0.5 * (currentNode.x + nextNode.x);
        const midY = 0.5 * (currentNode.y + nextNode.y);
        ctx!.quadraticCurveTo(currentNode.x, currentNode.y, midX, midY);
      }
      
      const secondLastNode = this.nodes[this.nodes.length - 2];
      const lastNode = this.nodes[this.nodes.length - 1];
      ctx!.quadraticCurveTo(secondLastNode.x, secondLastNode.y, lastNode.x, lastNode.y);
      ctx!.stroke();
      ctx!.closePath();
    }
  }

  function onMousemove(e: MouseEvent | TouchEvent) {
    function createLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++)
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
    }
    function updatePosition(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      e.preventDefault();
    }
    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('touchstart', onMousemove);
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('touchmove', updatePosition);
    document.addEventListener('touchstart', handleTouchStart);
    updatePosition(e);
    createLines();
    render();
  }

  function render() {
    if (ctx && ctx.running && canvas) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      
      // Gold color gradient effect
      const goldHue = 45 + Math.sin(f.update() * 0.5) * 15; // Gold hue range (30-60)
      ctx.strokeStyle = `hsla(${goldHue}, 70%, 50%, 0.3)`;
      ctx.lineWidth = 2;
      
      for (let i = 0; i < E.trails; i++) {
        const line = lines[i];
        line.update();
        line.draw();
      }
      if (ctx.frame !== undefined) ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  let ctx: CanvasRenderingContext2D & { running?: boolean; frame?: number } | null = null;
  let canvas: HTMLCanvasElement | null = null;
  let f: Oscillator;
  let e = 0;
  let pos: { x: number; y: number } = { x: 0, y: 0 };
  let lines: Line[] = [];
  const E: TrailConfig = {
    debug: true,
    friction: 0.5,
    trails: 15,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  const renderCanvas = function () {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { running?: boolean; frame?: number };
    if (!ctx) return;
    
    ctx.running = true;
    ctx.frame = 1;
    
    f = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', () => {
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener('blur', () => {
      if (ctx) ctx.running = false;
    });
    resizeCanvas();
  };

  useEffect(() => {
    renderCanvas();

    return () => {
      if (ctx) ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', () => {
        if (ctx && !ctx.running) {
          ctx.running = true;
          render();
        }
      });
      window.removeEventListener('blur', () => {
        if (ctx) ctx.running = false;
      });
    };
  }, []);
};

export default useCanvasCursor;
