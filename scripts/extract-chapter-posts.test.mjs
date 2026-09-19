import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extractChapterMarkdown, withIntro } from "./extract-chapter-posts.mjs";

const fixture = `
export function Page() {
  return (
    <TopicLayout lead="En setning om kapittelet.">
      <h2 className="x">Første avsnitt</h2>
      <p>Tekst i første avsnitt med <strong>utheving</strong>.</p>
      <div>
        <h4>Underpunkt A</h4>
        <p>Avslutter A.</p>
      </div>
      <div>
        <h4>Underpunkt B</h4>
        <p>Starter B.</p>
      </div>
      <OrdBoks ord="Term" barn="Definisjon av termen." />
    </TopicLayout>
  );
}
`;

describe("extractChapterMarkdown", () => {
  it("keeps neighbouring headings apart and captures lead", () => {
    const { markdown, lead } = extractChapterMarkdown(fixture, "fixture.tsx");
    assert.equal(lead, "En setning om kapittelet.");
    assert.match(markdown, /## Første avsnitt/);
    assert.match(markdown, /\*\*utheving\*\*/);
    assert.match(markdown, /Avslutter A\.\n\n#### Underpunkt B/);
    assert.doesNotMatch(markdown, /A\.####/);
    assert.match(markdown, /\*\*Term:\*\* Definisjon av termen\./);
  });

  it("adds the chapter intro used by Platetektonikk", () => {
    const out = withIntro("/geofag-1/vulkaner", "## Vulkaner\n\nTekst.");
    assert.match(out, /\/geofag-1\/vulkaner/);
    assert.match(out, /hele fagteksten/);
  });
});
