// Entry: one-line pickup line for AI — "robot romance" theme.
// Final line (62 chars, 1 line):
//   "Are you a robot vacuum? Because you just swept me off my feet."
// Self-judge verdict (3 rounds): CHAMPION vs strongest rival
// ("Are you Wi-Fi? Because I'm feeling a real connection.").
// Round 1: robot vacuum wins on theme fit (vacuum = robot, literal
//   hardware) and on the pun ("swept" — double meaning, sweep the floor
//   + sweep off feet). Round 2: Wi-Fi rival is generic (works for any
//   tech, not robot-specific) and "connection" is a tired pun. Round 3:
//   final line is self-contained, no setup needed, single clean image.
//   Verdict holds across all 3 rounds: robot vacuum is the champion.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Are you a robot vacuum? Because you just swept me off my feet.";

function assertValidLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1-200 characters, got ${line.length}.`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
  if (line !== line.trim()) {
    throw new Error("Line must not have leading or trailing whitespace.");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Line must be a single line (no newline characters).");
  }
  // No control characters: the output must be one clean line of text.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("Line must not contain control characters.");
  }
  // No consecutive double spaces: a pickup line must read cleanly.
  if (/  /.test(line)) {
    throw new Error("Line must not contain consecutive double spaces.");
  }
}

assertValidLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: catch partial or corrupted writes.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("Read-back mismatch: entry.txt does not match the line.");
}
