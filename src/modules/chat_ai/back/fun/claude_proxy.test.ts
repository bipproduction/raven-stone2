import { describe, it, expect, vi } from "vitest";
import {
  buildMessagesBody,
  extractAnswer,
  readProxyConfig,
  askClaudeProxy,
  type ClaudeProxyConfig,
} from "./claude_proxy";

describe("buildMessagesBody", () => {
  it("wraps the question as a single-turn user message", () => {
    const body = buildMessagesBody("halo", "model-x", 42);
    expect(body).toEqual({
      model: "model-x",
      max_tokens: 42,
      messages: [{ role: "user", content: "halo" }],
    });
  });

  it("falls back to default model and max_tokens", () => {
    const body = buildMessagesBody("halo");
    expect(body.messages[0]).toEqual({ role: "user", content: "halo" });
    expect(typeof body.model).toBe("string");
    expect(body.max_tokens).toBeGreaterThan(0);
  });
});

describe("extractAnswer", () => {
  it("joins text blocks and trims", () => {
    const answer = extractAnswer({
      content: [
        { type: "text", text: "Hello " },
        { type: "text", text: "world " },
      ],
    });
    expect(answer).toBe("Hello world");
  });

  it("ignores non-text blocks", () => {
    const answer = extractAnswer({
      content: [
        { type: "tool_use", id: "x" },
        { type: "text", text: "only this" },
      ],
    });
    expect(answer).toBe("only this");
  });

  it("throws with context when the payload carries an error", () => {
    expect(() =>
      extractAnswer({ error: { message: "bad request" } })
    ).toThrow(/bad request/);
  });

  it("throws when there is no usable text", () => {
    expect(() => extractAnswer({ content: [] })).toThrow(/no text/i);
  });
});

describe("readProxyConfig", () => {
  it("reads url and token from env and strips trailing slash", () => {
    const cfg = readProxyConfig({
      CLAUDE_PROXY_URL: "https://proxy.example.com/",
      CLAUDE_PROXY_TOKEN: "sk-cp-abc",
    } as NodeJS.ProcessEnv);
    expect(cfg.url).toBe("https://proxy.example.com");
    expect(cfg.token).toBe("sk-cp-abc");
    expect(typeof cfg.model).toBe("string");
  });

  it("honors CLAUDE_PROXY_MODEL override", () => {
    const cfg = readProxyConfig({
      CLAUDE_PROXY_URL: "https://proxy.example.com",
      CLAUDE_PROXY_TOKEN: "sk-cp-abc",
      CLAUDE_PROXY_MODEL: "custom-model",
    } as NodeJS.ProcessEnv);
    expect(cfg.model).toBe("custom-model");
  });

  it("throws when url or token is missing", () => {
    expect(() =>
      readProxyConfig({ CLAUDE_PROXY_TOKEN: "sk-cp-abc" } as NodeJS.ProcessEnv)
    ).toThrow(/belum dikonfigurasi/);
    expect(() =>
      readProxyConfig({ CLAUDE_PROXY_URL: "https://x" } as NodeJS.ProcessEnv)
    ).toThrow(/belum dikonfigurasi/);
  });
});

describe("askClaudeProxy", () => {
  const config: ClaudeProxyConfig = {
    url: "https://proxy.example.com",
    token: "sk-cp-test",
    model: "model-x",
    maxTokens: 100,
  };

  it("posts to /v1/messages with auth headers and returns the answer", async () => {
    const fetchImpl = vi.fn(async (url: any, init: any) => {
      expect(url).toBe("https://proxy.example.com/v1/messages");
      expect(init.method).toBe("POST");
      expect(init.headers["x-api-key"]).toBe("sk-cp-test");
      expect(init.headers["anthropic-version"]).toBe("2023-06-01");
      return {
        ok: true,
        status: 200,
        json: async () => ({ content: [{ type: "text", text: "Jakarta" }] }),
      } as any;
    });

    const answer = await askClaudeProxy("ibukota?", config, fetchImpl as any);
    expect(answer).toBe("Jakarta");
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it("throws with context on a non-ok response", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: "invalid token" } }),
    })) as any;

    await expect(
      askClaudeProxy("halo", config, fetchImpl)
    ).rejects.toThrow(/invalid token/);
  });

  it("throws HTTP status when the error body is unparseable", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("not json");
      },
    })) as any;

    await expect(
      askClaudeProxy("halo", config, fetchImpl)
    ).rejects.toThrow(/HTTP 500/);
  });
});
