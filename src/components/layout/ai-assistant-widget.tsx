"use client";

import { useState, useEffect } from 'react';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load initial greeting message
    if (messages.length === 0) {
       setMessages([{ id: 'init', text: "Hello! How can I help you today?", sender: 'ai', timestamp: new Date() }]);
    }
  }, []);


  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I've received your message: "${inputValue}". I'm still learning, but I'll do my best to assist!`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  if (!isClient) {
    return null; // Don't render on server to avoid hydration issues with useState
  }

  return (
    <>
      <Button
        onClick={toggleOpen}
        className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 transition-all duration-300 ease-in-out transform hover:scale-110",
            isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        size="icon"
      >
        {isOpen ? <X className="h-7 w-7 text-primary-foreground" /> : <Bot className="h-7 w-7 text-primary-foreground" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] shadow-2xl z-50 flex flex-col border-primary/50 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
          <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="h-6 w-6"/>
                <CardTitle className="text-lg font-headline">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleOpen} className="text-primary-foreground hover:bg-primary/80 h-8 w-8">
                <X className="h-5 w-5"/>
            </Button>
          </CardHeader>
          <ScrollArea className="flex-grow p-4 bg-background">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end space-x-2",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-xl px-4 py-2 text-sm shadow-md",
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-card text-card-foreground border rounded-bl-none'
                    )}
                  >
                    {message.text}
                     <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70' )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                   {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <CardFooter className="p-3 border-t bg-background">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-full focus-visible:ring-primary"
                aria-label="Chat input"
              />
              <Button type="submit" size="icon" onClick={handleSendMessage} className="rounded-full bg-primary hover:bg-primary/90 w-10 h-10" aria-label="Send message">
                <Send className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
