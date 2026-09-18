import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isShortPlatetektonikkBody } from "./post-seed-upgrade.ts";

describe("isShortPlatetektonikkBody", () => {
  it("treats the original stub as short", () => {
    assert.equal(
      isShortPlatetektonikkBody(
        "## Jordas lag og hva en plate egentlig er\n\n> Rediger denne teksten i redigeringsvisningen og lagre",
      ),
      true,
    );
  });

  it("keeps the full chapter body", () => {
    assert.equal(
      isShortPlatetektonikkBody(
        "## Jordens dynamiske indre: Litosfære, astenosfære og reologi\n\n" + "x".repeat(9000),
      ),
      false,
    );
  });
});
