"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline()

      // Animate name with stagger effect
      if (nameRef.current) {
        const line1 = nameRef.current.querySelector('.name-line-1')
        const line2 = nameRef.current.querySelector('.name-line-2')
        
        if (line1) {
          const chars1 = line1.textContent?.split("") || []
          line1.innerHTML = chars1
            .map((char) => (char === " " ? " " : `<span class="inline-block">${char}</span>`))
            .join("")
        }
        
        if (line2) {
          const chars2 = line2.textContent?.split("") || []
          line2.innerHTML = chars2
            .map((char) => (char === " " ? " " : `<span class="inline-block">${char}</span>`))
            .join("")
        }

        tl.from(nameRef.current.querySelectorAll("span"), {
          duration: 0.8,
          y: 100,
          opacity: 0,
          stagger: 0.05,
          ease: "power3.out",
        })
      }

      // Animate description
      tl.from(
        descriptionRef.current,
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.3",
      )

      // Animate sections on scroll
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(
            section,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                onEnter: () => setActiveSection(section.id),
                onEnterBack: () => setActiveSection(section.id),
              },
            },
          )
        }
      })

      // Floating animation for skills
      gsap.to(".skill-tag", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative" ref={heroRef}>
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 ref={nameRef} className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  <span className="name-line-1">M. Tayyab</span>
                  <br />
                  <span className="name-line-2">Paracha</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p ref={descriptionRef} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Senior Software Engineer with 5+ years of experience crafting scalable solutions at the intersection
                  of
                  <span className="text-foreground"> Python frameworks</span>,
                  <span className="text-foreground"> React</span>, and
                  <span className="text-foreground"> cloud technologies</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Islamabad, Pakistan</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Senior Software Engineer</div>
                  <div className="text-muted-foreground">@ Devsinc</div>
                  <div className="text-xs text-muted-foreground">March 2022 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Django", "React", "FastAPI", "AWS"].map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2019 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2022",
                  role: "Senior Software Engineer",
                  company: "Devsinc",
                  description:
                    "Managed a team of 5+ developers, successfully delivered solutions for 4 enterprise clients. Developed back-end functionality using Python frameworks and crafted front-end using React.JS.",
                  tech: ["Python", "Django", "React", "AWS", "PostgreSQL"],
                },
                {
                  year: "2019",
                  role: "Software Engineer",
                  company: "Freelance",
                  description:
                    "Managed and delivered multiple web application projects with experience in both Django and Flask, demonstrating versatility as required.",
                  tech: ["Django", "Flask", "PostgreSQL", "MongoDB"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Supply Chain Management Portal",
                  excerpt:
                    "Built with Python and React, streamlines operations across suppliers, vendors, quotations, and locations using AWS Amplify and CloudFormation.",
                  tech: ["Python", "React", "AWS", "Lambda"],
                },
                {
                  title: "Live Interpretation & AI Speech Translation",
                  excerpt:
                    "Architected a scalable real-time translation platform leveraging WebSocket technology and multiple AI services for seamless multilingual communications.",
                  tech: ["FastAPI", "WebSocket", "Azure", "ChatGPT API"],
                },
                {
                  title: "SmartEnergy Analytics Platform",
                  excerpt:
                    "Implemented pollers in Python to collect and process data across organizations, integrating MQTT and SFTP protocols for real-time insights.",
                  tech: ["Python", "MQTT", "SFTP", "Machine Learning"],
                },
                {
                  title: "Window Fashion Aggregation Platform",
                  excerpt:
                    "Engineered a high-performance platform processing data from 70+ e-commerce sources, serving thousands of monthly active users.",
                  tech: ["DynamoDB", "Scrapy", "Selenium", "Flask"],
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{project.excerpt}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground border border-border rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>View details</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and
                  software engineering.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:mtayyabp@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">mtayyabp@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", handle: "tayyab-paracha", url: "https://linkedin.com/in/tayyab-paracha/" },
                  { name: "GitHub", handle: "@tayyabparacha", url: "https://github.com/tayyabparacha" },
                  { name: "Email", handle: "mtayyabp@gmail.com", url: "mailto:mtayyabp@gmail.com" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 M. Tayyab Paracha. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with ❤️ by <a href="https://www.junaidirfan.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-muted-foreground transition-colors duration-300">junaid</a></div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
