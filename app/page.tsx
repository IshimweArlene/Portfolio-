'use client';

import { BsInstagram, BsGithub, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs';
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
      isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-black' 
            : 'bg-white'
        }`}></div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl ${
          isDark 
            ? 'bg-white border-2 border-gray-600 hover:border-yellow-400 text-yellow-400 hover:shadow-yellow-400/50' 
            : 'bg-black border-2 border-orange-300 hover:border-orange-500 text-orange-500 hover:shadow-orange-400/50'
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
      <nav className={`fixed z-50 rounded-4xl  ${
        isScrolled 
          ? `top-4 left-1/2 -translate-x-1/2 w-[430px] rounded-2xl backdrop-blur-xl border ${
              isDark ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10'
            }`
          : `top-0 left-0 right-0 w-full ${
              isDark ? 'bg-black/80' : 'bg-white/80'
            } backdrop-blur-sm`
      }`}>
        <div className={`h-12 flex items-center w-full ${isScrolled ? 'px-6' : 'px-6'}`} style={!isScrolled ? {paddingLeft: '120px', paddingRight: '120px', paddingTop: '20px'} : {}}>
          <div className="flex items-center justify-between w-full">
            {/* Logo - Hidden when scrolled */}
            <div className={`flex items-center ${isScrolled ? 'hidden' : ''}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center">
                <img src="/photos/Arlene.jpg" alt="Arlene" className="w-full h-full object-cover" />
              </div>
              <span className={`ml-3 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Arlene</span>
            </div>

            {/* Navigation Links - Centered */}
            <ul className={`flex gap-8 items-center ${isScrolled ? 'justify-center w-full' : 'absolute left-1/2 transform -translate-x-1/2'}`}>
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
                    {section === 'home' ? 'Home' : 
                     section === 'about' ? 'About' : 
                     section === 'projects' ? 'Projects' : 'Services'}
                  </button>
                </li>
              ))}
            </ul>

            {/* Contact Button - Hidden when scrolled */}
            <div className={`${isScrolled ? 'hidden' : ''}`}>
              <button
                onClick={() => scrollToSection('contact')}
                className={`rounded-md w-32 h-12 font-semibold transition-all duration-300 ${
                  isDark 
                    ? 'bg-white text-black hover:shadow-lg hover:shadow-purple-500/50' 
                    : 'bg-black text-white hover:shadow-lg hover:shadow-purple-400/50'
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
              <span className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>I am into{' '}</span>
              <span className={`text-xl font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {typedText}<span className="animate-pulse">|</span>
              </span>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className={`mt-4 rounded-md w-32 h-12 font-semibold transition-all duration-300 absolute -bottom-20 hover:scale-105 flex items-center justify-center gap-2 ${
                isDark 
                  ? 'bg-white text-black hover:shadow-lg hover:shadow-purple-500/50' 
                  : 'bg-black text-white hover:shadow-lg hover:shadow-purple-400/50'
              }`}
            >
              Say Hello <span className="inline-block animate-wave">👋</span>
            </button>
          </div>

          {/* Right Illustration */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className={`relative w-full max-w-md aspect-square rounded-full flex items-center justify-center ${
              isDark ? 'bg-white/20' : 'bg-black/20'
            }`}>
              {/* Developer Illustration */}
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍💻</div>
                
                {/* Floating Icons */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg">
                  🎨
                </div>
                <div className="absolute top-20 right-10 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '0.5s' }}>
                  ⚛️
                </div>
                <div className="absolute bottom-20 left-16 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
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
      <section id="about" className={`relative flex items-center justify-center px-6 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-6xl w-full transition-all duration-1000 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className={`text-6xl font-bold ${
              isDark 
                ? 'text-gray-800' 
                : 'text-purple-600'
            }`} style={{ marginBottom: '1rem' }}>
              About Me
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ marginTop: '3rem' }}>
            {/* Left - Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className={`w-80 h-80 rounded-full overflow-hidden border-4 ${
                  isDark ? 'border-black' : 'border-white'
                }`}>
                  <img src="/photos/Arlene.jpg" alt="Arlene ISHIMWE" className="w-full h-full object-cover" />
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-4 justify-center mt-12">
                  <a 
                    href="https://www.instagram.com/_arl_ene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-black hover:bg-black/20' 
                        : 'border-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl text-pink-500"><BsInstagram /></span>
                  </a>
                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-black hover:bg-black/20' 
                        : 'border-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl text-blue-600"><BsLinkedin /></span>
                  </a>
                  <a 
                    href="https://github.com/IshimweArlene"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-black hover:bg-black/20' 
                        : 'border-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl text-gray-800"><BsGithub /></span>
                  </a>
                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-black hover:bg-black/20' 
                        : 'border-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl text-blue-400"><BsTwitter /></span>
                  </a>
                  <a 
                    href="https://wa.me/250798973574"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark 
                        ? 'border-black hover:bg-black/20' 
                        : 'border-white hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl text-green-500"><BsWhatsapp /></span>
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
                  <a 
                    href="/Resume/ISHIMWE Arlene.pdf" 
                    className={`w-32 h-12 rounded-md font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                      isDark 
                        ? 'bg-white text-black hover:shadow-lg hover:shadow-purple-500/50' 
                        : 'bg-black text-white hover:shadow-lg hover:shadow-purple-400/50'
                    }`}
                  >
                    Resume
                  </a>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={`w-32 h-12 rounded-md border-2 font-semibold transition-all duration-300 hover:scale-105 animate-float ${
                      isDark 
                        ? 'border-black hover:border-black hover:text-black' 
                        : 'border-white hover:border-white hover:text-white'
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
      {/* Skills Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="skills" className={`relative flex items-center justify-center px-6 overflow-hidden z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`} style={{ paddingTop: '44px' }}>
        <div className={`max-w-7xl w-full transition-all duration-1000 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-gray-800' 
                : 'text-purple-600'
            }`}>
              Skills
            </h2>
          </div>

          {/* Technical Skills Row */}
          <div className="mb-32 relative" style={{paddingTop: '32px', paddingBottom: '24px'}}>
            
            <div className="flex gap-8 animate-scroll-left whitespace-nowrap">
              {/* Multiple sets for seamless loop */}
              {Array(10).fill(['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'Firebase', 'Tailwind CSS', 'Git', 'Docker']).flat().map((skill, index) => (
                <div
                  key={`tech-${index}`}
                  className={`inline-block px-8 py-4 font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Row */}
          <div className="relative" style={{paddingBottom: '24px'}}>
            
            <div className="flex gap-8 animate-scroll-right whitespace-nowrap">
              {/* Multiple sets for seamless loop */}
              {Array(10).fill(['Problem Solving', 'Team Collaboration', 'Communication', 'Leadership', 'Time Management', 'Creativity', 'Adaptability', 'Critical Thinking', 'Project Management', 'Attention to Detail']).flat().map((skill, index) => (
                <div
                  key={`soft-${index}`}
                  className={`inline-block px-8 py-4 font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="projects" className={`relative flex items-center justify-center px-6 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`} style={{ paddingTop: '44px', paddingBottom: '72px' }}>
        <div className={`max-w-7xl w-full transition-all duration-1000 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="text-center mb-16 ">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-gray-800' 
                : 'text-purple-600'
            }`} style={{marginBottom: '32px'}}>
              Featured Projects
            </h2>
            <p className={`mt-6 text-xl ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`} style={{marginBottom: '24px'}}>Some of my recent work that I'm proud of</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'LankaStay', 
                desc: 'A modern hotel booking platform that helps you forget busy work and start your next vacation. Browse beautiful accommodations, book instantly, and plan your perfect getaway.',
                icon: '🏖️',
                image: '/photos/lankastay.png',
                color: isDark ? 'from-teal-500 to-cyan-500' : 'from-teal-400 to-cyan-400'
              },
              { 
                title: 'RestoNest Hub', 
                desc: 'A comprehensive hotel reservation platform that streamlines the booking experience for travelers. Features real-time availability, secure payment processing, and intuitive search filters to help guests find their perfect accommodation effortlessly.',
                icon: '🏨',
                image: '/photos/restonest.png',
                color: isDark ? 'from-orange-500 to-red-500' : 'from-orange-400 to-red-400'
              },
              { 
                title: 'Fintask', 
                desc: 'A comprehensive financial management application that helps users track expenses, manage budgets, and achieve their financial goals. Features intuitive dashboards, expense categorization, and detailed financial analytics.',
                icon: '�',
                image: '/photos/Fintask.png',
                color: isDark ? 'from-green-500 to-emerald-500' : 'from-green-400 to-emerald-400'
              },
              { 
                title: 'FitHub', 
                desc: 'A modern fitness tracking platform that empowers users to monitor their workouts, set fitness goals, and track progress. Includes workout planning, progress analytics, and community features for motivation.',
                icon: '💪',
                image: '/photos/Fithub.png',
                color: isDark ? 'from-red-500 to-pink-500' : 'from-red-400 to-pink-400'
              },
              { 
                title: 'AquaPay', 
                desc: 'A secure digital payment solution that simplifies online transactions and money transfers. Features instant payments, multi-currency support, and advanced security protocols for safe financial transactions.',
                icon: '💳',
                image: '/photos/AquaPay.png',
                color: isDark ? 'from-blue-500 to-cyan-500' : 'from-blue-400 to-cyan-400'
              },
              { 
                title: 'SwiftCart', 
                desc: 'A unified mobile marketplace that brings together restaurants, grocery stores, pharmacies, and local services in one platform. Features quick search, categorized services, digital rewards system, and seamless ordering to simplify everyday shopping.',
                icon: '🛒',
                image: '/photos/SwiftCart.png',
                color: isDark ? 'from-purple-500 to-indigo-500' : 'from-purple-400 to-indigo-400'
              },
            ].map((project, index) => (
              <div 
                key={index} 
                className={`group relative backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  isDark 
                    ? 'bg-[#0D1117]/80 border-[#1a1f2e] hover:border-black hover:shadow-black/20' 
                    : 'bg-white/90 border-gray-200 hover:border-white hover:shadow-white/20'
                }`}
              >
                {/* Project Image/Preview */}
                <div className={`h-48 ${isDark ? 'bg-white' : 'bg-black'} relative overflow-hidden`}>
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
                    <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-black hover:bg-gray-800">
                      <span className="text-white text-xl"><BsGithub/></span>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-black hover:bg-gray-800">
                      <span className="text-white text-xl">🔗</span>
                    </a>
                  </div>
                </div>
                
                {/* Project Info */}
                <div style={{padding: '12px'}}>
                  <h3 className={`text-2xl font-bold mb-4 ${
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
          
          {/* GitHub Button */}
          <div className="text-center " style={{marginTop: '44px'}}>
            <a 
              href="https://github.com/IshimweArlene"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 w-80 h-24 rounded-md font-semibold transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-white text-black hover:shadow-lg hover:shadow-white/20' 
                  : 'bg-black text-white hover:shadow-lg hover:shadow-black/20'
              }`}
            >
              <span className="text-xl"><BsGithub /></span>
              See more on my GitHub 
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="services" className={`relative flex items-center justify-center px-6 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}>
        <div className={`max-w-7xl w-full transition-all duration-1000 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}style={{paddingBottom: '52px'}}>
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-bold mb-4 ${
              isDark 
                ? 'text-gray-800' 
                : 'text-purple-600'
            }`}>
              Services
            </h2>
            <p className={`mt-6 text-xl ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`} style={{paddingTop: '12px', paddingBottom: '12px'}}>What I can do for you</p>
          </div>
          
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-8 animate-scroll-services" style={{width: 'max-content'}}>
              {/* Multiple sets for seamless loop */}
              {Array(5).fill([
                { 
                  title: 'Web Development', 
                  desc: 'Building responsive and modern web applications using the latest technologies like React, Next.js, and Tailwind CSS.',
                  icon: '💻',
                  color: isDark ? 'from-blue-500 to-cyan-500' : 'from-blue-400 to-cyan-400'
                },
                { 
                  title: 'Mobile Development', 
                  desc: 'Creating cross-platform mobile applications with React Native and Flutter. Delivering native-like performance.',
                  icon: '📱',
                  color: isDark ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400'
                },
                { 
                  title: 'UI/UX Design', 
                  desc: 'Designing intuitive and visually appealing user interfaces. Focusing on user experience and accessibility.',
                  icon: '🎨',
                  color: isDark ? 'from-orange-500 to-red-500' : 'from-orange-400 to-red-400'
                },
                { 
                  title: 'Backend Development', 
                  desc: 'Developing robust server-side applications and APIs using Node.js, Express, and databases like MongoDB.',
                  icon: '⚙️',
                  color: isDark ? 'from-green-500 to-teal-500' : 'from-green-400 to-teal-400'
                },
                { 
                  title: 'Database Design', 
                  desc: 'Architecting efficient database structures and optimizing queries for performance with SQL and NoSQL databases.',
                  icon: '🗄️',
                  color: isDark ? 'from-indigo-500 to-purple-500' : 'from-indigo-400 to-purple-400'
                },
                { 
                  title: 'Consulting & Support', 
                  desc: 'Providing technical consultation, code reviews, and ongoing support for your projects and development workflow.',
                  icon: '🤝',
                  color: isDark ? 'from-pink-500 to-rose-500' : 'from-pink-400 to-rose-400'
                },
              ]).flat().map((service, index) => (
                <div 
                  key={index} 
                  className={`group relative backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl w-80 h-64 flex flex-col items-center flex-shrink-0 ${
                    isDark 
                      ? 'bg-[#0D1117]/80 border-[#1a1f2e] hover:border-black hover:shadow-black/20' 
                      : 'bg-white/90 border-gray-200 hover:border-white hover:shadow-white/20'
                  }`}
                >
                  {/* Icon - Centered and same size as service box */}
                  <div className={`w-80 h-32 ${isDark ? 'bg-white' : 'bg-black'} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-all duration-500 rounded-t-2xl -m-8 mt-0`}>
                    {service.icon}
                  </div>

                  {/* Service Info - Below icon */}
                  <div className="text-center mt-4 px-4">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      {/* SECTION COLOR: Dark mode = bg-black | Light mode = bg-white */}
      <section id="contact" className={`relative flex items-center justify-center px-6 z-10 ${
        isDark ? 'bg-black' : 'bg-white'
      }`} style={{paddingTop: '24px'}}>
        <div className={`max-w-6xl w-full transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className={`text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}style={{paddingBottom: '12px'}}>Let's discuss your project</h2>
              <p className={`text-lg mb-12 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Always happy to help! Don't hesitate to contact me if you need anything.</p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>My location</div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Kigali, Rwanda</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>My email</div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>ishimwearlene74@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-black' : 'bg-white'
                  }`}>
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Call me now</div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>+250 798 973 574</div>
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
                      ? 'border-black hover:bg-black/20' 
                      : 'border-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl text-pink-500"><BsInstagram /></span>
                </a>
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-black hover:bg-black/20' 
                      : 'border-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl text-blue-600"><BsLinkedin /></span>
                </a>
                <a 
                  href="https://github.com/IshimweArlene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-black hover:bg-black/20' 
                      : 'border-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl text-gray-800"><BsGithub /></span>
                </a>
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-black hover:bg-black/20' 
                      : 'border-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl text-blue-400"><BsTwitter /></span>
                </a>
                <a 
                  href="https://wa.me/250798973574"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'border-black hover:bg-black/20' 
                      : 'border-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl text-green-500"><BsWhatsapp /></span>
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} style={{marginBottom: '12px',  marginTop: '32px'}}>I'm excited to hear from you! Fill out the form below and let's start a conversation.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name*"
                  required
                  className={`w-full h-12 border-b px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-700 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-700 text-gray-900 placeholder-gray-400'
                  }`}style={{paddingTop: '16px'}}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email*"
                  required
                  className={`w-full h-12 border-b px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-700 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-700 text-gray-900 placeholder-gray-400'
                  }`}style={{paddingTop: '16px'}}
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location*"
                  required
                  className={`w-full h-12 border-b px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-700 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-700 text-gray-900 placeholder-gray-400'
                  }`}style={{paddingTop: '16px'}}
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject*"
                  required
                  className={`w-full h-12 border-b px-0 py-3 bg-transparent focus:outline-none transition-all ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-700 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-700 text-gray-900 placeholder-gray-400'
                  }`}style={{paddingTop: '16px'}}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message*"
                  rows={1}
                  required
                  className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-all resize-none h-12 ${
                    isDark 
                      ? 'border-gray-700 focus:border-purple-700 text-white placeholder-gray-500' 
                      : 'border-gray-300 focus:border-purple-700 text-gray-900 placeholder-gray-400'
                  }`}style={{paddingTop: '16px', marginBottom: '16px'}}
                ></textarea>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-500 text-sm">✓ Message sent successfully!</div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-500 text-sm">✗ Failed to send message. Please try again.</div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-32 h-12 rounded-md font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    isDark 
                      ? 'bg-white text-black hover:shadow-lg hover:shadow-purple-500/50' 
                      : 'bg-black text-white hover:shadow-lg hover:shadow-purple-400/50'
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
      <footer className="relative h-64 flex items-center z-10 bg-gray-950 " style={{marginTop: '24px'}}>
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex justify-between items-center">
            {/* Left - Logo/Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center">
                <img src="/photos/Arlene.jpg" alt="Arlene" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-semibold text-gray-200">Arlene</span>
            </div>

            {/* Center - Navigation Links */}
            <ul className="flex gap-8 items-center">
              {['home', 'about', 'projects', 'services', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="capitalize transition-all duration-300 text-gray-200 hover:text-white"
                  >
                    {section === 'home' ? 'Home' : 
                     section === 'about' ? 'About' : 
                     section === 'projects' ? 'Projects' : 
                     section === 'services' ? 'Services' : 'Contacts'}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right - Copyright */}
            <p className="text-gray-200">Copyright © 2024 Arlene</p>
          </div>
        </div>
      </footer>
    </div>
  );
}