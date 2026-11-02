// ================= FLOATING NAV & SCROLL SPY
const floatingNavs = document.querySelectorAll('.floating__nav a')

const removeActiveClass = () => {
  floatingNavs.forEach(nav => {
    nav.classList.remove('active')
  })
}

floatingNavs.forEach(nav => {
  nav.addEventListener('click', () => {
    removeActiveClass();
    nav.classList.add('active')
  })
})

const sections = [
  { id: '', nav: floatingNavs[0], el: document.querySelector('header') },
  { id: '#resume', nav: floatingNavs[1], el: document.querySelector('#resume') },
  { id: '#projects', nav: floatingNavs[2], el: document.querySelector('#projects') },
  { id: '#faqs', nav: floatingNavs[3], el: document.querySelector('#faqs') },
  { id: '#contact', nav: floatingNavs[4], el: document.querySelector('#contact') }
];

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  let currentNav = floatingNavs[0];
  sections.forEach(sec => {
    if (sec.el && scrollPos >= sec.el.offsetTop) {
      currentNav = sec.nav;
    }
  });
  if (currentNav && !currentNav.classList.contains('active')) {
    removeActiveClass();
    currentNav.classList.add('active');
  }
}, { passive: true });










// ======================Resume 
const resumeRight = document.querySelector('.resume__right')

const experienceBtn = document.querySelector('.experience__btn')
const educationBtn = document.querySelector('.education__btn')
const certificatesBtn = document.querySelector('.certificates__btn')
const skillsBtn = document.querySelector('.skills__btn')
const aboutBtn = document.querySelector('.about__btn')

const resumeBtns = [experienceBtn, educationBtn, certificatesBtn, skillsBtn, aboutBtn]
const removeActiveResumeBtn = () => {
  resumeBtns.forEach(btn => {
    if (btn) btn.classList.remove('primary')
  })
}

// 1. Experience
const experienceContent = `
            <h4>Experience</h4>
                <p>
                    Skilled in full-stack web development, project management, and technical SEO—delivering scalable platforms end to end.
                </p>
                <ul>
                    <li>
                        <h6>Dec 2025 - Oct 2026</h6>
                        <h5>Head of Operations</h5>
                        <p>Ajalisco Production Industries LTD</p>
                    </li>
                    <li>
                        <h6>Mar 2024 - Nov 2025</h6>
                        <h5>Full Stack Developer | Project Lead</h5>
                        <p>Power Graph Systems</p>
                    </li>
                    <li>
                        <h6>Feb 2022 - Feb 2024</h6>
                        <h5>WordPress Developer</h5>
                        <p>Nichips Technology</p>
                    </li>
                </ul>
`

experienceBtn.addEventListener('click', () => {
    resumeRight.innerHTML = experienceContent;
    resumeRight.className = 'resume__right'
    removeActiveResumeBtn()
    experienceBtn.classList.add("primary")
})
// set experience content as default on page load
resumeRight.innerHTML = experienceContent;

// 2. Education
const educationContent = `<h4>Education</h4>
                <p>Solid academic foundation in engineering combined with specialized technical training in software and product design.</p>
                <ul>
                    <li>
                        <h6>2017 - 2023</h6>
                        <h5>University of Uyo</h5>
                        <p>
                            B.Eng in Mechanical Engineering &bull; Graduated with Second Class Honours (Upper Division), CGPA 4.03/5.0. Strong focus on analytical problem-solving and systems thinking.
                        </p>
                    </li>
                    <li>
                        <h6>2025 - 2026</h6>
                        <h5>NITDA &amp; BOF Tech Academy</h5>
                        <p>
                            Intensive professional training in UI/UX Product Design, Agile Workflow Systems, and Digital Workplace Collaboration.
                        </p>
                    </li>
                    <li>
                        <h6>2015</h6>
                        <h5>IBBIL ICT Academy</h5>
                        <p>
                            Diploma in Data Processing &amp; Computing. Built early mastery in relational databases, core web principles, and programming fundamentals.
                        </p>
                    </li>
                </ul>`
                
