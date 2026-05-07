"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock chat history
const mockChats = [
  { id: 1, title: "CSC 201 - Binary Trees", date: "2 hours ago" },
  { id: 2, title: "MTH 301 - Fouri­er Series", date: "yesterday" },
  { id: 3, title: "PHY 201 - Maxwell's Equations", date: "3 days ago" },
];

// Mock messages for current chat
const mockMessages = [
  { role: "assistant", content: "Hello! I'm your AI tutor for CSC 201. What would you like to learn about today?" },
  { role: "user", content: "Explain binary trees and their types" },
  { role: "assistant", content: "Binary trees are hierarchical data structures where each node has at most two children, referred to as left child and right child. Here are the main types:\n\n1. **Full Binary Tree**: Every node has 0 or 2 children\n2. **Complete Binary Tree**: All levels filled except possibly last\n3. **Perfect Binary Tree**: All internal nodes have 2 children\n4. **Balanced Binary Tree**: Height is O(log n)\n\nWould you like me to generate some practice questions on this topic?" },
];

export default function AITutorPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "That's a great question! Let me explain..." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Chat History */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-gray-900">EduNaija</span>
          </Link>
        </div>
        <div className="p-4">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-4">
            + New Chat
          </Button>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase">Recent Chats</h3>
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 truncate">{chat.title}</div>
                <div className="text-xs text-gray-500">{chat.date}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">AI Tutor - CSC 201</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Summarize</Button>
              <Button variant="outline" size="sm">Generate Quiz</Button>
              <Button variant="outline" size="sm">Explain Concept</Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything about your course materials..."
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are generated based on your course materials.
          </p>
        </div>
      </div>
    </div>
  );
}
