import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, courseId, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Use OpenRouter free models via OpenClaw gateway
    // The gateway will route to openrouter/tencent/hy3-preview:free or openrouter/openai/gpt-oss-120b:free
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use the free models - no API key needed if using OpenClaw gateway
        // Otherwise, provide OPENROUTER_API_KEY from env
        ...(process.env.OPENROUTER_API_KEY && {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        }),
      },
      body: JSON.stringify({
        model: "openrouter/tencent/hy3-preview:free", // Free model
        messages: [
          {
            role: "system",
            content: `You are an AI tutor for Nigerian university students. 
            You help students understand course materials, answer questions, 
            generate practice questions, and provide study guidance.
            Be concise, clear, and academically rigorous.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenRouter error:", error);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 503 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "No response generated";

    return NextResponse.json({
      message: aiResponse,
      chatId: chatId || `chat_${Date.now()}`,
    });
  } catch (error) {
    console.error("AI tutor error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
