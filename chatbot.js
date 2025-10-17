// chatbot.js - Zenturatech AI Chatbot with Groq API

// Chatbot state
let chatbotOpen = false;
let isTyping = false;

// Toggle chatbot visibility
function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    const notification = document.querySelector('.chatbot-notification');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        container.classList.add('active');
        notification.style.display = 'none';
        // Focus on input when opened
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 100);
    } else {
        container.classList.remove('active');
    }
}

// Send message to Groq API
async function sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    isTyping = true;
    
    try {
        // Call your backend API that connects to Groq
        const response = await callGroqAPI(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
    } finally {
        isTyping = false;
    }
}

// Call Groq API through your backend
async function callGroqAPI(message) {
    try {
        // You'll need to call your backend API that has the GROQ_API_KEY
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                context: getConversationContext()
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Groq API Error:', error);
        // Fallback response if API fails
        return getFallbackResponse(message);
    }
}

// Get conversation context for better responses
function getConversationContext() {
    const messages = document.querySelectorAll('.chatbot-message');
    const context = [];
    
    messages.forEach(msg => {
        const isUser = msg.classList.contains('user-message');
        const content = msg.querySelector('.message-content').innerText;
        context.push({
            role: isUser ? 'user' : 'assistant',
            content: content
        });
    });
    
    return context.slice(-10); // Keep last 10 messages for context
}

// Add message to chat
function addMessage(message, type) {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' 
        ? '<i class="fas fa-robot"></i>' 
        : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Support for formatted responses
    if (type === 'bot' && message.includes('\n')) {
        const paragraphs = message.split('\n').filter(p => p.trim());
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para;
            content.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = message;
        content.appendChild(p);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message typing-message';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content typing-indicator';
    content.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    messagesContainer.appendChild(typingDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Fallback responses when API fails
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Context-aware fallback responses
    const responses = {
        greeting: [
            "Hello! I'm here to help you explore Zenturatech's AI Agent solutions.",
            "Hi there! How can I assist you with your AI automation needs today?"
        ],
        founder: [
            "Manpreet S Gurudatta is the Founder & CEO of Zenturatech. Under his leadership, we're pioneering the development of intelligent AI agents.",
            "Our company was founded and is led by Manpreet S Gurudatta, who serves as CEO. He drives our mission to transform businesses through AI."
        ],
        services: [
            "We offer custom AI agents, conversational AI, process automation, and intelligent analytics. Each solution is tailored to your specific business needs.",
            "Our AI agent services include custom development, chatbots, workflow automation, and data analytics solutions."
        ],
        pricing: [
            "For pricing information, I'd recommend scheduling a consultation. Our solutions are customized to each client's needs.",
            "Our pricing varies based on your specific requirements. Please contact our team for a personalized quote."
        ],
        contact: [
            "You can reach us at info@zenturatech.com or call +91 89628 10180. We're based in Indore, Madhya Pradesh.",
            "Feel free to email us at info@zenturatech.com or use the contact form on our website."
        ],
        demo: [
            "I'd be happy to arrange a demo for you! Please fill out our contact form or email us at info@zenturatech.com.",
            "To see our AI agents in action, schedule a demo through our contact form or call us at +91 89628 10180."
        ],
        default: [
            "I'm here to help you learn about our AI agent solutions. Could you please be more specific about what you'd like to know?",
            "That's an interesting question! For detailed information, I recommend contacting our team directly."
        ]
    };
    
    // Determine response category
    let category = 'default';
    
    if (lowerMessage.match(/hi|hello|hey|greetings/)) {
        category = 'greeting';
    } else if (lowerMessage.match(/founder|ceo|manpreet|who created|who started|who owns|leadership/)) {
        category = 'founder';
    } else if (lowerMessage.match(/service|offer|provide|solution|agent/)) {
        category = 'services';
    } else if (lowerMessage.match(/price|cost|pricing|expensive|cheap|budget/)) {
        category = 'pricing';
    } else if (lowerMessage.match(/contact|email|phone|call|reach/)) {
        category = 'contact';
    } else if (lowerMessage.match(/demo|trial|example|see|show/)) {
        category = 'demo';
    }
    
    // Return random response from category
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Hide notification after 3 seconds
    setTimeout(() => {
        const notification = document.querySelector('.chatbot-notification');
        if (notification && !chatbotOpen) {
            notification.style.display = 'none';
        }
    }, 5000);
    
    // Add enter key support for sending messages
    const chatInput = document.getElementById('chatbot-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
            }
        });
    }
    
    console.log('Zenturatech AI Chatbot initialized');
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleChatbot,
        sendMessage,
        addMessage,
        getFallbackResponse
    };
}
