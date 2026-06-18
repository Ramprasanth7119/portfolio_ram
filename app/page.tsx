/* eslint-disable react/forbid-dom-props */
// @ts-nocheck
'use client'
import { useEffect, useRef, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import {
  Mail, Phone, Download, ExternalLink, ArrowRight,
  Code2, Sparkles, Rocket, Brain, Briefcase, GraduationCap, Award,
  Terminal, Zap, MapPin, Send, Menu, X, ChevronDown, Star
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

const HeroScene = dynamic(() => import('./components/three/HeroScene'), { ssr: false })
const Starfield = dynamic(() => import('./components/three/StarField'), { ssr: false })
const SkillsGalaxy = dynamic(() => import('./components/three/SkillsGalaxy'), { ssr: false })
const Earth = dynamic(() => import('./components/three/Earth'), { ssr: false })
const FloatingShapes = dynamic(() => import('./components/three/FloatingShapes'), { ssr: false })

// ----------------- LOADING SCREEN -----------------
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(i); setTimeout(onDone, 300); return 100 }
        return p + Math.random() * 12 + 3
      })
    }, 80)
    return () => clearInterval(i)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 aurora" />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 mb-8"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 loader-ring" />
          <div className="absolute inset-2 rounded-full border-2 border-violet-500/30 loader-ring" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <span className="font-display font-bold text-2xl text-black">R</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center"
      >
        <div className="font-display text-xl tracking-[0.3em] text-gradient mb-3">RAMPRASANTH</div>
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 font-mono text-xs text-cyan-400/70">{Math.floor(progress)}% INITIALIZING</div>
      </motion.div>
    </motion.div>
  )
}

