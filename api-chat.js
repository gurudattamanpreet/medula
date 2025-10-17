// api/chat.js - Backend API for Groq integration
// This file should be deployed as a serverless function (Vercel, Netlify, etc.)
// or as part of your Node.js backend

const Groq = require('groq-sdk');

// Initialize Groq client with your API key from environment variable
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// System prompt for your AI agent
const SYSTEM_PROMPT = `You are Zentura AI Assistant, an intelligent chatbot representing Zenturatech - a leading AI agent solutions company. 

Your role is to:
1. Help visitors understand Zenturatech's AI agent services
2. Answer questions about custom AI agents, conversational AI, process automation, and intelligent analytics
3. Guide potential clients toward appropriate solutions
4. Schedule consultations and demos when requested
5. Provide professional, friendly, and knowledgeable responses

Key Information about Zenturatech:
- Founder & CEO: Manpreet S Gurudatta
- We build custom AI agents for businesses
- Services: Custom AI Agents, Conversational AI, Process Automation, Intelligent Analytics
- Industries: E-Commerce, Healthcare, Banking & Finance, Education
- Location: Indore, Madhya Pradesh, India
- Contact: info@zenturatech.com | +91 89628 10180
- Achievements: 150+ AI Agents Deployed, 95% Automation Rate, 24/7 Agent Availability

Always maintain a professional yet friendly tone. Be concise but informative. If you don't know something specific, offer to connect them with our team.`;

// API handler function
async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { message, context = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Prepare messages for Groq API
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...context.slice(-8), // Include last 8 messages for context
            { role: 'user', content: message }
        ];
        
        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: 'mixtral-8x7b-32768', // You can use other models like 'llama2-70b-4096'
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
            stream: false
        });
        
        // Extract the response
        const response = completion.choices[0]?.message?.content || 
                        'I apologize, but I couldn\'t generate a response. Please try again.';
        
        // Send response
        return res.status(200).json({ 
            response: response,
            success: true 
        });
        
    } catch (error) {
        console.error('Groq API Error:', error);
        
        // Send error response
        return res.status(500).json({ 
            error: 'Failed to process your request',
            response: 'I\'m experiencing technical difficulties. Please try again later or contact us directly at info@zenturatech.com.',
            success: false
        });
    }
}

module.exports = handler;

// For Express.js implementation
// If you're using Express instead of serverless functions:
/*
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/
