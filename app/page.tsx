'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ExternalLink,
  Code,
  Database,
  Wrench,
  Monitor,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Send,
  ChevronRight,
  Leaf,
  Camera,
  Clock
} from 'lucide-react';
import CanvasCursor from '@/components/CanvasCursor';
import VantaBackground from '@/components/VantaBackground';

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState(0);
  const [algorithmComplexity, setAlgorithmComplexity] = useState({
    time: 'O(n log n)',
    space: 'O(1)'
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseMovedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Seeded random function for consistent SSR/client values
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const codeSnippets = [
    { language: 'javascript', code: 'const binarySearch = (arr, target) => {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? left = mid + 1 : right = mid - 1;\n  }\n  return -1;\n}' },
    { language: 'python', code: 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)' },
    { language: 'java', code: 'public class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int x) { val = x; }\n    \n    public void inorder(TreeNode root) {\n        if (root != null) {\n            inorder(root.left);\n            System.out.println(root.val);\n            inorder(root.right);\n        }\n    }\n}' }
  ];

  const terminalCommands = [
    '$ gcc -o algorithm binary_search.c',
    '$ ./algorithm',
    'Enter array size: 10',
    'Enter sorted array: [1,3,5,7,9,11,13,15,17,19]',
    'Enter target: 7',
    'Element found at index: 3',
    'Time Complexity: O(log n)',
    'Space Complexity: O(1)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    const typeInterval = setInterval(() => {
      if (index < terminalCommands.length) {
        setTerminalOutput((prev) => [...prev, terminalCommands[index]]);
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTerminalOutput([]);
          setIsTyping(false);
        }, 3000);
      }
    }, 500);
    return () => clearInterval(typeInterval);
  }, []);

  // Mount check for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cursor Trail Effect - Fixed with viewport coordinates and optimized performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Setup canvas with fixed positioning relative to viewport
    const setupCanvas = () => {
      // Use viewport dimensions, not document dimensions
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Set canvas dimensions (1:1 with CSS pixels for simplicity and reliability)
      canvas.width = vw;
      canvas.height = vh;
      
      // Set display size
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      
      // Ensure canvas is truly fixed to viewport (redundant but safe)
      canvas.style.position = 'fixed';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.margin = '0';
      canvas.style.padding = '0';
      canvas.style.zIndex = '9999';
    };
    setupCanvas();

    // Pointer position (viewport coordinates - always relative to viewport, never document)
    const pointer = {
      x: 0.5 * window.innerWidth,
      y: 0.5 * window.innerHeight,
    };

    // Optimized parameters: fewer particles, tighter spring, faster response
    const params = {
      pointsNumber: 15, // Reduced from 40 for shorter trail
      spring: 0.65,    // Increased from 0.4 for tighter movement
      friction: 0.75   // Increased from 0.5 for faster response
    };

    // Initialize trail array
    const trail = new Array(params.pointsNumber);
    for (let i = 0; i < params.pointsNumber; i++) {
      trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
      };
    }

    // Gold gradient colors
    const goldColors = [
      { r: 249, g: 242, b: 149 }, // #F9F295 - brightest
      { r: 255, g: 230, b: 100 }, // Brighter gold
      { r: 224, g: 170, b: 62 },  // #E0AA3E
      { r: 210, g: 172, b: 71 },  // #D2AC47
      { r: 174, g: 134, b: 37 },  // #AE8625
    ];

    // Update pointer position using viewport coordinates (clientX/clientY)
    // These are ALWAYS relative to viewport, never affected by scroll
    const updatePointerPosition = (x: number, y: number) => {
      // Clamp to viewport bounds to prevent any issues
      pointer.x = Math.max(0, Math.min(x, window.innerWidth));
      pointer.y = Math.max(0, Math.min(y, window.innerHeight));
      mouseMovedRef.current = true;
    };

    // Event handlers using viewport coordinates (clientX/clientY are viewport-relative)
    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.targetTouches[0]) {
        updatePointerPosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
      }
    };

    const handleResize = () => {
      setupCanvas();
      // Reset trail positions on resize
      trail.forEach((p) => {
        p.x = pointer.x;
        p.y = pointer.y;
        p.dx = 0;
        p.dy = 0;
      });
    };

    // Handle scroll - ensure canvas stays fixed (shouldn't be needed but safety check)
    const handleScroll = () => {
      // Force canvas to stay at viewport origin
      const rect = canvas.getBoundingClientRect();
      if (rect.top !== 0 || rect.left !== 0) {
        canvas.style.top = '0px';
        canvas.style.left = '0px';
      }
    };

    // Use pointermove for better compatibility (works with mouse, touch, pen)
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    let startTime = Date.now();

    const update = () => {
      const t = Date.now() - startTime;

      // Intro motion when pointer hasn't moved
      if (!mouseMovedRef.current) {
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
        pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * window.innerHeight;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail points with optimized spring physics
      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.8 * params.spring : params.spring; // First point follows tighter
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
        
        // Clamp trail points to viewport bounds (safety check)
        p.x = Math.max(0, Math.min(p.x, window.innerWidth));
        p.y = Math.max(0, Math.min(p.y, window.innerHeight));
      });

      // Draw trail with gold gradient
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      for (let i = 0; i < trail.length - 1; i++) {
        const progress = i / (trail.length - 1);
        
        // Calculate gradient color based on position in trail
        const colorIndex = Math.floor(progress * (goldColors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, goldColors.length - 1);
        const tColor = progress * (goldColors.length - 1) - colorIndex;
        
        const color1 = goldColors[colorIndex];
        const color2 = goldColors[nextColorIndex];
        const r = Math.round(color1.r + (color2.r - color1.r) * tColor);
        const g = Math.round(color1.g + (color2.g - color1.g) * tColor);
        const b = Math.round(color1.b + (color2.b - color1.b) * tColor);
        
        // Fade out towards the end
        const alpha = 0.9 + (0.1 * (1 - progress));
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        
        // Line width decreases along trail
        const baseWidth = 2.5;
        const widthVariation = (params.pointsNumber - i) * 0.12;
        ctx.lineWidth = Math.max(baseWidth, baseWidth + widthVariation);
        
        ctx.beginPath();
        if (i === 0) {
          ctx.moveTo(trail[i].x, trail[i].y);
        }
        
        if (i < trail.length - 2) {
          const xc = 0.5 * (trail[i].x + trail[i + 1].x);
          const yc = 0.5 * (trail[i].y + trail[i + 1].y);
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        } else {
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Canvas component to be portaled to body
  const canvasElement = (
    <canvas
      ref={canvasRef}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 1,
        pointerEvents: 'none',
        zIndex: 9999,
        margin: 0,
        padding: 0
      }}
    />
  );

  return (
    <>
      {/* Portal canvas to document.body to ensure it's outside scroll containers */}
      {isMounted && typeof window !== 'undefined' && createPortal(canvasElement, document.body)}
      
      <div className="min-h-screen bg-black text-white overflow-hidden relative" onMouseMove={handleMouseMove}>
      
      {/* Animated Futuristic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Golden Glow Orbs - Warm Tones */}
        <div className="absolute w-96 h-96 rounded-full blur-3xl pulse-glow"
             style={{
               background: 'radial-gradient(circle, rgba(224, 170, 62, 0.25) 0%, rgba(224, 170, 62, 0.1) 70%, transparent 100%)',
               transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
               top: '10%',
               left: '10%'
             }} />
        <div className="absolute w-96 h-96 rounded-full blur-3xl pulse-glow"
             style={{
               background: 'radial-gradient(circle, rgba(249, 242, 149, 0.2) 0%, rgba(249, 242, 149, 0.08) 70%, transparent 100%)',
               transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
               right: '5%',
               top: '20%'
             }} />
        <div className="absolute w-96 h-96 rounded-full blur-3xl pulse-glow"
             style={{
               background: 'radial-gradient(circle, rgba(210, 172, 71, 0.2) 0%, rgba(210, 172, 71, 0.08) 70%, transparent 100%)',
               transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
               bottom: '15%',
               left: '5%'
             }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl float-slow"
             style={{
               background: 'radial-gradient(circle, rgba(174, 134, 37, 0.15) 0%, transparent 100%)',
               bottom: '10%',
               right: '10%'
             }} />

        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F295" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#E0AA3E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#AE8625" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Diagonal lines */}
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="20,80"
                style={{ animation: 'circuit-flow 10s linear infinite' }} />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="20,80"
                style={{ animation: 'circuit-flow 12s linear infinite reverse' }} />
          {/* Grid lines */}
          <g stroke="url(#goldGradient)" strokeWidth="1">
            {[...Array(6)].map((_, i) => (
              <line key={`v-${i}`} x1={`${(i + 1) * 16.66}%`} y1="0" x2={`${(i + 1) * 16.66}%`} y2="100%" opacity="0.4" />
            ))}
            {[...Array(6)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={`${(i + 1) * 16.66}%`} x2="100%" y2={`${(i + 1) * 16.66}%`} opacity="0.4" />
            ))}
          </g>
        </svg>

        {/* Tech Particles */}
        {[...Array(15)].map((_, i) => {
          // Use seeded random for consistent SSR/client values
          const leftSeed = seededRandom(i * 7.3 + 1);
          const topSeed = seededRandom(i * 11.7 + 2);
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              animate={{
                y: [0, -400, 0],
                x: [0, Math.cos(i) * 200, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
              style={{
                left: `${Math.round(leftSeed * 100 * 100) / 100}%`,
                top: `${Math.round(topSeed * 100 * 100) / 100}%`,
                background: i % 3 === 0 ? '#F9F295' : i % 3 === 1 ? '#E0AA3E' : '#D2AC47',
                filter: `drop-shadow(0 0 12px ${i % 3 === 0 ? 'rgba(249, 242, 149, 0.8)' : i % 3 === 1 ? 'rgba(224, 170, 62, 0.8)' : 'rgba(210, 172, 71, 0.8)'})`,
              }}
            />
          );
        })}

        {/* Floating tech nodes */}
        {[...Array(8)].map((_, i) => {
          const colors = ['#F9F295', '#E0AA3E', '#D2AC47', '#AE8625'];
          const selectedColor = colors[i % 4];
          const shadowColor = i % 4 === 0 ? 'rgba(249, 242, 149, 0.8)' : i % 4 === 1 ? 'rgba(224, 170, 62, 0.8)' : i % 4 === 2 ? 'rgba(210, 172, 71, 0.7)' : 'rgba(174, 134, 37, 0.6)';

          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-2 h-2 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              style={{
                left: `${(i * 12.5)}%`,
                top: `${(i * 12.5)}%`,
                backgroundColor: selectedColor,
                borderColor: selectedColor,
                border: `2px solid ${selectedColor}`,
                boxShadow: `0 0 20px ${shadowColor}`,
              }}
            />
          );
        })}
      </div>

      {/* Vanta Background */}
      <VantaBackground />
      
      {/* Canvas Cursor Effect */}
      <CanvasCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold cursor-pointer font-futuristic"
              style={{ color: '#E0AA3E' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('hero')}
            >
              BR
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['about', 'education', 'skills', 'projects', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`capitalize transition-all font-sans ${
                    activeSection === section
                      ? 'font-semibold'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    color: activeSection === section ? '#E0AA3E' : '#F9F295',
                  }}
                  whileHover={{ y: -2 }}
                >
                  {section}
                </motion.a>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <motion.div 
            className={`md:hidden overflow-hidden ${
              isMenuOpen ? 'max-h-64' : 'max-h-0'
            }`}
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
          >
            <div className="py-4 space-y-2">
              {['about', 'education', 'skills','projects', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`block capitalize py-2 transition-all font-sans ${
                    activeSection === section
                      ? 'font-semibold'
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    color: activeSection === section ? '#E0AA3E' : '#F9F295',
                  }}
                  whileHover={{ x: 10 }}
                >
                  {section}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        {/* Floating Tech Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/25 rounded-full blur-2xl pulse-glow border border-yellow-600/30"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-yellow-600/20 rounded-full blur-2xl pulse-glow border border-yellow-500/20"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24 bg-yellow-700/20 rounded-full blur-2xl pulse-glow border border-yellow-600/20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl float-slower"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="text-center z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glitch Effect Name */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 relative font-futuristic"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span style={{ color: '#F9F295' }}>
              Bharath Raj M
            </span>
            <motion.div
              className="absolute inset-0 blur-sm opacity-50"
              style={{ color: '#E0AA3E' }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Bharath Raj M
            </motion.div>
          </motion.h1>
          
          {/* Typing Effect Subtitle */}
          <motion.div 
            className="text-xl md:text-2xl text-gray-300 mb-8 h-8 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CSE Student | Android Developer | DSA Enthusiast
            </motion.span>
            
          </motion.div>
          
          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 rounded-full font-semibold transition-all overflow-hidden text-black font-sans"
              style={{ backgroundColor: '#E0AA3E' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Projects <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-yellow-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="/Bharath_Raj_M_Resume_2026.pdf"
              download="Bharath_Raj_M_Resume_2026.pdf"
              className="group relative px-8 py-4 border-2 rounded-full font-semibold transition-all overflow-hidden hover:text-black font-sans"
              style={{ borderColor: '#E0AA3E', color: '#F9F295' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Download Resume <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0"
              style={{ backgroundColor: '#E0AA3E' }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
          
                  </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 bg-yellow-500/15 rounded-full blur-2xl pulse-glow border border-yellow-600/20"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-40 h-40 bg-yellow-400/8 rounded-full blur-3xl float-slow"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
            <defs>
              <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9F295" />
                <stop offset="50%" stopColor="#E0AA3E" />
                <stop offset="100%" stopColor="#AE8625" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGradient2)" strokeWidth="2" opacity="0.4" />
            <circle cx="100" cy="100" r="120" fill="none" stroke="url(#goldGradient2)" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative font-sans">
              <span style={{ color: '#E0AA3E' }}>
                About Me
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-yellow-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
            
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-yellow-600/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="text-black" size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600">Passionate Developer</h3>
                    <p className="text-gray-400">Crafting Digital Experiences</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <motion.p 
                    className="text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Pre-final-year Computer Science Engineering student with a strong foundation in Data Structures and Algorithms. 
                    Passionate about Android development using Kotlin and modern web technologies.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    I love building real-world solutions and continuously improving my technical skills through hands-on projects and problem-solving challenges.
                  </motion.p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { label: 'Projects', value: '10+', color: 'from-yellow-600 to-yellow-400' },
                    { label: 'Skills', value: '15+', color: 'from-yellow-600 to-yellow-400' },
                    { label: 'Experience', value: '1+', color: 'from-yellow-600 to-yellow-400' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-yellow-600/50 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-sans`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 font-sans" style={{ color: '#E0AA3E' }}>
              Education
            </h2>
            <div className="space-y-6">
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-yellow-600 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-yellow-600">B.E Computer Science Engineering</h3>
                    <p className="text-gray-300">Panimalar Engineering College</p>
                    <p className="text-gray-400 text-sm">2023 - 2027</p>
                    <p className="text-yellow-600 font-semibold">CGPA: 8.7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-yellow-600 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-yellow-600">Class XII (CBSE)</h3>
                    <p className="text-gray-300">KRM Public School</p>
                    <p className="text-gray-400 text-sm">Completed: 2023</p>
                    <p className="text-yellow-600 font-semibold">Percentage: 81%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-yellow-600 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-yellow-600">Class X (CBSE)</h3>
                    <p className="text-gray-300">KRM Public School</p>
                    <p className="text-gray-400 text-sm">Completed: 2021</p>
                    <p className="text-yellow-600 font-semibold">Percentage: 60.6%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/8 rounded-full blur-3xl pulse-glow border border-yellow-600/10"
            animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-400/6 rounded-full blur-2xl float-slower"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="hexGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0,40 L20,0 L60,0 L80,40 L60,80 L20,80 Z" fill="none" stroke="#fbbf24" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexGrid)" />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative font-sans">
              <span style={{ color: '#E0AA3E' }}>
                Technical Skills
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-yellow-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '120px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Code,
                  title: 'Programming',
                  skills: ['Java', 'Python', 'C', 'Kotlin'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                },
                {
                  icon: Monitor,
                  title: 'Web Development',
                  skills: ['HTML', 'CSS', 'MERN Stack'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                },
                {
                  icon: Database,
                  title: 'Databases',
                  skills: ['MySQL', 'MongoDB'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                },
                {
                  icon: Wrench,
                  title: 'Tools',
                  skills: ['Git', 'VS Code', 'Android Studio', 'MS Excel'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                },
                {
                  icon: Monitor,
                  title: 'Operating System',
                  skills: ['Windows'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                },
                {
                  icon: Award,
                  title: 'Soft Skills',
                  skills: ['Problem Solving', 'Team Work', 'Communication'],
                  color: 'yellow',
                  gradient: 'from-black to-yellow-600'
                }
              ].map((category, index) => (
                <motion.div 
                  key={category.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, rotateX: 5 }}
                  style={{ perspective: '1000px' }}
                >
                  {/* Card Glow */}
                  <motion.div
                className="absolute -inset-1 bg-yellow-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"
              />

                  <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-yellow-600/50 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <category.icon className="text-black" size={24} />
                      </motion.div>
                      <motion.div
                        className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="text-yellow-600" size={16} />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-yellow-600">
                      {category.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skill}
                          className={`px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm border border-yellow-600/30`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-900/30 relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-56 h-56 bg-yellow-500/10 rounded-full blur-3xl pulse-glow"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-400/8 rounded-full blur-2xl float-slower"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative font-sans">
              <span style={{ color: '#E0AA3E' }}>
                Technical Projects
              </span>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-yellow-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '120px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-yellow-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-500 transition-colors">AccuCert</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Kotlin', 'Android', 'XML', 'SQLite'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-yellow-600 transition-colors" size={20} />
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Android application built using Kotlin that simplifies the process of generating multiple certificates 
                  with ease and efficiency. Features include template management, batch processing, and PDF export.
                </p>
                
                {/* Technical Specifications */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Architecture:</span>
                      <span className="text-yellow-300 ml-2">Android Native</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Database:</span>
                      <span className="text-yellow-300 ml-2">SQLite</span>
                    </div>
                    <div>
                      <span className="text-gray-400">API Level:</span>
                      <span className="text-yellow-300 ml-2">24+</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-yellow-400 ml-2">Optimized</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/bharathrajm-2005/accucert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 rounded-lg border border-yellow-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Database size={16} className="text-yellow-600" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-yellow-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-500 transition-colors">Urban Waste Management</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['IoT', 'Sensors', 'Web Dashboard', 'Node.js'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-yellow-600 transition-colors" size={20} />
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  IoT-based system designed to improve waste collection efficiency in urban areas through 
                  smart monitoring and optimized routing. Real-time data analytics and predictive algorithms.
                </p>
                
                {/* Technical Specifications */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Backend:</span>
                      <span className="text-yellow-300 ml-2">Python</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Database:</span>
                      <span className="text-yellow-300 ml-2">MongoDB</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sensors:</span>
                      <span className="text-yellow-300 ml-2">Ultrasonic</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Algorithm:</span>
                      <span className="text-yellow-400 ml-2">K-means</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/bharathrajm-2005/urban_waste_management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 rounded-lg border border-yellow-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Monitor size={16} className="text-yellow-600" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-yellow-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-500 transition-colors">Smart Crop Advisory</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Python', 'Machine Learning', 'Flask', 'OpenCV'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-yellow-600 transition-colors" size={20} />
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  AI-powered agricultural advisory system that provides intelligent recommendations based on 
                  environmental and soil parameters. The system processes real-time inputs and applies learning models.
                </p>
                
                {/* Technical Specifications */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Architecture:</span>
                      <span className="text-yellow-300 ml-2">ML + Web App</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Backend:</span>
                      <span className="text-yellow-300 ml-2">Python (Flask)</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Core Feature:</span>
                      <span className="text-yellow-300 ml-2">Crop Prediction</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-yellow-400 ml-2">Data-Driven</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/bharathrajm-2005/smart_crop_advisory_2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 rounded-lg border border-yellow-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Leaf size={16} className="text-yellow-600" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-yellow-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-600 mb-2 group-hover:text-yellow-500 transition-colors">Infosys Webcam Project</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Python', 'OpenCV', 'Flask', 'Computer Vision'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-yellow-600 transition-colors" size={20} />
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Webcam-based computer vision application that captures and processes live video streams using Python. 
                  Designed to demonstrate real-time frame handling and vision-based processing capabilities.
                </p>
                
                {/* Technical Specifications */}
                <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Architecture:</span>
                      <span className="text-yellow-300 ml-2">Python App</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Core Library:</span>
                      <span className="text-yellow-300 ml-2">OpenCV</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Interface:</span>
                      <span className="text-yellow-300 ml-2">Flask Templates</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Processing:</span>
                      <span className="text-yellow-400 ml-2">Real-Time</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/bharathrajm-2005/infosys_python_project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 rounded-lg border border-yellow-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={16} className="text-yellow-600" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="py-20 px-4 relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 bg-yellow-500/12 rounded-full blur-2xl pulse-glow"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl float-slow"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 font-sans" style={{ color: '#E0AA3E' }}>
              Internship Experience
            </h2>
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-yellow-600/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <Briefcase className="text-yellow-600 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-yellow-600 mb-2">Web Developer Intern</h3>
                  <p className="text-xl text-gray-300 mb-2">Codebind Technologies</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Assisted in the development of web applications using modern technologies
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Contributed to portfolio website hosting and deployment processes
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Gained hands-on experience in real-world web development workflows
                    </li>
                  </ul>
                  <div className="mt-6">
                    <a
                      href="https://codebindtechnologies.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 rounded-lg border border-yellow-600/50 transition-all"
                    >
                      <ExternalLink size={16} />
                      Visit Company
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-yellow-600/50 transition-all mt-8"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <Award className="text-yellow-600 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-yellow-600 mb-2">AI & Cloud Intern</h3>
                  <p className="text-xl text-gray-300 mb-2">Edunet Foundation (In Collaboration with AICTE & IBM SkillsBuild)</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Completed a 4-week internship on Artificial Intelligence & Emerging Cloud Technologies
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Gained hands-on exposure to AI fundamentals and cloud concepts
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Worked with IBM SkillsBuild learning platform
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                      Understood real-world AI implementation workflows
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} className="text-yellow-600" />
                      <span className="text-sm">15th July 2025 – 7th August 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={16} className="text-yellow-600" />
                      <span className="text-sm">4 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-gray-900/30 relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-48 h-48 bg-yellow-500/12 rounded-full blur-3xl pulse-glow"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl float-slow"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 font-sans" style={{ color: '#E0AA3E' }}>
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Introduction to Machine Learning</h3>
                    <p className="text-gray-300">NPTEL</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Emerging Technologies</h3>
                    <p className="text-gray-300">AICTE (AI & Cloud)</p>
                    <p className="text-gray-400 text-sm">2024</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">UiPath Automation Developer Associate Training</h3>
                    <p className="text-gray-300">UiPath</p>
                    <p className="text-gray-400 text-sm">2026</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Prompt Engineering</h3>
                    <p className="text-gray-300">Sololearn</p>
                    <p className="text-gray-400 text-sm">2026</p>
                  </div>
                </div>
              </motion.div>

            

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Journey to Cloud: Envisioning Your Solution</h3>
                    <p className="text-gray-300">IBM SkillsBuild</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Getting Started with Artificial Intelligence</h3>
                    <p className="text-gray-300">IBM SkillsBuild</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Python Foundation Certification</h3>
                    <p className="text-gray-300">Infosys Springboard</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-yellow-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-600">Master in Software Engineering</h3>
                    <p className="text-gray-300">Apollo Computer Education Ltd</p>
                    <p className="text-gray-400 text-sm">2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section id="profiles" className="py-20 px-4 relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pulse-glow"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-400/8 rounded-full blur-2xl float-slower"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 font-sans" style={{ color: '#E0AA3E' }}>
              Coding Profiles
            </h2>
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://github.com/bharathrajm-2005"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={48} className="text-gray-300" />
                <span className="text-gray-300 font-semibold">GitHub</span>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/bharath-raj-m-4a93b9313"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-yellow-600/50 transition-all flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={48} className="text-yellow-600" />
                <span className="text-gray-300 font-semibold">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://leetcode.com/u/bharath_1005/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-orange-600/50 transition-all flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                <Code size={48} className="text-orange-400" />
                <span className="text-gray-300 font-semibold">LeetCode</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900/30 relative">
        {/* Futuristic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-40 w-56 h-56 bg-yellow-500/12 rounded-full blur-3xl pulse-glow"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-40 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl float-slow"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
            <defs>
              <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <circle key={`contact-${i}`} cx={`${15 + i * 14}%`} cy={`${20 + i * 12}%`} r="50" fill="none" stroke="url(#contactGradient)" strokeWidth="1" opacity="0.3" />
            ))}
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 font-sans" style={{ color: '#E0AA3E' }}>
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-yellow-600">Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities and exciting projects.
                  Feel free to reach out if you'd like to collaborate or just have a chat!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-yellow-600" size={20} />
                    <span className="text-gray-300">{process.env.CONTACT_EMAIL || 'mbharathrajcw.wp@gmail.com'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-yellow-600" size={20} />
                    <span className="text-gray-300">+91 9043129158</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-yellow-600" size={20} />
                    <span className="text-gray-300">Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none transition-colors"
                    placeholder="Your Name"
                    onFocus={(e) => e.target.style.borderColor = '#E0AA3E'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                    onFocus={(e) => e.target.style.borderColor = '#E0AA3E'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none transition-colors resize-none"
                    onFocus={(e) => e.target.style.borderColor = '#E0AA3E'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                    placeholder="Your message here..."
                  />
                </div>

                <div className="space-y-4">
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg text-center ${
                        submitStatus === 'success' 
                          ? 'bg-green-900/50 border border-green-600/50 text-green-300' 
                          : 'bg-red-900/50 border border-red-600/50 text-red-300'
                      }`}
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{ backgroundColor: '#E0AA3E' }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#F9F295')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#E0AA3E')}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                  </button>
                </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2024 Bharath Raj M. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/bharathrajm-2005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors"
                style={{ '--hover-color': '#E0AA3E' } as any}
                onMouseEnter={(e) => e.currentTarget.style.color = '#E0AA3E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/bharath-raj-m-4a93b9313"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#E0AA3E'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
