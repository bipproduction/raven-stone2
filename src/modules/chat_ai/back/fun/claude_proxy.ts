// Claude proxy client for the D-AYU AI chat.
// The proxy speaks the Anthropic Messages API. The token is read from the
// environment on the server only — it must never reach the browser.

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_MAX_TOKENS = 1024;
const REQUEST_TIMEOUT_MS = 60_000;
const ANTHROPIC_VERSION = "2023-06-01";

export interface ClaudeProxyConfig {
  url: string;
  token: string;
  model: string;
  maxTokens: number;
}

/** Build the Anthropic Messages API body for a single-turn question. */
export function buildMessagesBody(
  question: string,
  model: string = DEFAULT_MODEL,
  maxTokens: number = DEFAULT_MAX_TOKENS
) {
  return {
    model,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: question }],
  };
}

/**
 * Extract the assistant text from an Anthropic Messages API response.
 * Throws with context when the payload carries an error or no usable text.
 */
export function extractAnswer(payload: any): string {
  if (payload && typeof payload.error?.message === "string") {
    throw new Error(`Claude proxy error: ${payload.error.message}`);
  }
  const blocks = Array.isArray(payload?.content) ? payload.content : [];
  const text = blocks
    .filter((b: any) => b?.type === "text" && typeof b.text === "string")
    .map((b: any) => b.text)
    .join("")
    .trim();
  if (text === "") {
    throw new Error("Claude proxy returned no text content");
  }
  return text;
}

/** Read proxy config from the environment. Throws if not configured. */
export function readProxyConfig(
  env: NodeJS.ProcessEnv = process.env
): ClaudeProxyConfig {
  const url = env.CLAUDE_PROXY_URL?.trim();
  const token = env.CLAUDE_PROXY_TOKEN?.trim();
  if (!url || !token) {
    throw new Error(
      "CLAUDE_PROXY_URL / CLAUDE_PROXY_TOKEN belum dikonfigurasi di environment"
    );
  }
  return {
    url: url.replace(/\/$/, ""),
    token,
    model: env.CLAUDE_PROXY_MODEL?.trim() || DEFAULT_MODEL,
    maxTokens: DEFAULT_MAX_TOKENS,
  };
}

/**
 * Ask the Claude proxy a single-turn question and return the answer text.
 * An abortable timeout prevents a hung backend from blocking forever.
 * `config` and `fetchImpl` are injectable to keep this unit-testable.
 */
export async function askClaudeProxy(
  question: string,
  config: ClaudeProxyConfig = readProxyConfig(),
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetchImpl(`${config.url}/v1/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": config.token,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify(
        buildMessagesBody(question, config.model, config.maxTokens)
      ),
      signal: controller.signal,
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = payload?.error?.message ?? `HTTP ${res.status}`;
      throw new Error(`Claude proxy request failed: ${msg}`);
    }
    return extractAnswer(payload);
  } finally {
    clearTimeout(timer);
  }
}
