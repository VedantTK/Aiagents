// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu for mobile (unchanged)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Smooth scrolling for nav links (unchanged)
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

    // Form submission handler with EmailJS
    const form = document.querySelector('#contactForm');
    const submitButton = document.querySelector('#submitButton');
    const formMessage = document.querySelector('#formMessage');

    if (!form || !submitButton || !formMessage) {
        console.error('Form elements not found. Check HTML IDs.');
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submission triggered');

        submitButton.disabled = true;
        formMessage.style.display = 'block';
        formMessage.textContent = 'Sending...';
        formMessage.style.color = '#3498db';

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            industry: formData.get('industry'),
            message: formData.get('message')
        };

        console.log('Form Data to Send:', data);

        const serviceID = 'service_qizh5xt'; // Replace with your Service ID
        const templateID = 'template_wap72a3'; // Replace with your Template ID

        emailjs.sendForm(serviceID, templateID, form)
            .then((response) => {
                console.log('Email sent successfully:', response);
                formMessage.textContent = 'Thank you! Your inquiry has been sent successfully.';
                formMessage.style.color = '#28a745';
                form.reset();
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                formMessage.textContent = 'Failed to send inquiry. Please try again later.';
                formMessage.style.color = '#dc3545';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .finally(() => {
                submitButton.disabled = false;
            });
    });

    // Animations on scroll (unchanged)
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

    // Chatbot functionality (unchanged)
    let chatbotState = {
        awaitingBusinessInfo: false,
        userBusiness: '',
        awaitingAgentType: false
    };

    const aiAgents = {
        "chatbot": "A Chatbot Agent handles customer inquiries via text, perfect for 24/7 support on websites or apps. It can answer FAQs or guide users—like me!",
        "voice assistant": "A Voice Assistant Agent uses speech to assist hands-free, ideal for phone support or task management, e.g., scheduling or reminders.",
        "customer support": "A Customer Support Agent combines chat and voice to resolve issues, escalating to humans when needed—great for complex queries.",
        "sales": "A Sales Agent automates lead generation and follow-ups, boosting sales with personalized recommendations, e.g., in e-commerce.",
        "hr assistant": "An HR Assistant Agent streamlines recruitment and employee queries, like onboarding or checking vacation balances.",
        "content generation": "A Content Generation Agent creates marketing copy or reports, saving time on blogs, emails, or product descriptions.",
        "data analysis": "A Data Analysis Agent provides insights from business data, like sales trends or forecasts, for smart decisions.",
        "workflow automation": "A Workflow Automation Agent handles repetitive tasks, e.g., scheduling or invoicing, to boost efficiency.",
        "security monitoring": "A Security Monitoring Agent detects threats or anomalies, like fraud or network issues, to protect your business.",
        "personal productivity": "A Personal Productivity Agent assists employees with tasks, like summarizing reports or managing schedules."
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
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = userMessage;
            messages.appendChild(userDiv);

            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.textContent = getBotResponse(userMessage);
            messages.appendChild(botDiv);

            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    };

    function getBotResponse(message) {
        message = message.toLowerCase();

        if (chatbotState.awaitingBusinessInfo) {
            chatbotState.userBusiness = message;
            chatbotState.awaitingBusinessInfo = false;
            chatbotState.awaitingAgentType = true;
            return `Great! For a ${message} business, we can offer agents like chatbots for customer support, sales agents for boosting revenue, or workflow automation for efficiency. What type of AI agent do you need? Options include: ${Object.keys(aiAgents).join(', ')}.`;
        } else if (chatbotState.awaitingAgentType) {
            const agentType = message.split(' ').find(word => aiAgents[word]) || message;
            chatbotState.awaitingAgentType = false;
            if (aiAgents[agentType]) {
                return `Perfect! ${aiAgents[agentType]} For your ${chatbotState.userBusiness} business, this could be a game-changer. Fill out the Contact form above, and our team will reach out to build it for you!`;
            } else {
                return `I didn’t catch that agent type. For your ${chatbotState.userBusiness} business, we can build agents like ${Object.keys(aiAgents).slice(0, 3).join(', ')}, or others. What do you have in mind?`;
            }
        }

        if (message.includes('hello') || message.includes('hi')) {
            return 'Hi there! How can I assist you today? Ask me about our AI agents or how we can help your business!';
        } else if (message.includes('services') || message.includes('offer') || message.includes('agents')) {
            return `We provide a range of AI agents: ${Object.keys(aiAgents).join(', ')}. Each can transform your business—e.g., chatbots for support, sales agents for revenue, or data analysis for insights. Want details on any specific one?`;
        } else if (message.includes('contact')) {
            return 'Reach us via the Contact section above or email info@ailyticminds.com. Want me to scroll you there?';
        } else if (message.includes('who') || message.includes('about')) {
            return 'We’re AIlytic Minds, innovators building custom AI agents to transform businesses globally. Check our About section or ask me about our agents!';
        } else if (message.includes('price') || message.includes('cost')) {
            return 'Pricing varies by your needs—e.g., a chatbot might differ from a data analysis agent. Fill out the Contact form for a custom quote!';
        } else if ((message.includes('help') || message.includes('need')) && (message.includes('build') || message.includes('ai') || message.includes('agent'))) {
            chatbotState.awaitingBusinessInfo = true;
            return 'Absolutely, we can help! What type of business do you run? This helps me suggest the right AI agents for you.';
        } else if (message.includes('what') && message.includes('need')) {
            chatbotState.awaitingBusinessInfo = true;
            return 'I’d love to recommend AI agents for you! What type of business do you run? That way, I can suggest what’s best.';
        } else {
            return `I’m here to assist! Ask me about our AI agents (like chatbots, voice assistants, or more), how we can build one for your business, our contact info, or who we are. What’s on your mind?`;
        }
    }
});
