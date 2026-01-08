'use client'

import { motion } from 'framer-motion'

const contact = {
  name: 'Rayyan Abhram',
  email: 'rayyanabhram@gmail.com',
  phone: '+44 7949491556',
}

const experience = [
  {
    role: 'Software Engineer',
    company: 'Cedar Labs - London, UK',
    timeframe: 'Sep 2025 - Dec 2025',
    summary:
      'Contract role. Built an automated competitor-intelligence pipeline for Amazon marketplaces. Developed a robust data-capture scraper to extract structured product and pricing signals at scale, normalised and validated the dataset, and pushed outputs into a dashboard for brand-specific analysis. Integrated an LLM backend (GPT-4.1 Nano) to classify listings and generate comparable insights across competitor sets.',
  },
  {
    role: 'Hardware Engineer Intern',
    company: 'Fiddlie Technologies - London, UK',
    timeframe: 'May 2024 - Aug 2025',
    summary:
      'Turned novel concepts into real hardware - using Altium Designer to take circuits from schematics to fabricated rigid/flex PCBs, then validating prototypes through hands-on testing and debugging. Built and wrote (embedded) firmware to integrate and deploy peripherals, and modelled components in Fusion 360 to iterate rapidly using CNC and SLA/FDM 3D printing.',
  },
  {
    role: 'Low Voltage Systems Engineer',
    company: 'QMFS - London, UK',
    timeframe: 'Sep 2023 - Jun 2024',
    summary:
      'Led low-voltage safety electronics for the QMFS electric vehicle team, directed two safety system designs, and helped secure a 4th-place national finish. Designed a FET-switched brake-light PCB and a brake/throttle plausibility device using comparator-based logic to prevent unsafe states.',
  },
  {
    role: 'Research Associate',
    company: 'Multi-Modal Human Interaction Lab - London, UK',
    timeframe: 'Oct 2023 - May 2024',
    summary:
      'Developed a soft-robotic EEG platform with adaptive electrode positioning using closed-loop pneumatic control. Fabricated 20+ Ecoflex 30 actuators and built a Python control system for sensor feedback, valve actuation, and real-time adaptation.',
  },
  {
    role: 'Founding Board Member',
    company: 'QMCUR - London, UK',
    timeframe: 'Oct 2023 - May 2024',
    summary:
      'Co-founded the Queen Mary Center for Undergraduate Research to give students a cross-faculty platform for student-led work. Organized campus-wide events and outreach that grew participation to 80+ students and built partnerships that expanded research opportunities.',
  },
  {
    role: 'Retail Assistant',
    company: 'O2 / Virgin Media - London, UK',
    timeframe: 'Jul 2023 - Sep 2023',
    summary:
      'Retail Assistant at Virgin Media / O2 (formerly Onnitt franchise), Tottenham Court Road branch. Supported customers in selecting value-added mobile plans, resolved queries and issues, provided troubleshooting support, and maintained accurate stockroom organisation.',
  },
  {
    role: 'Technical Consultant (Internship)',
    company: 'Liberty Communications - London, UK',
    timeframe: 'Feb 2023 - Apr 2023',
    summary:
      'Technical Consultancy Intern - worked with Liberty Communications to develop a UK market-entry and integration strategy for European startups. Delivered SWOT and PESTLE analyses, evaluated technical characteristics against relevant regulatory requirements, and researched market trends to inform strategic recommendations.',
  },
  {
    role: 'Dental Assistant',
    company: 'Eyespy Eye & Dental Care - London, UK',
    timeframe: 'May 2022 - Sep 2022',
    summary:
      'Supported the lead dentist and hygienist across routine and advanced appointments. Completed patient charting, prepared and set up procedures, assisted chairside during treatment, and handled pre-screening. Prepared appointment materials (impression trays, casting and bonding supplies, composite/etch systems, and sterilised instrument kits). Assisted in multiple procedures including prophylaxis, composite bonding, tooth whitening, X-Ray capture and Invisalign consultations.',
  },
  {
    role: 'Dispensing Optician',
    company: 'Eyespy Eye & Dental Care - London, UK',
    timeframe: 'Feb 2016 - Aug 2020',
    summary:
      'Managed the store independently and held key-holder responsibilities. Fit, adjusted, and repaired optical frames; captured core measurements (PD, varifocal and bifocal requirements); and supported basic screening (e.g., blind spot checks). Recorded prescriptions, cut lenses in-house using a lens-edging machine, outlining the frame shape, setting centration/alignment, edging to size, and mounting lenses into frames with final fit checks.',
  },
]

const education = [
  {
    title: 'BEng Robotics Engineering (First Class)',
    institution: 'Queen Mary University of London',
    timeframe: '2022 - 2025',
  },
  {
    title: 'Diploma: Dental Medicine',
    institution: 'Plovdiv Medical University',
    timeframe: '2020 - 2022',
  },
]

const skills = [
  {
    category: 'Programming Languages',
    items: ['C', 'C++', 'Python', 'Rust', 'JavaScript'],
  },
  {
    category: 'Libraries and Frameworks',
    items: ['Pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'Zephyr RTOS', 'LVGL', 'QMK'],
  },
  {
    category: 'Software',
    items: ['Altium Designer', 'KiCad', 'Fusion 360', 'OnShape', 'Creo', 'Visual Studio', 'GitHub'],
  },
  {
    category: 'Hardware and Tools',
    items: ['ESP32', 'NRF52', 'STM32 SoCs', 'SMD reflow soldering', 'SWD/JTAG'],
  },
  {
    category: 'Prototyping',
    items: ['FDM / SLA 3D printing', 'CNC machining', 'Silicone casting', 'Vacuum casting'],
  },
  {
    category: 'IT',
    items: ['Microsoft Office', 'LaTeX', 'MATLAB'],
  },
]

export default function Resume() {
  return (
    <section id="resume" className="pt-12 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/cv/rayyan-abhram-cv.pdf"
              download
              className="notion-button notion-button-primary"
            >
              Download resume PDF
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.role} className="notion-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-stone-900">{item.role}</h3>
                    <span className="text-sm text-stone-500">{item.timeframe}</span>
                  </div>
                  <p className="text-stone-600 mt-1 text-sm">{item.company}</p>
                  <p className="mt-3 text-stone-600 text-sm leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="notion-card p-6">
                <h3 className="text-lg font-semibold text-stone-900">Education</h3>
                <div className="mt-4 space-y-4">
                  {education.map((item) => (
                    <div key={item.title}>
                      <p className="text-stone-900 font-medium">{item.title}</p>
                      <p className="text-stone-500 text-sm">{item.institution}</p>
                      <p className="text-stone-400 text-xs">{item.timeframe}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="notion-card p-6">
                <h3 className="text-lg font-semibold text-stone-900">Skills</h3>
                <div className="mt-4 space-y-4">
                  {skills.map((group) => (
                    <div key={group.category}>
                      <p className="text-sm font-semibold text-stone-700">{group.category}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-black/5 text-stone-700 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