educationBtn.addEventListener('click', () => {
    resumeRight.innerHTML = educationContent;
    resumeRight.className = 'resume__right education'
    removeActiveResumeBtn()
    educationBtn.classList.add("primary")
})

// 3. Certificates
const certificatesContent = `<h4>Certifications</h4>
                <p>Verified professional certifications across UI/UX design, digital productivity, SEO, and global marketplace delivery.</p>
                <ul>
                    <li>
                        <h6>2026</h6>
                        <h5>UI/UX Design Certification</h5>
                        <p>
                            Building Opportunities for the Future (BOF) &amp; NITDA &bull; Cert ID: <strong>BOF-NITDA-CERT-2026-7D23C161</strong><br />
                            Wireframing, High-Fidelity Prototyping, User Research &amp; Figma Design Systems.
                        </p>
                    </li>
                    <li>
                        <h6>2026</h6>
                        <h5>Freelancing &amp; Global Digital Marketplace</h5>
                        <p>
                            Building Opportunities for the Future (BOF) &amp; NITDA &bull; Cert ID: <strong>BOF-NITDA-CERT-2026-8C6D8786</strong><br />
                            Client Management, Contract Execution &amp; Global Digital Marketplace Strategy.
                        </p>
                    </li>
                    <li>
                        <h6>2026</h6>
                        <h5>Productivity Tools Certification</h5>
                        <p>
                            Building Opportunities for the Future (BOF) &amp; NITDA &bull; Cert ID: <strong>BOF-NITDA-CERT-2026-4386E7E4</strong><br />
                            Notion, Trello, Google Workspace &amp; Agile Task Automation.
                        </p>
                    </li>
                    <li>
                        <h6>2025</h6>
                        <h5>Notion, Trello &amp; Acrobat Pro Essential Training</h5>
                        <p>
                            LinkedIn Learning &bull; Verified Digital Productivity &amp; Project Workflow Certification.
                        </p>
                    </li>
                    <li>
                        <h6>2022</h6>
                        <h5>The Fundamentals of Digital Marketing &amp; SEO</h5>
                        <p>
                            Google Digital Skills for Africa &bull; Certified in Technical SEO, Web Analytics &amp; Organic Search Optimization.
                        </p>
                    </li>
                    <li>
                        <h6>2015</h6>
                        <h5>Diploma in Data Processing &amp; Computing</h5>
                        <p>
                            IBBIL ICT Academy &bull; Distinction Grade in Database Management &amp; System Fundamentals.
                        </p>
                    </li>
                </ul>`

if (certificatesBtn) {
    certificatesBtn.addEventListener('click', () => {
        resumeRight.innerHTML = certificatesContent;
        resumeRight.className = 'resume__right certificates'
        removeActiveResumeBtn()
        certificatesBtn.classList.add("primary")
    })
}

// 4. Skills
const skillsContent = `<h4>Skills</h4>
                <p>Proficient in modern full-stack web engineering, UI/UX prototyping, CMS platforms, and database architecture.</p>
                <ul>
                    <li title="HTML5"><img src="./assets/html.webp" alt="HTML logo" width="36" height="36" loading="lazy"><span>HTML5</span></li>
                    <li title="JavaScript"><img src="./assets/javascript.webp" alt="JS logo" width="36" height="36" loading="lazy"><span>JavaScript</span></li>
                    <li title="React"><img src="./assets/react.webp" alt="React logo" width="36" height="36" loading="lazy"><span>React</span></li>
                    <li title="PHP"><img src="./assets/php.webp" alt="PHP logo" width="36" height="36" loading="lazy"><span>PHP</span></li>
                    <li title="Laravel"><img src="./assets/laravel.webp" alt="Laravel logo" width="36" height="36" loading="lazy"><span>Laravel</span></li>
                    <li title="WordPress"><img src="./assets/wordpress.webp" alt="Wordpress logo" width="36" height="36" loading="lazy"><span>WordPress</span></li>
                    <li title="SQLite"><img src="./assets/sqlite.webp" alt="SQLite logo" width="36" height="36" loading="lazy"><span>SQLite</span></li>
                    <li title="CSS3"><img src="./assets/css.webp" alt="CSS logo" width="36" height="36" loading="lazy"><span>CSS3</span></li>
                    <li title="Tailwind CSS"><img src="./assets/tailwind.webp" alt="Tailwind logo" width="36" height="36" loading="lazy"><span>Tailwind</span></li>
                    <li title="Webflow"><img src="./assets/webflow.webp" alt="Webflow logo" width="36" height="36" loading="lazy"><span>Webflow</span></li>
                    <li title="Figma"><img src="./assets/figma.webp" alt="Figma logo" width="36" height="36" loading="lazy"><span>Figma</span></li>
                    <li title="Canva"><img src="./assets/canva.webp" alt="Canva logo" width="36" height="36" loading="lazy"><span>Canva</span></li>
                </ul>`
                
