import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Regression guard for the /dashboard/summary 500 error.
 *
 * Root cause: echarts references `window` at module import time. When an echarts
 * chart component is imported statically into a client component, Next.js still
 * evaluates that module during SSR and throws `ReferenceError: window is not
 * defined`, which produced a fatal HTTP 500 in production builds.
 *
 * Fix: chart components must be loaded via `next/dynamic(..., { ssr: false })`
 * and must NOT be pulled in through the eager `emotion` barrel (index.ts), which
 * re-exports every echarts component and drags them all into the SSR graph.
 *
 * These assertions fail if anyone reverts to a static/barrel import.
 */

const ROOT = process.cwd();

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

describe("summary page keeps echarts out of the SSR graph", () => {
  const viewSummary = "src/modules/emotion/front/view/view_summary.tsx";
  const viewCandidate =
    "src/modules/emotion/front/components/view_summary_candidate.tsx";

  it("loads EchartJokowiEffect via dynamic ssr:false in view_summary", () => {
    const src = read(viewSummary);
    expect(src).toMatch(
      /const\s+EchartJokowiEffect\s*=\s*dynamic\(\s*\(\)\s*=>\s*import\(\s*['"]\.\.\/components\/echart_jokowi_effect['"]\s*\)\s*,\s*\{\s*ssr:\s*false\s*\}\s*\)/
    );
  });

  it("loads EchartSummary via dynamic ssr:false in view_summary_candidate", () => {
    const src = read(viewCandidate);
    expect(src).toMatch(
      /const\s+EchartSummary\s*=\s*dynamic\(\s*\(\)\s*=>\s*import\(\s*['"]\.\/echart_summary['"]\s*\)\s*,\s*\{\s*ssr:\s*false\s*\}\s*\)/
    );
  });

  it("does not import echarts chart components from the emotion barrel", () => {
    // Importing chart components from '../..' (the emotion index) re-triggers the
    // eager-echarts cascade that this fix removed.
    const src = read(viewSummary);
    expect(src).not.toMatch(/import\s*\{[^}]*EchartJokowiEffect[^}]*\}\s*from\s*['"]\.\.\/\.\.['"]/);
    expect(src).not.toMatch(/import\s*\{[^}]*Top10JokowiEffect[^}]*\}\s*from\s*['"]\.\.\/\.\.['"]/);
  });

  it("does not statically import EchartSummary in view_summary_candidate", () => {
    const src = read(viewCandidate);
    // A bare `import EchartSummary from './echart_summary'` would re-introduce the
    // SSR crash. Only the dynamic() form is allowed.
    expect(src).not.toMatch(/^\s*import\s+EchartSummary\s+from\s+['"]\.\/echart_summary['"]/m);
  });
});