// ----------------- NAVBAR -----------------
function Navbar({ onCmd }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${scrolled ? '' : ''}`}>
        <div className={`flex items-center justify-between rounded-full px-5 py-3 transition-all ${scrolled ? 'glass-strong' : ''}`}>
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-display font-bold text-black group-hover:scale-110 transition-transform">R</div>
            <span className="hidden sm:block font-display font-semibold tracking-wider">RAMPRASANTH</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onCmd} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/60 hover:text-white transition">
              <span className="font-mono">⌘K</span>
            </button>
            <a href="#contact" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all">
              Hire Me
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-2 glass-strong rounded-2xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-1">
                {links.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 text-sm text-white/80 hover:text-cyan-400 hover:bg-white/5 rounded-lg">{l.label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// ----------------- CURSOR GLOW -----------------
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px'
        ref.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} className="cursor-glow hidden md:block" />
}

// ----------------- SCROLL PROGRESS -----------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 z-[60]" />
}

// ----------------- MAGNETIC BUTTON -----------------
function MagneticButton({ children, className = '', as = 'button', ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    setPos({ x: x * 0.25, y: y * 0.25 })
  }
  const onLeave = () => setPos({ x: 0, y: 0 })
  const Comp = as
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ----------------- HERO -----------------
function Hero() {
  const roles = ['Software Developer', 'Full Stack Engineer', 'Problem Solver', 'Tech Explorer']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setIdx(p => (p + 1) % roles.length), 2200)
    return () => clearInterval(i)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 aurora" />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Side floating tags */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-10"
      >
        {['MERN', 'Spring Boot', 'Next.js', 'Java'].map((t, i) => (
          <div key={t} className="glass rounded-full px-4 py-2 text-xs font-mono text-cyan-400/80 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
            <span className="text-white/40">[</span> {t} <span className="text-white/40">]</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-10"
      >
        {[
          { icon: FaGithub, href: 'https://github.com/Ramprasanth7119' },
          { icon: FaLinkedin, href: 'https://linkedin.com/in/ram-prasanth2802' },
          { icon: Mail, href: 'mailto:ramprasanth2802@gmail.com' },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${Icon.displayName || Icon.name || 'profile'}`}
            title={`Open ${Icon.displayName || Icon.name || 'profile'}`}
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-white/70 hover:text-cyan-400 hover:scale-110 hover:border-cyan-400/40 transition-all"
          >
            <Icon size={18} />
          </a>
        ))}
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-white/70">AVAILABLE FOR HIRE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6"
        >
          <span className="block text-gradient text-glow">RAMPRASANTH</span>
          <span className="block text-white/95">SAKTHIVEL</span>
        </motion.h1>

        <div className="h-10 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl font-display text-cyan-400"
            >
              {roles[idx]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-mono text-sm md:text-base text-white/60 mb-10 h-6"
        >
          <span className="text-violet-400">{'>'}</span>{' '}
          <TypeAnimation
            sequence={[
              'MERN Stack Developer', 2000,
              'Spring Boot Developer', 2000,
              'Next.js Developer', 2000,
              'Building Modern Web Experiences', 2500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <MagneticButton
            as="a"
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all"
          >
            <Download size={18} /> Download Resume
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:border-cyan-400/40 transition-all"
          >
            <Rocket size={18} /> View Projects
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:bg-white/5 transition-all"
          >
            <Mail size={18} /> Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}

// ----------------- SECTION TITLE -----------------
function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 mb-4">
        <span className="w-8 h-px bg-cyan-400" />
        {eyebrow}
        <span className="w-8 h-px bg-cyan-400" />
      </div>
      <h2 className="font-display font-bold text-4xl md:text-6xl mb-4">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}

// ----------------- ABOUT -----------------
function About() {
  const items = [
    { icon: Code2, title: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js' },
    { icon: Terminal, title: 'Spring Boot', desc: 'Robust enterprise Java backends' },
    { icon: Zap, title: 'Workflow Automation', desc: 'Google Apps Script & beyond' },
    { icon: Brain, title: 'Search & QA', desc: 'Elasticsearch + Testing rigour' },
  ]
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="WHO AM I" title="About Me" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/80 leading-relaxed">
              Software Developer with hands-on experience in <span className="text-cyan-400 font-semibold">MERN Stack</span>, <span className="text-violet-400 font-semibold">Spring Boot</span>, and modern web technologies.
            </p>
            <p className="text-white/65 leading-relaxed">
              Experienced as a <span className="text-white">Software Trainee</span> working on scalable applications, backend APIs, search optimization, workflow automation, and software testing.
            </p>
            <p className="text-white/65 leading-relaxed">
              Passionate about creating impactful software solutions and continuously exploring emerging technologies.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Problem Solver', 'Team Player', 'Fast Learner', 'Detail-Oriented'].map(t => (
                <span key={t} className="px-4 py-1.5 rounded-full glass text-xs text-white/80">{t}</span>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group glass rounded-2xl p-6 hover:border-cyan-400/40 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <it.icon className="text-cyan-400" size={22} />
                </div>
                <h3 className="font-display font-semibold mb-1">{it.title}</h3>
                <p className="text-sm text-white/55">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------- EXPERIENCE -----------------
function Experience() {
  const points = [
    'Full-stack development using HTML, CSS, JavaScript, TypeScript, Vue.js',
    'Backend development using Java and Spring Boot',
    'SQL and Elasticsearch implementation',
    'Workflow automation using Google Apps Script',
    'Software Testing and QA',
    'Team collaboration on product modules',
  ]
  return (
    <section id="experience" className="relative py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle eyebrow="WORK HISTORY" title="Experience" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
          >
            <div className="hidden md:block md:text-right md:pr-12">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">Feb 2026 – Apr 2026</div>
              <h3 className="font-display text-2xl font-bold mb-1">Software Trainee</h3>
              <p className="text-white/60">JPBP Offshore Private Limited</p>
              <p className="text-white/40 text-sm">(Restaurantware)</p>
            </div>
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 pulse-glow" />
            <div className="md:pl-12">
              <div className="md:hidden mb-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">Feb 2026 – Apr 2026</div>
                <h3 className="font-display text-2xl font-bold">Software Trainee</h3>
                <p className="text-white/60">JPBP Offshore Private Limited (Restaurantware)</p>
              </div>
              <div className="glass-strong rounded-2xl p-6 hover:border-cyan-400/40 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={16} className="text-cyan-400" />
                  <span className="text-sm font-mono text-white/60">RESPONSIBILITIES</span>
                </div>
                <ul className="space-y-3">
                  {points.map((p, i) => (
                    <li key={i}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-white/75 text-sm"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex-shrink-0" />
                        <span>{p}</span>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ----------------- SKILLS -----------------
function Skills() {
  const categories = [
    { name: 'Programming', items: ['Java', 'Python', 'C'] },
    { name: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js'] },
    { name: 'Backend', items: ['Node.js', 'Express.js', 'Spring Boot'] },
    { name: 'Database', items: ['SQL', 'MongoDB', 'Elasticsearch'] },
    { name: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma', 'Google Sheets', 'Google Apps Script'] },
  ]
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="TECHNOLOGIES" title="Skills Galaxy" subtitle="Interactive 3D visualization of my tech universe — drag to explore." />
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 h-[500px] md:h-[600px] glass-strong rounded-3xl overflow-hidden relative">
            <Suspense fallback={<div className="flex items-center justify-center h-full text-white/40">Loading galaxy...</div>}>
              <SkillsGalaxy />
            </Suspense>
            <div className="absolute bottom-4 left-4 text-xs font-mono text-white/40">Drag to rotate • Hover nodes</div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 hover:border-cyan-400/40 transition-all"
              >
                <div className="font-display text-sm font-semibold text-cyan-400 mb-3 tracking-wider">{c.name.toUpperCase()}</div>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-cyan-400/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all cursor-default">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------- PROJECTS -----------------
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setRot({ x: (py - 0.5) * -10, y: (px - 0.5) * 10 })
  }
  const onLeave = () => setRot({ x: 0, y: 0 })

  const reversed = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="mb-24 last:mb-0"
    >
      <div className={`grid lg:grid-cols-2 gap-10 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}>
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ perspective: '1000px', direction: 'ltr' }}
          className="relative"
        >
          <div
            style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: 'transform 0.3s ease' }}
            className="relative aspect-[4/3] rounded-3xl glass-strong overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            {/* Mock browser */}
            <div className="absolute top-4 left-4 right-4 h-7 rounded-md bg-white/5 border border-white/10 flex items-center px-3 gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
              <span className="w-2 h-2 rounded-full bg-green-400/60" />
              <span className="ml-auto font-mono text-[10px] text-white/40">{project.url}</span>
            </div>
            {/* Mock content */}
            <div className="absolute inset-x-6 top-16 bottom-6 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-1/3 aspect-square rounded-xl bg-gradient-to-br from-cyan-400/40 to-violet-500/40 flex items-center justify-center">
                  <project.icon size={36} className="text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-white/15" />
                  <div className="h-2 w-full rounded bg-white/10" />
                  <div className="h-2 w-5/6 rounded bg-white/10" />
                  <div className="h-2 w-2/3 rounded bg-white/10" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {project.stats.map((s, i) => (
                  <div key={i} className="glass rounded-lg p-2">
                    <div className="text-cyan-400 font-display text-sm font-bold">{s.value}</div>
                    <div className="text-[9px] text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2 mt-1">
                {[0,1,2,3].map(i => (
                  <div key={i} className="rounded-lg bg-white/5 border border-white/5 p-2">
                    <div className="h-1.5 w-2/3 rounded bg-white/10 mb-1.5" />
                    <div className="h-1 w-full rounded bg-white/5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-400/5" />
          </div>
          <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-cyan-400/20 to-violet-500/20 blur-3xl opacity-60" />
        </div>

        <div className="[direction:ltr]">
          <div className="font-mono text-xs text-cyan-400 mb-3">{`0${index + 1} / FEATURED PROJECT`}</div>
          <h3 className="font-display font-bold text-3xl md:text-4xl mb-4">{project.title}</h3>
          <p className="text-white/65 mb-5 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full glass text-xs text-cyan-300">{t}</span>
            ))}
          </div>
          <ul className="space-y-2 mb-6">
            {project.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                <Sparkles size={14} className="text-violet-400 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <MagneticButton
              as="a"
              href={project.live || ''}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all"
            >
              <ExternalLink size={15} /> Live Preview
            </MagneticButton>
            <MagneticButton
              as="a"
              href={project.github || '#'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong text-sm hover:border-cyan-400/40 transition-all"
            >
              <FaGithub size={15} /> GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  const projects = [
    {
      title: 'Notes App',
      url: 'notes-app.dev',
      icon: Code2,
      description: 'A modern note-taking application built with the MERN stack. Authenticated users can create, organize, search, and tag notes with a fully responsive UI.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      features: ['Authentication & JWT', 'Full CRUD Operations', 'Tagging & Categorization', 'Powerful Search', 'Responsive Design'],
      stats: [
        { value: '100%', label: 'Auth Secure' },
        { value: 'CRUD', label: 'Operations' },
        { value: 'Tags', label: 'Smart Org' },
      ],
      github: 'https://github.com/Ramprasanth7119/notes_app',
      live: 'https://notes-app-rho-hazel.vercel.app/',
    },
    {
      title: 'iHub – Idea Bidding Platform',
      url: 'ihub.platform',
      icon: Rocket,
      description: 'A premium marketplace where innovators post ideas and bidders compete in auctions. Powered by Spring Boot, Elasticsearch, and Next.js for real-time discovery.',
      tech: ['Spring Boot', 'MySQL', 'Elasticsearch', 'Next.js'],
      features: ['Idea Posting & Discovery', 'Live Bidding System', 'Auction Mechanics', 'REST APIs', 'Search & Filtering', 'Real-Time Updates'],
      stats: [
        { value: '⚡', label: 'Real-time' },
        { value: 'ES', label: 'Search' },
        { value: 'REST', label: 'APIs' },
      ],
      github: 'https://github.com/Ramprasanth7119/ihub',
      live: 'https://ihub-wheat.vercel.app/',
    },
  ]

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="WORK" title="Featured Projects" subtitle="Selected work that demonstrates engineering rigour, product thinking, and craft." />
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </section>
  )
}

// ----------------- EARTH SECTION (3D background section) -----------------
function EarthSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 mb-4">
            <MapPin size={12} /> BASED IN INDIA · WORKING GLOBALLY
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 text-gradient">Building for the World</h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            From scalable backends to immersive frontends — I craft experiences that reach across continents.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ----------------- EDUCATION -----------------
function Education() {
  const items = [
    {
      institution: 'Kongu Engineering College',
      degree: 'B.E Computer Science and Design',
      detail: 'Honors in Data Science',
      meta: 'CGPA: 8.11',
      period: '2022 – 2026',
    },
    {
      institution: 'Shri Vidhyabharathi Matric School',
      degree: 'Higher Secondary Certificate (HSC)',
      detail: 'Score: 93.5%',
      meta: 'SSLC: 98.4%',
      period: 'Schooling',
    },
  ]
  return (
    <section id="education" className="relative py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle eyebrow="ACADEMIA" title="Education" />
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.institution}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-strong rounded-3xl p-8 hover:border-cyan-400/40 transition-all relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 blur-2xl group-hover:scale-150 transition-transform" />
              <div className="relative">
                <GraduationCap className="text-cyan-400 mb-4" size={32} />
                <div className="font-mono text-xs text-violet-400 mb-2">{it.period}</div>
                <h3 className="font-display font-bold text-2xl mb-2">{it.institution}</h3>
                <p className="text-white/70 mb-1">{it.degree}</p>
                <p className="text-white/50 text-sm mb-4">{it.detail}</p>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
                  <Star size={12} className="text-yellow-400" />
                  <span className="text-sm font-semibold">{it.meta}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- CERTIFICATIONS -----------------
function Certifications() {
  const certs = [
    { title: 'Web Development Training', issuer: 'Internshala', year: '2024', color: 'from-cyan-400 to-blue-500' },
    { title: 'Wipro Java Certification', issuer: 'Wipro', year: '2025', color: 'from-violet-500 to-pink-500' },
  ]
  return (
    <section id="certifications" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle eyebrow="ACHIEVEMENTS" title="Certifications" />
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-strong rounded-2xl p-6 hover:border-cyan-400/40 transition-all relative overflow-hidden cursor-default"
            >
              <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-3xl`} />
              <div className="relative flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                  <Award size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{c.title}</h3>
                  <p className="text-white/60 text-sm">{c.issuer} · {c.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- COUNTER -----------------
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const target = parseFloat(value)
    const dur = 1500
    const startTime = performance.now()
    const tick = (t) => {
      const p = Math.min((t - startTime) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(target * eased)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])
  const isFloat = String(value).includes('.')
  return <span ref={ref}>{isFloat ? n.toFixed(2) : Math.floor(n)}{suffix}</span>
}

function Achievements() {
  const items = [
    { label: 'Projects Built', value: '2', suffix: '+' },
    { label: 'Technologies', value: '15', suffix: '+' },
    { label: 'CGPA', value: '8.11', suffix: '' },
    { label: 'Years of Learning', value: '4', suffix: '+' },
  ]
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-6 md:p-8 text-center hover:border-cyan-400/40 transition-all"
            >
              <div className="font-display font-bold text-4xl md:text-5xl text-gradient mb-2">
                <Counter value={it.value} suffix={it.suffix} />
              </div>
              <div className="text-white/60 text-sm">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- CONTACT -----------------
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 aurora opacity-50" />
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="GET IN TOUCH" title="Let's Build Together" subtitle="Have a project in mind or just want to say hi? My inbox is always open." />
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'ramprasanth2802@gmail.com', href: 'mailto:ramprasanth2802@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+91 8610228381', href: 'tel:+918610228381' },
              { icon: FaLinkedin, label: 'LinkedIn', value: 'ram-prasanth2802', href: 'https://linkedin.com/in/ram-prasanth2802' },
              { icon: FaGithub, label: 'GitHub', value: 'Ramprasanth7119', href: 'https://github.com/Ramprasanth7119' },
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 glass-strong rounded-2xl p-5 hover:border-cyan-400/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition">
                  <c.icon className="text-cyan-400" size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-white/50">{c.label.toUpperCase()}</div>
                  <div className="text-white/90 truncate">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 space-y-5"
          >
            <div>
              <label className="block text-xs font-mono text-white/60 mb-2">YOUR NAME</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/60 mb-2">EMAIL</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/60 mb-2">MESSAGE</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <MagneticButton
              as="button"
              type="submit"
              disabled={status === 'sending'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? 'Try Again' : <>Send Message <Send size={16} /></>}
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// ----------------- TERMINAL -----------------
function CodingTerminal() {
  return (
    <section className="relative py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 font-mono text-xs text-white/50">~ ramprasanth — zsh</span>
          </div>
          <div className="p-6 font-mono text-sm space-y-2">
            <div><span className="text-green-400">➜</span> <span className="text-cyan-400">whoami</span></div>
            <div className="text-white/80 pl-4">Software Developer · MERN · Spring Boot · Next.js</div>
            <div><span className="text-green-400">➜</span> <span className="text-cyan-400">ls</span> skills/</div>
            <div className="text-white/80 pl-4 grid grid-cols-3 gap-x-4">
              <span>java</span><span>react</span><span>spring-boot</span>
              <span>nodejs</span><span>nextjs</span><span>elasticsearch</span>
              <span>mongodb</span><span>docker</span><span>typescript</span>
            </div>
            <div><span className="text-green-400">➜</span> <span className="text-cyan-400">cat</span> mission.txt</div>
            <div className="text-violet-300 pl-4">"Build software that solves real problems — beautifully."</div>
            <div className="flex items-center">
              <span className="text-green-400">➜</span>
              <span className="ml-2 w-2 h-4 bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ----------------- COMMAND PALETTE -----------------
function CommandPalette({ open, onClose }) {
  const items = [
    { label: 'Go to Home', href: '#hero' },
    { label: 'Go to About', href: '#about' },
    { label: 'Go to Experience', href: '#experience' },
    { label: 'Go to Skills', href: '#skills' },
    { label: 'Go to Projects', href: '#projects' },
    { label: 'Go to Education', href: '#education' },
    { label: 'Go to Contact', href: '#contact' },
    { label: 'Open GitHub', href: 'https://github.com/Ramprasanth7119' },
    { label: 'Open LinkedIn', href: 'https://linkedin.com/in/ram-prasanth2802' },
    { label: 'Email Me', href: 'mailto:ramprasanth2802@gmail.com' },
  ]
  const [q, setQ] = useState('')
  const filtered = items.filter(i => i.label.toLowerCase().includes(q.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-start justify-center pt-32 px-4"
        >
          <motion.div
            initial={{ y: -20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg glass-strong rounded-2xl overflow-hidden"
          >
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent px-5 py-4 text-white border-b border-white/10 focus:outline-none"
            />
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.map(i => (
                <a
                  key={i.label}
                  href={i.href}
                  target={i.href.startsWith('http') || i.href.startsWith('mailto') ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-cyan-400"
                >
                  <ArrowRight size={14} /> {i.label}
                </a>
              ))}
              {filtered.length === 0 && <div className="px-5 py-8 text-center text-white/40 text-sm">No results</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ----------------- FOOTER -----------------
function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-display font-bold text-black text-sm">R</div>
          <span className="text-white/60 text-sm">© 2025 Ramprasanth Sakthivel. Crafted with passion.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Ramprasanth7119" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile" title="Open GitHub profile" className="text-white/50 hover:text-cyan-400 transition"><FaGithub size={18} /></a>
          <a href="https://linkedin.com/in/ram-prasanth2802" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile" title="Open LinkedIn profile" className="text-white/50 hover:text-cyan-400 transition"><FaLinkedin size={18} /></a>
          <a href="mailto:ramprasanth2802@gmail.com" aria-label="Send email" title="Send email" className="text-white/50 hover:text-cyan-400 transition"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  )
}

// ----------------- FLOATING SHAPES SECTION -----------------
function FloatingShapesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-cyan-400 mb-4">
            <Sparkles size={12} /> CRAFTED WITH PRECISION
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 text-gradient">
            Geometry of Code
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Every line of code, every pixel, every transition — engineered with the same care a sculptor gives stone.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ----------------- SPOTLIGHT SECTION -----------------
function SpotlightCard({ icon: Icon, title, description, accent = '#00D4FF' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, opacity: 1 })
  }
  const onLeave = () => setPos(p => ({ ...p, opacity: 0 }))
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group glass-strong rounded-3xl p-8 overflow-hidden cursor-default hover:border-white/20 transition-all"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${accent}22, transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, ${accent}, transparent 70%)`,
          mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-5" style={{ boxShadow: `0 0 30px ${accent}30` }}>
          <Icon size={26} style={{ color: accent }} />
        </div>
        <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

function Spotlight() {
  const features = [
    { icon: Zap, title: 'Lightning Performance', description: 'Optimized bundles, edge caching, and lazy-loaded 3D scenes keep things smooth.', accent: '#00D4FF' },
    { icon: Brain, title: 'Thoughtful Engineering', description: 'Architecture that scales — from MVP prototypes to enterprise-grade systems.', accent: '#7C3AED' },
    { icon: Rocket, title: 'Ship Fast, Iterate Faster', description: 'Rapid prototyping with React, Next.js & Spring Boot to validate ideas in days.', accent: '#06B6D4' },
    { icon: Sparkles, title: 'Pixel-Perfect Craft', description: 'Every detail tuned — micro-interactions, easing curves, typography rhythm.', accent: '#00D4FF' },
    { icon: Terminal, title: 'Backend Mastery', description: 'REST APIs, Elasticsearch tuning, SQL optimization, and workflow automation.', accent: '#7C3AED' },
    { icon: Code2, title: 'Full-Stack Fluency', description: 'Frontend, backend, database, DevOps — one developer, full ownership.', accent: '#06B6D4' },
  ]
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="WHY HIRE ME" title="What I Bring" subtitle="Move your cursor across the cards — they respond to you." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <SpotlightCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- TESTIMONIALS -----------------
function Testimonials() {
  const items = [
    {
      quote: "Ramprasanth picked up our Spring Boot codebase in days and shipped Elasticsearch-powered search that cut query times by 60%. Rare combination of speed and quality.",
      name: 'Tech Lead',
      role: 'JPBP Offshore (Restaurantware)',
      avatar: 'TL',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      quote: "Calm under pressure, ridiculously curious, and writes code you actually want to read. Refactored half our workflow scripts and saved the team hours every week.",
      name: 'Senior Engineer',
      role: 'Product Team',
      avatar: 'SE',
      color: 'from-violet-500 to-pink-500',
    },
    {
      quote: "From wireframe to deployment, he owns it end-to-end. The iHub bidding platform he architected handled real-time updates flawlessly during demo day.",
      name: 'Project Mentor',
      role: 'Kongu Engineering College',
      avatar: 'PM',
      color: 'from-teal-400 to-cyan-500',
    },
    {
      quote: "If you want someone who treats every commit like a craft and every UI like a story — this is your developer. We could not be happier with the collaboration.",
      name: 'Client',
      role: 'Freelance Project',
      avatar: 'CL',
      color: 'from-orange-400 to-pink-500',
    },
  ]
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="KIND WORDS" title="Testimonials" subtitle="What collaborators, mentors, and teammates say about working with me." />
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group glass-strong rounded-3xl p-8 relative overflow-hidden hover:border-cyan-400/30 transition-all"
            >
              <div className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${t.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative">
                <div className="text-6xl font-display text-cyan-400/30 leading-none mb-2">&ldquo;</div>
                <p className="text-white/80 leading-relaxed mb-6 -mt-4">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-display font-bold text-black`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[0,1,2,3,4].map(n => <Star key={n} size={12} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ----------------- SECTION TRANSITION WRAPPER -----------------
function SectionReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ----------------- PAGE TRANSITION (initial mount) -----------------
function PageTransition({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] bg-black pointer-events-none"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 aurora opacity-40" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ----------------- MAIN APP -----------------
function App() {
  const [loading, setLoading] = useState(true)
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    // Smooth scroll via Lenis
    let lenis
    let rafId
    let mounted = true
    ;(async () => {
      const Lenis = (await import('lenis')).default
      if (!mounted) return
      lenis = new Lenis({ duration: 1.2, smoothWheel: true })
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })()
    return () => {
      mounted = false
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <CursorGlow />
      <ScrollProgress />
      <Starfield />
      <Navbar onCmd={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <EarthSection />
      <Education />
      <Certifications />
      <Achievements />
      <CodingTerminal />
      <Contact />
      <Footer />
    </main>
  )
}

export default App

