import { NextRequest, NextResponse } from "next/server";
import { askClaudeProxy } from "@/modules/chat_ai/back/fun/claude_proxy";

// Server-side proxy for the D-AYU AI chat. Holds CLAUDE_PROXY_TOKEN so the
// secret never reaches the browser, and gives the client a same-origin
// endpoint (no CORS).
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let question: unknown;
  try {
    ({ question } = await req.json());
  } catch {
    return NextResponse.json({ error: "Body harus JSON { question }" }, { status: 400 });
  }

  if (typeof question !== "string" || question.trim() === "") {
    return NextResponse.json({ error: "Pertanyaan tidak boleh kosong" }, { status: 400 });
  }

  try {
    const answer = await askClaudeProxy(question.trim());
    return NextResponse.json({ answer });
  } catch (e: any) {
    // Log with context server-side (no token/PII); return a generic message.
    console.error("chat-ai proxy failed:", e?.message ?? e);
    return NextResponse.json(
      { error: "Gagal menghubungi layanan AI. Silakan coba lagi." },
      { status: 502 }
    );
  }
}
