window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY;
    const maxScroll = window.innerHeight * 0.5;
    
    if (scrolled > 0) {
        header.classList.add('scrolled');
        const progress = Math.min(scrolled / maxScroll, 1);
        
        const logo = header.querySelector('.logo');
        const aurora = header.querySelector('.aurora');
        
        logo.style.transform = `
            scale(${1 - progress * 0.2}) 
            translateY(${progress * 20}px) 
            rotate(${progress * 5}deg)
        `;
        
        aurora.style.opacity = 1 - progress;
        aurora.style.transform = `scale(${1 + progress * 0.3})`;
        
        header.style.opacity = 1 - (progress * 0.2);
    } else {
        header.classList.remove('scrolled');
        header.style.opacity = 1;
        const logo = header.querySelector('.logo');
        const aurora = header.querySelector('.aurora');
        logo.style.transform = 'scale(1) translateY(0) rotate(0)';
        aurora.style.opacity = 1;
        aurora.style.transform = 'scale(1)';
    }
});

document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.2)';
        nav.style.padding = '0.5rem 0';
    } else {
        nav.style.background = 'var(--nav-bg)';
        nav.style.padding = '1rem 0';
    }
});

setInterval(() => {
    const header = document.querySelector('.header');
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    header.appendChild(star);
    
    setTimeout(() => star.remove(), 4000);
}, 2000);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.querySelector('.member-info').style.transform = `translateZ(40px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.querySelector('.member-info').style.transform = 'translateZ(0)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = '0.1s transform ease';
        card.querySelector('.member-info').style.transition = '0.1s transform ease';
    });
});