skillsBtn.addEventListener('click', () => {
    resumeRight.innerHTML = skillsContent;
    resumeRight.className = 'resume__right skills'
    removeActiveResumeBtn()
    skillsBtn.classList.add("primary")
})

// 5. About me 
const aboutContent = `<h4>About me</h4>
                <p>Passionate Web Developer, UI/UX Designer &amp; SEO Specialist, crafting optimized, engaging, and high-performing digital experiences with precision.</p>
                <ul>
                    <li>
                        <h5>Name:</h5>
                        <p>Joshua Etok</p>
                    </li>
                    <li>
                        <h5>Experience:</h5>
                        <p>4+ years</p>
                    </li>
                    <li>
                        <h5>Email:</h5>
                        <p><a href="mailto:etokjoshua@gmail.com" style="color: var(--color-primary);">etokjoshua@gmail.com</a></p>
                    </li>
                    <li>
                        <h5>Collaboration:</h5>
                        <p>Available</p>
                    </li>
                    <li>
                        <h5>Language:</h5>
                        <p>English</p>
                    </li>
                    <li>
                        <h5>Phone:</h5>
                        <p>+2348084017920</p>
                    </li>
                    <li>
                        <h5>Nationality:</h5>
                        <p>Nigeria</p>
                    </li>
                    <li>
                        <h5>LinkedIn:</h5>
                        <p><a href="https://www.linkedin.com/in/joshua-etok-082957157" target="_blank" rel="noopener" style="color: var(--color-primary);">@Joshuaetok</a></p>
                    </li>
                </ul>`
                
aboutBtn.addEventListener('click', () => {
    resumeRight.innerHTML = aboutContent;
    resumeRight.className = "resume__right about"
    removeActiveResumeBtn()
    aboutBtn.classList.add("primary")
})
  
  
  // ================= MIXITUP (projects section)
  const containerEl = document.querySelector('.projects__container')
  let mixer = mixitup(containerEl, {
    animation: {
      enable: false
    }
  })
  
  mixer.filter('*')
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // ================= SWIPER
  const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    600: {
      slidesPerView: 2
    }, 1024: {
      slidesPerView: 3
    }
  }

});





















// ================= FAQS
const faqs = document.querySelectorAll('.faqs__item');

faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    const p = faq.querySelector('.faqs__item-bottom p');
    const icon = faq.querySelector('.faq__icon')
    if(p.classList.contains('show')) {
      p.classList.remove('show')
      icon.innerHTML = '<i class="uil uil-angle-down"></i>'
    } else {
      p.classList.add('show')
      icon.innerHTML = '<i class="uil uil-angle-up"></i>'
    }
  })
})












// ================= THEME
const themeToggler = document.querySelector('.nav__theme-btn')
themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables')
  if (!document.body.classList.contains('dark-theme-variables')) {
    themeToggler.innerHTML = '<i class="uil uil-moon"></i>'
    window.localStorage.setItem('portfolio-theme', '')
  } else {
    themeToggler.innerHTML = '<i class="uil uil-sun"></i>'
    window.localStorage.setItem('portfolio-theme', 'dark-theme-variables')
  }
})

// use theme from local storage on page load
const bodyClass = window.localStorage.getItem('portfolio-theme');
if (bodyClass === 'dark-theme-variables') {
  document.body.classList.add('dark-theme-variables');
  themeToggler.innerHTML = '<i class="uil uil-sun"></i>';
}
