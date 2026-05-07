"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface Chat {
  id: string;
  title: string;
  created_at: string;
}

export default function AITutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Load user's chats
      const { data, error } = await supabase
        .from("ai_chats")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading chats:", error);
      } else {
        setChats(data || []);
        if (data && data.length > 0) {
          setActiveChat(data[0].id);
        }
      }
      setLoading(false);
    };
    init();
  }, [router]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChat) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("ai_messages")
        .select("*")
        .eq("chat_id", activeChat)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error);
      } else {
        setMessages(
          (data || []).map((msg) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
          }))
        );
      }
    };
    loadMessages();
  }, [activeChat]);

  const createNewChat = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const title = `Chat ${chats.length + 1}`;
    const { data, error } = await supabase
      .from("ai_chats")
      .insert({ user_id: user.id, title })
      .select()
      .single();

    if (error) {
      console.error("Error creating chat:", error);
      return;
    }

    const newChat = data;
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI tutor. Ask me anything about your courses!",
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeChat || sending) return;

    const userMessage: Message = {
      id: `temp_${Date.now()}`,
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      // Save user message to Supabase
      const { data: savedMsg } = await supabase
        .from("ai_messages")
        .insert({
          chat_id: activeChat,
          role: "user",
          content: input,
        })
        .select()
        .single();

      // Call OpenRouter API (free models)
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Using OpenRouter free models - no API key needed for some models
        },
        body: JSON.stringify({
          model: "openrouter/tencent/hy3-preview:free",
          messages: [
            {
              role: "system",
              content: "You are an AI tutor for Nigerian university students. Provide clear, accurate, and concise explanations. Focus on helping students understand course materials, predict exam questions, and improve academic performance.",
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error("AI service unavailable");
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

      // Save AI response to Supabase
      await supabase.from("ai_messages").insert({
        chat_id: activeChat,
        role: "assistant",
        content: aiResponse,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: aiResponse,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error_${Date.now()}`,
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading AI Tutor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Chat History */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EduNaija</span>
          </Link>
        </div>
        <div className="p-4">
          <Button
            onClick={createNewChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            + New Chat
          </Button>
          <div className="mt-4 space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase">Recent Chats</h3>
            {chats.length === 0 ? (
              <p className="text-sm text-gray-500">No chats yet</p>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeChat === chat.id
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(chat.created_at).toLocaleDateString()}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">AI Tutor</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                // Generate quiz from current chat
                setInput("Generate a practice quiz based on our conversation");
                setTimeout(() => sendMessage(), 100);
              }}>
                Generate Quiz
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                setInput("Explain the key concepts from our discussion");
                setTimeout(() => sendMessage(), 100);
              }}>
                Summarize
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>Start a new conversation with your AI tutor!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
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
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !sending && sendMessage()}
              placeholder="Ask anything about your course materials..."
              className="flex-1"
              disabled={sending}
            />
            <Button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={sending || !input.trim()}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are generated based on your questions. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
