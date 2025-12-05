import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Code, BookOpen, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'CSS/SCSS',
    'HTML5', 'Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL'
  ];

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2021 - Present',
      description: 'Leading frontend development for multiple web applications using React, TypeScript, and modern web technologies.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc.',
      period: '2019 - 2021',
      description: 'Developed and maintained web applications using React, Node.js, and various databases.'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2017 - 2019',
      description: 'Built responsive websites and web applications for various clients using modern frontend technologies.'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-900' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'Email', icon: Mail, href: '#', color: 'hover:text-red-600' },
  ];

  return (
    <>
      <SEO
        title="About"
        description="Learn more about the author of this personal blog, their background, skills, and experiences in web development and programming."
        keywords={["about", "author", "developer", "programmer", "web development"]}
        url="/about"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-deep-blue mb-4">
                About Me
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Welcome to my personal blog! I'm a passionate developer who loves sharing knowledge 
                and experiences in the world of web development and programming.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold text-deep-blue mb-4">
                    Hello, I'm Alex Johnson
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    I'm a passionate full-stack developer with over 6 years of experience in building 
                    web applications and sharing technical knowledge. My journey in programming started 
                    with a curiosity about how websites work, and it has evolved into a career focused 
                    on creating elegant solutions to complex problems.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Through this blog, I aim to share my experiences, insights, and learnings in 
                    web development, programming best practices, and the ever-evolving tech landscape. 
                    I believe in the power of knowledge sharing and community building in the tech world.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-light-blue to-deep-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Code className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue">Full Stack Developer</h3>
                  <p className="text-gray-600">Technical Writer</p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-6 flex items-center">
                <Code className="h-6 w-6 mr-3 text-light-blue" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-light-blue hover:text-white transition-colors duration-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-light-blue" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-light-blue pl-6 pb-6 last:pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-deep-blue">{exp.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-light-blue font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Blogging Journey */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-light-blue" />
                My Blogging Journey
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="leading-relaxed mb-4">
                  I started this blog as a way to document my learning journey and share insights 
                  with the developer community. What began as personal notes has grown into a 
                  comprehensive resource for developers at all levels.
                </p>
                <p className="leading-relaxed mb-4">
                  My writing focuses on practical, real-world solutions to common development 
                  challenges. I believe in learning by doing, and my articles often include 
                  complete examples and step-by-step tutorials that you can follow along with.
                </p>
                <p className="leading-relaxed">
                  When I'm not coding or writing, you can find me contributing to open source 
                  projects, speaking at tech meetups, or mentoring junior developers. I'm 
                  passionate about building inclusive tech communities where everyone can learn 
                  and grow together.
                </p>
              </div>
            </section>

            {/* Connect */}
            <section className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-deep-blue mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-light-blue" />
                Let's Connect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                I'm always excited to connect with fellow developers, discuss interesting projects, 
                or collaborate on open source initiatives. Feel free to reach out through any of the 
                platforms below:
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200 ${link.color}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          </div>
        </main>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-light-blue to-deep-blue py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Whether you have a project idea, want to contribute to open source, 
              or just want to chat about tech, I'd love to hear from you!
            </p>
            <Link
              to="mailto:hello@example.com"
              className="inline-flex items-center space-x-2 bg-white text-deep-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;