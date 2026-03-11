'use client';
import { BsInstagram, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [aboutVisible, setAboutVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
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
      const sections = ['home', 'about', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Check if scrolled
      setIsScrolled(window.scrollY > 50);

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

      // Trigger animations when sections come into view
      const aboutSection = document.getElementById('about');
      const projectsSection = document.getElementById('projects');
      const servicesSection = document.getElementById('services');
      const contactSection = document.getElementById('contact');
      
      if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight * 0.75) {
          setAboutVisible(true);
        }
      }
      
      if (projectsSection) {
        const projectsTop = projectsSection.getBoundingClientRect().top;
        if (projectsTop < window.innerHeight * 0.75) {
          setProjectsVisible(true);
        }
      }
      
      if (servicesSection) {
        const servicesTop = servicesSection.getBoundingClientRect().top;
        if (servicesTop < window.innerHeight * 0.75) {
          setServicesVisible(true);
        }
      }
      
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        if (contactTop < window.innerHeight * 0.75) {
          setContactVisible(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Form submit triggered');
    console.log('📝 Form data:', formData);
    
    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.location || !formData.subject || !formData.message) {
      console.error('❌ Validation failed: Missing fields');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📤 Sending request to /api/contact...');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 Response status:', response.status);
      
      const data = await response.json();
      console.log('📥 Response data:', data);

      if (response.ok) {
        console.log('✅ Success!');
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          location: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        console.error('❌ Server error:', data.error);
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Form submission complete');
    }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-[#0B0F1A] text-gray-100' 
        : 'bg-linear-to-br from-purple-50 to-purple-300 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-linear-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10' 
            : 'bg-linear-to-r from-orange-200/20 via-pink-200/20 to-purple-200/20'
        }`}></div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl ${
          isDark 
            ? 'bg-linear-to-br from-[#1a1f2e] to-[#2a2f3e] border-2 border-[#3a3f4e] hover:border-yellow-400 text-yellow-400 hover:shadow-yellow-400/50' 
            : 'bg-linear-to-br from-white to-orange-50 border-2 border-orange-300 hover:border-orange-500 text-orange-500 hover:shadow-orange-400/50'
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
      <nav className={`fixed z-50 ${
        isScrolled 
          ? `top-4 left-1/2 -translate-x-1/2 w-[430px] rounded-2xl backdrop-blur-md border ${isDark ? 'bg-black/95 border-gray-800' : 'bg-white/95 border-gray-200'}`
          : `top-0 left-0 right-0 w-full ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`
      }`}>
        <div className={`mx-auto px-8 ${
          isScrolled ? 'py-6' : 'max-w-7xl py-8'
        }`}>
          <div className={`flex items-center ${
            isScrolled ? 'justify-center' : 'justify-between'
          }`}>
            {/* Logo - Hidden when scrolled */}
            <div className={`flex items-center ${
              isScrolled ? 'hidden' : ''
            }`}>
              <span className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Arlene</span>
            </div>

            {/* Navigation Links - Centered when scrolled */}
            <ul className={`flex gap-8 items-center`}>
              {['home', 'about', 'projects', 'services', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 relative ${
                      activeSection === section 
                        ? (isDark ? 'text-purple-400' : 'text-purple-600')
                        : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-purple-600')
                    }`}
                  >
                    {section === 'home' ? 'Home' : section === 'about' ? 'About' : section === 'projects' ? 'Projects' : section === 'services' ? 'Services' : 'Contact'}
                  </button>
                </li>
              ))}
            </ul>

            {/* Contact Button - Hidden when scrolled */}
            <div className={`${
              isScrolled ? 'hidden' : ''
            }`}>
              <button
                onClick={() => scrollToSection('contact')}
                className={`rounded-md w-32 h-12 font-semibold transition-all duration-300 ${
                  isDark 
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                    : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center px-8 z-10 pt-20 overflow-hidden ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
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
            <rect width="100" height="100%" fill="url(#grid-accent-2)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h1 className={`text-5xl md:text-6xl font-bold mb-8 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Hey there! <span className="inline-block animate-wave">👋</span>, I'm<br />
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
              className={`mt-4 rounded-md w-32 h-12 font-semibold transition-all duration-300 absolute -bottom-20 hover:scale-105 flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                  : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
              }`}
            >
              Say Hello <span className="inline-block animate-wave">👋</span>
            </button>
          </div>

          {/* Right Illustration */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className={`relative w-full max-w-md aspect-square rounded-full flex items-center justify-center ${
              isDark ? 'bg-linear-to-br from-blue-900/20 to-purple-900/20' : 'bg-linear-to-br from-purple-100 to-pink-100'
            }`}>
              {/* Developer Illustration */}
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍💻</div>
                
                {/* Floating Icons */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-linear-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg">
                  🎨
                </div>
                <div className="absolute top-20 right-10 w-16 h-16 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                  ⚛️
                </div>
                <div className="absolute bottom-20 left-16 w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
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
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="about" className={`relative min-h-screen flex items-center justify-center px-6 py-4 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-6xl w-full transition-all duration-1000 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-purple-400' 
                : 'text-purple-600'
            }`}>
              About Me
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full mb-12 ${
              isDark 
                ? 'bg-purple-500' 
                : 'bg-purple-500'
            }`}></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className={`w-80 h-80 rounded-full overflow-hidden border-4 ${
                  isDark ? 'border-purple-500' : 'border-purple-400'
                }`}>
                  <img src="/Arlene.jpg" alt="Arlene ISHIMWE" className="w-full h-full object-cover" />
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-4 justify-center mt-12">
                  <a 
                    href="https://www.instagram.com/_arl_ene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-purple-500 hover:bg-purple-500/20' 
                        : 'border-purple-400 hover:bg-purple-400/20'
                    }`}
                  >
                    <span className="text-xl"><BsInstagram /></span>
                  </a>
                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-purple-500 hover:bg-purple-500/20' 
                        : 'border-purple-400 hover:bg-purple-400/20'
                    }`}
                  >
                    <span className="text-xl"><BsLinkedin /></span>
                  </a>
                  <a 
                    href="https://github.com/IshimweArlene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-purple-500 hover:bg-purple-500/20' 
                        : 'border-purple-400 hover:bg-purple-400/20'
                    }`}
                  >
                    <span className="text-xl"><BsGithub /></span>
                  </a>
                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-purple-500 hover:bg-purple-500/20' 
                        : 'border-purple-400 hover:bg-purple-400/20'
                    }`}
                  >
                    <span className="text-xl"><BsTwitter /></span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-4xl font-bold mb-8 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  I'm a Software Engineer
                </h3>
                
                <p className={`text-lg leading-relaxed mb-8 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Hi, I'm Ishimwe Arlene. As a passionate software developer, I love turning ideas into innovative and meaningful solutions. I enjoy blending my technical skills with creative problem-solving to build applications that truly make a difference in people's lives. I thrive in teamwork, bringing positivity and creativity to every project. Let's connect!
                </p>

                <div className="flex gap-4">
                  <button className={`w-32 h-12 rounded-md font-semibold transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                      : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
                  }`}>
                    Resume
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={`w-32 h-12 rounded-md border-2 font-semibold transition-all duration-300 hover:scale-105 animate-float ${
                      isDark 
                        ? 'border-gray-600 hover:border-purple-500 hover:text-purple-400' 
                        : 'border-purple-400 hover:border-purple-600 hover:text-purple-600'
                    }`}
                  >
                    Let's chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="projects" className={`relative min-h-screen flex items-center justify-center px-6 py-20 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-7xl w-full transition-all duration-1000 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-purple-400' 
                : 'text-purple-600'
            }`}>
              Featured Projects
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-purple-500' 
                : 'bg-purple-500'
            }`}></div>
            <p className={`mt-6 text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Some of my recent work that I'm proud of</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'LankaStay', 
                desc: 'A modern hotel booking platform that helps you forget busy work and start your next vacation. Browse beautiful accommodations, book instantly, and plan your perfect getaway.',
                icon: '🏖️',
                image: '/lankastay.png',
                color: isDark ? 'from-teal-500 to-cyan-500' : 'from-teal-400 to-cyan-400'
              },
              { 
                title: 'Haha', 
                desc: 'Core implements online buying and selling of products, featuring intuitive product browsing, cart, secure payments, and order management, ensuring convenience.',
                icon: '🛒',
                color: isDark ? 'from-orange-500 to-red-500' : 'from-orange-400 to-red-400'
              },
              { 
                title: 'Ezy-Chat', 
                desc: 'ezy-chat is a React Native-based chat application that leverages Firebase Authentication for secure user login and signup, with Firestore as its database.',
                icon: '💬',
                color: isDark ? 'from-purple-500 to-indigo-500' : 'from-purple-400 to-indigo-400'
              },
              { 
                title: 'CarExhibit', 
                desc: 'CarExhibit - A modern automotive platform using Next.js, is your go-to destination for real-time data, intelligent search, and fast loading.',
                icon: '🚗',
                color: isDark ? 'from-blue-500 to-cyan-500' : 'from-blue-400 to-cyan-400'
              },
              { 
                title: 'I Lead', 
                desc: 'iLead management system. This web-based platform helps student leaders manage resources and day-to-day operation of iLead program in RCA.',
                icon: '📊',
                color: isDark ? 'from-gray-600 to-gray-800' : 'from-gray-400 to-gray-600'
              },
              { 
                title: 'PSSL Website', 
                desc: 'A responsive and informative website dedicated to Petit Séminaire Saint Léon Kabgayi, highlighting its rich history, academic programs, and staff.',
                icon: '🎓',
                color: isDark ? 'from-blue-600 to-indigo-700' : 'from-blue-500 to-indigo-600'
              },
            ].map((project, index) => (
              <div 
                key={index} 
                className={`group relative backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  isDark 
                    ? 'bg-[#0D1117]/80 border-[#1a1f2e] hover:border-purple-500/50 hover:shadow-purple-500/20' 
                    : 'bg-white/90 border-gray-200 hover:border-purple-400 hover:shadow-purple-500/20'
                }`}
              >
                {/* Project Image/Preview */}
                <div className={`h-48 bg-linear-to-br ${project.color} relative overflow-hidden`}>
                  {project.image ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isDark ? 'bg-black/40 group-hover:bg-black/20' : 'bg-white/30 group-hover:bg-white/10'
                      }`}></div>
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isDark ? 'bg-black/30 group-hover:bg-black/10' : 'bg-white/20 group-hover:bg-white/5'
                      }`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl opacity-80 group-hover:scale-110 transition-all duration-500">
                          {project.icon}
                        </div>
                      </div>
                    </>
                  )}
                  {/* Hover overlay icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                    }`}>
                      <span className="text-white text-xl"><BsGithub/></span>
                    </a>
                    <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                    }`}>
                      <span className="text-white text-xl">🔗</span>
                    </a>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="services" className={`relative min-h-screen flex items-center justify-center px-6 py-20 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-7xl w-full transition-all duration-1000 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-purple-400' 
                : 'text-purple-600'
            }`}>
              Services
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-purple-500' 
                : 'bg-purple-500'
            }`}></div>
            <p className={`mt-6 text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>What I can do for you</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Web Development', 
                desc: 'Building responsive and modern web applications using the latest technologies like React, Next.js, and Tailwind CSS. From concept to deployment, I create seamless user experiences.',
                icon: '💻',
                color: isDark ? 'from-blue-500 to-cyan-500' : 'from-blue-400 to-cyan-400'
              },
              { 
                title: 'Mobile Development', 
                desc: 'Creating cross-platform mobile applications with React Native and Flutter. Delivering native-like performance and beautiful interfaces for iOS and Android.',
                icon: '📱',
                color: isDark ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400'
              },
              { 
                title: 'UI/UX Design', 
                desc: 'Designing intuitive and visually appealing user interfaces. Focusing on user experience, accessibility, and modern design principles to create engaging digital products.',
                icon: '🎨',
                color: isDark ? 'from-orange-500 to-red-500' : 'from-orange-400 to-red-400'
              },
              { 
                title: 'Backend Development', 
                desc: 'Developing robust server-side applications and APIs using Node.js, Express, and databases like MongoDB and PostgreSQL. Ensuring scalability and security.',
                icon: '⚙️',
                color: isDark ? 'from-green-500 to-teal-500' : 'from-green-400 to-teal-400'
              },
              { 
                title: 'Database Design', 
                desc: 'Architecting efficient database structures and optimizing queries for performance. Experience with both SQL and NoSQL databases for various use cases.',
                icon: '🗄️',
                color: isDark ? 'from-indigo-500 to-purple-500' : 'from-indigo-400 to-purple-400'
              },
              { 
                title: 'Consulting & Support', 
                desc: 'Providing technical consultation, code reviews, and ongoing support for your projects. Helping teams adopt best practices and improve their development workflow.',
                icon: '🤝',
                color: isDark ? 'from-pink-500 to-rose-500' : 'from-pink-400 to-rose-400'
              },
            ].map((service, index) => (
              <div 
                key={index} 
                className={`group relative backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  isDark 
                    ? 'bg-[#0D1117]/80 border-[#1a1f2e] hover:border-purple-500/50 hover:shadow-purple-500/20' 
                    : 'bg-white/90 border-gray-200 hover:border-purple-400 hover:shadow-purple-500/20'
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${service.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all duration-500`}>
                  {service.icon}
                </div>
                
                {/* Service Info */}
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="contact" className={`relative min-h-screen flex items-center justify-center px-6 py-20 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-6xl w-full transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className={`text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Let's discuss your project
              </h2>
              <p className={`text-lg mb-12 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Always happy to help! Don't hesitate to contact me if you need anything.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black border border-gray-800' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      My location
                    </div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Kigali, Rwanda
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black border border-gray-800' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      My email
                    </div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ishimwearlene74@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black border border-gray-800' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      Call me now
                    </div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      +250 798 973 574
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/_arl_ene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-purple-500 hover:bg-purple-500/20' 
                      : 'border-purple-400 hover:bg-purple-400/20'
                  }`}
                >
                  <span className="text-xl"><BsInstagram /></span>
                </a>
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-purple-500 hover:bg-purple-500/20' 
                      : 'border-purple-400 hover:bg-purple-400/20'
                  }`}
                >
                  <span className="text-xl"><BsLinkedin /></span>
                </a>
                <a 
                  href="https://github.com/IshimweArlene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-purple-500 hover:bg-purple-500/20' 
                      : 'border-purple-400 hover:bg-purple-400/20'
                  }`}
                >
                  <span className="text-xl"><BsGithub /></span>
                </a>
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-purple-500 hover:bg-purple-500/20' 
                      : 'border-purple-400 hover:bg-purple-400/20'
                  }`}
                >
                  <span className="text-xl"><BsTwitter /></span>
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                I'm excited to hear from you! Fill out the form below and let's start a conversation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name*"
                  required
                  className={`w-full border-b-2 px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-500 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email*"
                  required
                  className={`w-full border-b-2 px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-500 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location*"
                  required
                  className={`w-full border-b-2 px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-500 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject*"
                  required
                  className={`w-full border-b-2 px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-500 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message*"
                  rows={4}
                  required
                  className={`w-full border-b-2 px-0 py-3 bg-transparent focus:outline-none transition-all resize-none ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-500 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400'
                  }`}
                ></textarea>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-500 text-sm">
                    ✓ Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-500 text-sm">
                    ✗ Failed to send message. Please try again.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-32 h-12 rounded-md font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  } ${
                    isDark 
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50' 
                      : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'} <span>✉️</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative border-t h-64 flex items-center z-10 transition-colors duration-500 ${
        isDark 
          ? 'bg-black border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex justify-between items-center">
            {/* Left - Logo/Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <img src="/Arlene.jpg" alt="Arlene" className="w-full h-full object-cover" />
              </div>
              <span className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Arlene</span>
            </div>

            {/* Center - Navigation Links */}
            <ul className="flex gap-8 items-center">
              {['home', 'about', 'projects', 'services', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 ${
                      isDark 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {section === 'home' ? 'Home' : section === 'about' ? 'About' : section === 'projects' ? 'Projects' : section === 'services' ? 'Services' : 'Contacts'}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right - Copyright */}
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Copyright © 2024 Arlene
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
