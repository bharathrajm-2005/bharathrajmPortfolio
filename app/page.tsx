'use client';

import { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:mbharathrajcw@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative" onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }} />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`, right: 0 }} />
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`, bottom: 0, left: '50%' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('hero')}
            >
              BR
            </motion.div>
            
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
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['about', 'education', 'skills', 'cse-showcase', 'projects', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`capitalize transition-all ${
                    activeSection === section 
                      ? 'text-blue-400 font-semibold' 
                      : 'hover:text-blue-400'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {section}
                </motion.a>
              ))}
            </div>
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
              {['about', 'education', 'skills', 'cse-showcase', 'projects', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`block capitalize py-2 transition-all ${
                    activeSection === section 
                      ? 'text-blue-400 font-semibold' 
                      : 'hover:text-blue-400'
                  }`}
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
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="text-center z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glitch Effect Name */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Bharath Raj M
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Bharath Raj M
            </motion.div>
          </motion.h1>
          
          {/* Typing Effect Subtitle */}
          <motion.div 
            className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
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
            <motion.span 
              className="inline-block w-1 h-6 bg-blue-400 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
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
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold transition-all overflow-hidden"
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
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a 
              href="/Bharath_Raj_M_Resume_2026.pdf"
              download="Bharath_Raj_M_Resume_2026.pdf"
              className="group relative px-8 py-4 border border-blue-600 rounded-full font-semibold transition-all overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Download Resume <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-blue-600/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
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
            <h2 className="text-4xl font-bold text-center mb-12 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
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
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-blue-600/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="text-white" size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">Passionate Developer</h3>
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
                    { label: 'Projects', value: '10+', color: 'from-blue-400 to-blue-600' },
                    { label: 'Skills', value: '15+', color: 'from-purple-400 to-purple-600' },
                    { label: 'Experience', value: '1+', color: 'from-pink-400 to-pink-600' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-600/50 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
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
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="space-y-6">
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-blue-400 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-400">B.E Computer Science Engineering</h3>
                    <p className="text-gray-300">Panimalar Engineering College</p>
                    <p className="text-gray-400 text-sm">2023 - 2027</p>
                    <p className="text-green-400 font-semibold">CGPA: 8.7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-purple-400 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-purple-400">Class XII (CBSE)</h3>
                    <p className="text-gray-300">KRM Public School</p>
                    <p className="text-gray-400 text-sm">Completed: 2023</p>
                    <p className="text-green-400 font-semibold">Percentage: 81%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="text-green-400 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-400">Class X (CBSE)</h3>
                    <p className="text-gray-300">KRM Public School</p>
                    <p className="text-gray-400 text-sm">Completed: 2021</p>
                    <p className="text-green-400 font-semibold">Percentage: 67%</p>
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
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
                  color: 'blue',
                  gradient: 'from-blue-400 to-blue-600'
                },
                {
                  icon: Monitor,
                  title: 'Web Development',
                  skills: ['HTML', 'CSS', 'MERN Stack'],
                  color: 'purple',
                  gradient: 'from-purple-400 to-purple-600'
                },
                {
                  icon: Database,
                  title: 'Databases',
                  skills: ['MySQL', 'MongoDB'],
                  color: 'green',
                  gradient: 'from-green-400 to-green-600'
                },
                {
                  icon: Wrench,
                  title: 'Tools',
                  skills: ['Git', 'VS Code', 'Android Studio', 'MS Excel'],
                  color: 'yellow',
                  gradient: 'from-yellow-400 to-yellow-600'
                },
                {
                  icon: Monitor,
                  title: 'Operating System',
                  skills: ['Windows'],
                  color: 'red',
                  gradient: 'from-red-400 to-red-600'
                },
                {
                  icon: Award,
                  title: 'Soft Skills',
                  skills: ['Problem Solving', 'Team Work', 'Communication'],
                  color: 'pink',
                  gradient: 'from-pink-400 to-pink-600'
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
                    className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500`}
                  />
                  
                  <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-${category.color}-600/50 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <category.icon className="text-white" size={24} />
                      </motion.div>
                      <motion.div 
                        className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className={`text-${category.color}-400`} size={16} />
                      </motion.div>
                    </div>
                    
                    <h3 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      {category.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skill}
                          className={`px-3 py-1 bg-${category.color}-600/20 text-${category.color}-300 rounded-full text-sm border border-${category.color}-600/30`}
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

      {/* CSE Showcase Section */}
      <section id="cse-showcase" className="py-20 px-4 relative">
        {/* Binary Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                CSE Technical Showcase
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '150px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Interactive Terminal */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden">
                  {/* Terminal Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-4 text-sm text-gray-400 font-mono">terminal@bharathraj:~</span>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">$ git status</div>
                    <div className="text-gray-400 mb-2">On branch main</div>
                    <div className="text-gray-400 mb-4">Changes to be committed:</div>
                    
                    {terminalOutput.map((line, index) => (
                      <motion.div 
                        key={index}
                        className={`${line?.startsWith('$') ? 'text-blue-400' : 'text-gray-300'} mb-1`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {line}
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.span 
                        className="inline-block w-2 h-4 bg-green-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Code Editor */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden">
                  {/* Editor Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="ml-4 text-sm text-gray-400 font-mono">algorithm.{codeSnippets[codeSnippet].language}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">{codeSnippets[codeSnippet].language}</span>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">{algorithmComplexity.time}</span>
                    </div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-4 font-mono text-sm overflow-x-auto">
                    <motion.pre 
                      className="text-gray-300"
                      key={codeSnippet}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <code>{codeSnippets[codeSnippet].code}</code>
                    </motion.pre>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Algorithm Complexity Visualizer */}
            <motion.div 
              className="mt-8 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Algorithm Complexity Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'Time Complexity', value: algorithmComplexity.time, color: 'from-blue-400 to-blue-600', description: 'Execution time growth' },
                  { type: 'Space Complexity', value: algorithmComplexity.space, color: 'from-purple-400 to-purple-600', description: 'Memory usage growth' },
                  { type: 'Data Structures', value: 'Arrays, Trees, Graphs', color: 'from-green-400 to-green-600', description: 'Core structures mastered' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.type}
                    className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-sm text-gray-400 mb-2">{item.type}</div>
                    <div className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Projects
              </span>
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '120px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-blue-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">AccuCert</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['Kotlin', 'Android', 'XML', 'SQLite'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-blue-400 transition-colors" size={20} />
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
                      <span className="text-gray-300 ml-2">MVVM</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Database:</span>
                      <span className="text-gray-300 ml-2">SQLite</span>
                    </div>
                    <div>
                      <span className="text-gray-400">API Level:</span>
                      <span className="text-gray-300 ml-2">24+</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Performance:</span>
                      <span className="text-green-400 ml-2">Optimized</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/bharathrajm-2005/accucert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg border border-blue-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button 
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Database size={16} className="text-gray-400" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 hover:border-purple-600/50 transition-all duration-300 group"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Project Header with Tech Stack Pills */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">Urban Waste Management</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {['IoT', 'Sensors', 'Web Dashboard', 'Node.js'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </motion.div>
                    <ExternalLink className="text-gray-400 group-hover:text-purple-400 transition-colors" size={20} />
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
                      <span className="text-gray-300 ml-2">Node.js</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Database:</span>
                      <span className="text-gray-300 ml-2">MongoDB</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sensors:</span>
                      <span className="text-gray-300 ml-2">Ultrasonic</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Algorithm:</span>
                      <span className="text-green-400 ml-2">Dijkstra's</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/bharathrajm-2005/urban_waste_management"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 rounded-lg border border-purple-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Github size={16} /> View Code
                  </a>
                  <motion.button 
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Monitor size={16} className="text-gray-400" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Internship Experience
            </h2>
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-blue-600/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <Briefcase className="text-blue-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-2">Web Developer Intern</h3>
                  <p className="text-xl text-gray-300 mb-2">Codebind Technologies</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      Assisted in the development of web applications using modern technologies
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      Contributed to portfolio website hosting and deployment processes
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                      Gained hands-on experience in real-world web development workflows
                    </li>
                  </ul>
                  <div className="mt-6">
                    <a 
                      href="https://codebindtechnologies.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg border border-blue-600/50 transition-all"
                    >
                      <ExternalLink size={16} />
                      Visit Company
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-blue-400 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">Introduction to Machine Learning</h3>
                    <p className="text-gray-300">NPTEL</p>
                    <p className="text-gray-400 text-sm">2025</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-600/50 transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-start gap-4">
                  <Award className="text-purple-400 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">Emerging Technologies</h3>
                    <p className="text-gray-300">AICTE (AI & Cloud)</p>
                    <p className="text-gray-400 text-sm">2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coding Profiles Section */}
      <section id="profiles" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all flex flex-col items-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={48} className="text-blue-400" />
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
      <section id="contact" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities and exciting projects. 
                  Feel free to reach out if you'd like to collaborate or just have a chat!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-400" size={20} />
                    <span className="text-gray-300">mbharathrajcw@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-green-400" size={20} />
                    <span className="text-gray-300">+91 9043129158</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-purple-400" size={20} />
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="Your Name"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
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
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={20} />
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
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
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/bharath-raj-m-4a93b9313"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
