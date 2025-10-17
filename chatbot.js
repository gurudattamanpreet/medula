<!-- Add this to your index.html before the closing </body> tag -->

<!-- Chatbot Widget -->
<div id="chatbot-widget" class="chatbot-widget">
    <div class="chatbot-button" onclick="toggleChatbot()">
        <i class="fas fa-robot"></i>
        <span class="chatbot-notification">1</span>
    </div>
    
    <div id="chatbot-container" class="chatbot-container">
        <div class="chatbot-header">
            <div class="chatbot-header-info">
                <div class="chatbot-status-indicator"></div>
                <div>
                    <h4>ZenturaTech AI Assistant</h4>
                    <span class="chatbot-status">AI Agent Online</span>
                </div>
            </div>
            <button class="chatbot-close" onclick="toggleChatbot()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div id="chatbot-messages" class="chatbot-messages">
            <div class="chatbot-message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>👋 Hello! I'm Zentura AI Assistant. I can help you learn about our AI Agent solutions, discuss your automation needs, or answer questions about our services.</p>
                    <p>How can I assist you today?</p>
                </div>
            </div>
        </div>
        
        <div class="chatbot-input-container">
            <form id="chatbot-form" onsubmit="sendMessage(event)">
                <input 
                    type="text" 
                    id="chatbot-input" 
                    placeholder="Type your message..."
                    autocomplete="off"
                >
                <button type="submit" class="chatbot-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    </div>
</div>
