// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close menu on link click (mobile)
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });

    // Form submission handler
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const industry = formData.get('industry');
        const message = formData.get('message');

        // Replace with your email address
        const yourEmail = 'your-email@example.com'; // Update this with your actual email

        // Create mailto link
        const subject = `New Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\nMessage: ${message}`;
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message and reset form
        alert('Thank you for your inquiry! We will get back to you soon.');
        form.reset();
    });

    // Animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('hero-image') || 
                    entry.target.classList.contains('about-image') || 
                    entry.target.classList.contains('company-image') || 
                    entry.target.classList.contains('card')) {
                    entry.target.style.transition = 'all 0.5s ease';
                }
            }
        });
    }, { threshold: 0.2 });

    // Animate section content
    document.querySelectorAll('.service-card, .hero-image, .about-image, .company-image, .card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
});
