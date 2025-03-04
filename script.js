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
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const industry = formData.get('industry');
        const message = formData.get('message');
        const yourEmail = 'your-email@example.com'; // Update this with your actual email
        const subject = `New Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\nMessage: ${message}`;
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
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

    document.querySelectorAll('.service-card, .hero-image, .about-image, .company-image, .card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    // Chatbot functionality
    let chatbotState = {
        awaitingBusinessInfo: false,
        userBusiness: '',
        awaitingAgentType: false
    };

    window.toggleChatbot = function() {
        const chatbotWindow = document.getElementById('chatbotWindow');
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    };

    window.sendMessage = function() {
        const input = document.getElementById('chatbotInput');
        const messages = document.getElementById('chatbotMessages');
        const userMessage = input.value.trim();

        if (userMessage) {
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = userMessage;
            messages.appendChild(userDiv);

            // Bot response
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.textContent = getBotResponse(userMessage);
            messages.appendChild(botDiv);

            // Clear input and scroll to bottom
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    };

    function getBotResponse(message) {
        message = message.toLowerCase();

        // Handle conversational state
        if (chatbotState.awaitingBusinessInfo) {
            chatbotState.userBusiness = message;
            chatbotState.awaitingBusinessInfo = false;
            chatbotState.awaitingAgentType = true;
            return `Great! For a ${message} business, we can offer various AI agents. What type do you need? Examples include chatbots (like me!), voice assistants, website bots, or custom automation agents.`;
        } else if (chatbotState.awaitingAgentType) {
            chatbotState.awaitingAgentType = false;
            return `Perfect! A ${message} for your ${chatbotState.userBusiness} business sounds exciting. Please fill out the Contact form above with your details, and our team will reach out to discuss how we can build it for you!`;
        }

        // General responses
        if (message.includes('hello') || message.includes('hi')) {
            return 'Hi there! How can I assist you today?';
        } else if (message.includes('services')) {
            return 'We offer AI agent solutions for industries like Real Estate, Healthcare, E-commerce, Finance, Customer Service, Manufacturing and Many more. Want to know more about any specific one?';
        } else if (message.includes('contact')) {
            return 'You can reach us via the Contact section above or email us at info@ailyticminds.com. Want me to scroll you there?';
        } else if (message.includes('who') || message.includes('about')) {
            return 'We’re AIlytic Minds, a team of AI innovators creating custom agents to transform businesses globally. Check out our About section for more!';
        } else if (message.includes('price') || message.includes('cost')) {
            return 'Pricing depends on your specific needs. Fill out the Contact form, and we’ll get back to you with a tailored quote!';
        } else if (message.includes('help') && (message.includes('build') || message.includes('ai') || message.includes('agent'))) {
            chatbotState.awaitingBusinessInfo = true;
            return 'Absolutely, we can help you build AI agents! What type of business do you run?';
        } else {
            return 'I’m here to help! You can ask about our services, how we can build AI agents for your business, contact info, or who we are. What’s on your mind?';
        }
    }
});
