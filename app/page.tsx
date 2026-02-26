'use client';

import { useEffect, useState } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-gray-100 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0B0F1A]/80 backdrop-blur-md z-50 border-b border-[#1a1f2e]/50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Arlene
            </h1>
            <ul className="flex gap-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="relative capitalize hover:text-white transition-all duration-300 group"
                  >
                    {section}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                        activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 z-10">
        <div className={`max-w-5xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6 inline-block">
            <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase animate-pulse">Welcome to my portfolio</span>
          </div>
          <h2 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Hi, I'm Arlene ISHIMWE
          </h2>
          <p className="text-3xl text-gray-300 mb-8 font-light">
            Full Stack Developer & Creative Technologist
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            I craft exceptional digital experiences that blend beautiful design with powerful functionality. 
            Let's build something extraordinary together.
          </p>
          <div className="flex gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
          <div className="flex gap-6 justify-center mt-12">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate developer with expertise in building modern web applications that make a difference.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                I love turning complex problems into simple, beautiful, and intuitive solutions. 
                With a keen eye for design and a deep understanding of technology, I create experiences that users love.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">5+</div>
                  <div className="text-sm text-gray-500">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400">100%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
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
                    <span className="text-gray-300 font-medium">{item.skill}</span>
                    <span className="text-blue-400">{item.level}%</span>
                  </div>
                  <div className="h-2 bg-[#161B22] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-purple-500/50"
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
                className="bg-[#0D1117]/50 backdrop-blur-sm border border-[#1a1f2e] p-6 rounded-xl text-center hover:bg-[#161B22] hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group"
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
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-6 text-lg">Some of my recent work that I'm proud of</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              { 
                title: 'E-Commerce Platform', 
                desc: 'A full-stack e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
                tags: ['Next.js', 'Stripe', 'MongoDB'],
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'AI Chat Application', 
                desc: 'Real-time chat app with AI-powered responses, user authentication, and message encryption.',
                tags: ['React', 'WebSocket', 'OpenAI'],
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'Portfolio CMS', 
                desc: 'Content management system for creative professionals with drag-and-drop interface.',
                tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
                gradient: 'from-orange-500 to-red-500'
              },
              { 
                title: 'Analytics Dashboard', 
                desc: 'Real-time analytics platform with interactive charts, data visualization, and reporting.',
                tags: ['React', 'D3.js', 'Firebase'],
                gradient: 'from-green-500 to-teal-500'
              },
            ].map((project, index) => (
              <div 
                key={index} 
                className="group bg-[#0D1117]/50 backdrop-blur-sm border border-[#1a1f2e] rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className={`bg-gradient-to-br ${project.gradient} h-56 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      🚀
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-[#161B22] border border-[#1a1f2e] rounded-full text-sm text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                      View Demo
                    </button>
                    <button className="px-4 py-2 border border-gray-600 rounded-lg font-semibold hover:border-purple-500 hover:text-purple-400 transition-all duration-300">
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
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-xl mt-6 max-w-2xl mx-auto">
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
                className="bg-[#0D1117]/50 backdrop-blur-sm border border-[#1a1f2e] rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-sm text-gray-500 mb-1">{item.title}</div>
                <div className="text-gray-300 font-medium">{item.value}</div>
              </div>
            ))}
          </div>
          
          <form className="space-y-6 bg-[#0D1117]/50 backdrop-blur-sm border border-[#1a1f2e] rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#161B22] border border-[#1a1f2e] rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-[#161B22] border border-[#1a1f2e] rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-[#161B22] border border-[#1a1f2e] rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full bg-[#161B22] border border-[#1a1f2e] rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0B0F1A] border-t border-[#1a1f2e] py-12 text-center z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-all duration-300 hover:scale-110"
              >
                {social[0]}
              </a>
            ))}
          </div>
          <p className="text-gray-500 mb-2">Built with ❤️ using Next.js & Tailwind CSS</p>
          <p className="text-gray-600">&copy; 2024 Arlene ISHIMWE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
