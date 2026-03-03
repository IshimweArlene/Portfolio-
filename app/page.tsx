'use client';

import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState('');
  
  const phrases = ['Back end development', 'Front end development', 'UI/UX Design', 'Mobile Development'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-[#0B0F1A] text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10' 
            : 'bg-gradient-to-br from-orange-200/20 via-pink-200/20 to-purple-200/20'
        }`}></div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-[#1a1f2e] to-[#2a2f3e] border-2 border-[#3a3f4e] hover:border-yellow-400 text-yellow-400 hover:shadow-yellow-400/50' 
            : 'bg-gradient-to-br from-white to-orange-50 border-2 border-orange-300 hover:border-orange-500 text-orange-500 hover:shadow-orange-400/50'
        }`}
        aria-label="Toggle theme"
      >
        <div className="relative w-8 h-8">
          {isDark ? (
            // Moon icon
            <svg className="w-8 h-8 transition-transform duration-500 hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun icon
            <svg className="w-8 h-8 transition-transform duration-500 hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </div>
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-500 ${
        isDark 
          ? 'bg-[#0B0F1A]/80 border-[#1a1f2e]/50' 
          : 'bg-white/80 border-purple-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Arlene</span>
            </div>
            <ul className="flex gap-8 items-center">
              {['home', 'about', 'projects', 'services'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 relative ${
                      activeSection === section 
                        ? (isDark ? 'text-purple-400' : 'text-purple-600')
                        : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-purple-600')
                    }`}
                  >
                    {section === 'home' ? 'Home' : section === 'about' ? 'About' : section === 'projects' ? 'Projects' : 'Services'}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-12 py-4 rounded-md font-semibold transition-all duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-8 z-10 pt-20 overflow-hidden">
        {/* Full Page Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" className={isDark ? 'text-purple-500' : 'text-purple-400'}>
            <defs>
              <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Decorative Curved Arrow */}
        <div className="absolute top-32 right-1/3 w-40 h-40 opacity-40 pointer-events-none z-20">
          <svg viewBox="0 0 100 100" className={isDark ? 'text-purple-400' : 'text-purple-500'} fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M 20 80 Q 40 20, 80 40" strokeLinecap="round"/>
            <circle cx="50" cy="45" r="10" fill="none"/>
            <path d="M 73 33 L 80 40 L 73 47" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Additional decorative grid accent - top left */}
        <div className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none">
          <svg viewBox="0 0 100 100" className={isDark ? 'text-blue-500' : 'text-pink-400'}>
            <defs>
              <pattern id="grid-accent-1" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-accent-1)" />
          </svg>
        </div>

        {/* Additional decorative grid accent - bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className={isDark ? 'text-pink-500' : 'text-orange-400'}>
            <defs>
              <pattern id="grid-accent-2" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-accent-2)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Hey there!, I'm<br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Arlene ISHIMWE</span>
            </h1>
            
            <p className={`text-lg mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              A Full Stack Developer from the heart of Rwanda. I get excited about building beautiful, functional web applications that make a difference. When I'm not crafting clean code, I'm thinking about how to make technology more intuitive and enjoyable for everyone.
            </p>
            
            <div className="mb-8">
              <span className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I am into{' '}
              </span>
              <span className={`text-xl font-semibold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <button
              onClick={() => scrollToSection('contact')}
              className={`rounded-xl text-xl  w-32 h-12 font-semibold transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
              }`}
            >
              Say Hello
            </button>
          </div>

          {/* Right Illustration */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className={`relative w-full max-w-md aspect-square rounded-full flex items-center justify-center ${
              isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'
            }`}>
              {/* Developer Illustration */}
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍💻</div>
                
                {/* Floating Icons */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg">
                  🎨
                </div>
                <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                  ⚛️
                </div>
                <div className="absolute bottom-20 left-16 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                  💻
                </div>
                
                {/* Plant decoration */}
                <div className="absolute bottom-0 left-1/4 text-6xl">
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-600'
            }`}>
              About Me
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
            }`}></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className={`text-xl leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I'm a passionate developer with expertise in building modern web applications that make a difference.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                I love turning complex problems into simple, beautiful, and intuitive solutions. 
                With a keen eye for design and a deep understanding of technology, I create experiences that users love.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${
                    isDark ? 'text-blue-400' : 'text-orange-500'
                  }`}>50+</div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                  }`}>Projects</div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${
                    isDark ? 'text-purple-400' : 'text-pink-500'
                  }`}>5+</div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                  }`}>Years Exp</div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${
                    isDark ? 'text-pink-400' : 'text-purple-500'
                  }`}>100%</div>
                  <div className={`text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                  }`}>Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { skill: 'React & Next.js', level: 95 },
                { skill: 'TypeScript', level: 90 },
                { skill: 'Node.js & APIs', level: 88 },
                { skill: 'UI/UX Design', level: 85 },
              ].map((item) => (
                <div key={item.skill} className="group">
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>{item.skill}</span>
                    <span className={isDark ? 'text-blue-400' : 'text-orange-600'}>{item.level}%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    isDark ? 'bg-[#161B22]' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 group-hover:shadow-purple-500/50' 
                          : 'bg-gradient-to-r from-orange-500 to-pink-500 group-hover:shadow-orange-500/50'
                      }`}
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'MongoDB', 'Git', 'AWS'].map((skill, index) => (
              <div 
                key={skill} 
                className={`backdrop-blur-sm border p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                  isDark 
                    ? 'bg-[#0D1117]/50 border-[#1a1f2e] hover:bg-[#161B22] hover:border-purple-500/50 hover:shadow-purple-500/20' 
                    : 'bg-white/50 border-orange-200 hover:bg-white hover:border-orange-400 hover:shadow-orange-500/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💎</div>
                <div className="font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-600'
            }`}>
              Featured Projects
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
            }`}></div>
            <p className={`mt-6 text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Some of my recent work that I'm proud of</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { 
                title: 'E-Commerce Platform', 
                desc: 'A full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
                tags: ['Next.js', 'Stripe', 'MongoDB'],
                gradient: isDark ? 'from-blue-500 to-cyan-500' : 'from-orange-400 to-yellow-400'
              },
              { 
                title: 'AI Chat Application', 
                desc: 'Real-time chat app with AI-powered responses, user authentication, and message encryption.',
                tags: ['React', 'WebSocket', 'OpenAI'],
                gradient: isDark ? 'from-purple-500 to-pink-500' : 'from-pink-400 to-rose-500'
              },
              { 
                title: 'Portfolio CMS', 
                desc: 'Content management system for creative professionals with drag-and-drop interface.',
                tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
                gradient: isDark ? 'from-orange-500 to-red-500' : 'from-purple-400 to-indigo-500'
              },
              { 
                title: 'Analytics Dashboard', 
                desc: 'Real-time analytics platform with interactive charts, data visualization, and reporting.',
                tags: ['React', 'D3.js', 'Firebase'],
                gradient: isDark ? 'from-green-500 to-teal-500' : 'from-teal-400 to-cyan-500'
              },
            ].map((project, index) => (
              <div 
                key={index} 
                className={`group backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  isDark 
                    ? 'bg-[#0D1117]/50 border-[#1a1f2e] hover:border-purple-500/50 hover:shadow-purple-500/20' 
                    : 'bg-white/70 border-orange-200 hover:border-orange-400 hover:shadow-orange-500/20'
                }`}
              >
                <div className={`bg-gradient-to-br ${project.gradient} h-56 relative overflow-hidden`}>
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isDark ? 'bg-black/40 group-hover:bg-black/20' : 'bg-black/20 group-hover:bg-black/10'
                  }`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      🚀
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                    isDark ? 'group-hover:text-purple-400' : 'group-hover:text-orange-600'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`px-3 py-1 border rounded-full text-sm ${
                          isDark 
                            ? 'bg-[#161B22] border-[#1a1f2e] text-gray-300' 
                            : 'bg-orange-50 border-orange-200 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50' 
                        : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:shadow-orange-500/50'
                    }`}>
                      View Demo
                    </button>
                    <button className={`px-6 py-3 border rounded-lg font-semibold transition-all duration-300 ${
                      isDark 
                        ? 'border-gray-600 hover:border-purple-500 hover:text-purple-400' 
                        : 'border-orange-400 hover:border-orange-600 hover:text-orange-600'
                    }`}>
                      Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-600'
            }`}>
              Let's Connect
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
            }`}></div>
            <p className={`text-xl mt-6 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Have a project in mind? Let's work together to create something amazing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '📧', title: 'Email', value: 'hello@arlene.dev' },
              { icon: '📱', title: 'Phone', value: '+1 (555) 123-4567' },
              { icon: '📍', title: 'Location', value: 'San Francisco, CA' },
            ].map((item) => (
              <div 
                key={item.title}
                className={`backdrop-blur-sm border rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-[#0D1117]/50 border-[#1a1f2e] hover:border-purple-500/50' 
                    : 'bg-white/70 border-orange-200 hover:border-orange-400'
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className={`text-sm mb-1 ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>{item.title}</div>
                <div className={`font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>{item.value}</div>
              </div>
            ))}
          </div>
          
          <form className={`space-y-6 backdrop-blur-sm border rounded-2xl p-8 ${
            isDark 
              ? 'bg-[#0D1117]/50 border-[#1a1f2e]' 
              : 'bg-white/70 border-orange-200'
          }`}>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all ${
                  isDark 
                    ? 'bg-[#161B22] border-[#1a1f2e] focus:border-purple-500 focus:ring-purple-500/20' 
                    : 'bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500/20'
                }`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all ${
                  isDark 
                    ? 'bg-[#161B22] border-[#1a1f2e] focus:border-purple-500 focus:ring-purple-500/20' 
                    : 'bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500/20'
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className={`w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all ${
                isDark 
                  ? 'bg-[#161B22] border-[#1a1f2e] focus:border-purple-500 focus:ring-purple-500/20' 
                  : 'bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500/20'
              }`}
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className={`w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 transition-all resize-none ${
                isDark 
                  ? 'bg-[#161B22] border-[#1a1f2e] focus:border-purple-500 focus:ring-purple-500/20' 
                  : 'bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500/20'
              }`}
            ></textarea>
            <button
              type="submit"
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                  : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white hover:shadow-lg hover:shadow-orange-500/50'
              }`}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative border-t py-12 text-center z-10 transition-colors duration-500 ${
        isDark 
          ? 'bg-[#0B0F1A] border-[#1a1f2e]' 
          : 'bg-white/50 border-orange-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
              <a 
                key={social}
                href="#"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'border-gray-700 hover:border-purple-500 hover:text-purple-400' 
                    : 'border-orange-300 hover:border-orange-500 hover:text-orange-600'
                }`}
              >
                {social[0]}
              </a>
            ))}
          </div>
          <p className={`mb-2 ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>Built with ❤️ using Next.js & Tailwind CSS</p>
          <p className={isDark ? 'text-gray-600' : 'text-gray-500'}>&copy; 2024 Arlene ISHIMWE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
