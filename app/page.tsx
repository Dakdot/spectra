'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Initialize messages from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add effect to save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    var newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input },
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_FUNGI_API_KEY;
      if (!apiKey) {
        throw new Error('FUNGI_API_KEY environment variable is not set');
      }

      const response = await fetch("https://fungitest.fungiproject.xyz/test/graphs/run", {
        method: "POST",
        headers: {
            "Authorization": `ApiKey ${apiKey}`,
            "Content-Type": "application/json",
    
        },
        body: JSON.stringify({
            id: "67ba0bca3627d11124d7b441",
            deploymentId: "67bb5f94bf5cf37db51211ae",
            prompt: input,
            chatHistory: []
        })
    });
    
    const data = await response.json();

    var newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input },
      { role: 'assistant', content: data.result.node_outputs["0zekzWe6WKb8iMdl7ZfA"] },
    ];
      
    setMessages(newMessages);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Chat Interface</h2>
      
      <Card className="flex-1 p-4 mb-4">
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          {isLoading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}