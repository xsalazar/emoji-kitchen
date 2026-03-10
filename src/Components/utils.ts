import type { EmojiData, EmojiMetadata } from "./types";

let cachedMetadata: EmojiMetadata | null = null;

/**
 * Loads emoji metadata from the server (lazy-loaded to avoid blocking initial bundle).
 * Safe to call multiple times; subsequent calls resolve immediately with cached data.
 */
export async function loadMetadata(): Promise<void> {
  if (cachedMetadata) {
    return;
  }

  // Loaded via the `./public` directory and shipped with GitHub pages
  var res = await fetch(`/metadata.json`);
  if (!res.ok) {
    throw new Error(`Failed to load metadata: ${res.status}`);
  }

  cachedMetadata = (await res.json()) as EmojiMetadata;
  return;
}

/**
 * Converts an emoji codepoint into a printable emoji used for log statements
 */
export function toPrintableEmoji(emojiCodepoint: string): string {
  return String.fromCodePoint(
    ...emojiCodepoint.split("-").map((p) => parseInt(`0x${p}`)),
  );
}

/**
 * Converts an emoji codepoint into a static github reference image url
 */
export function getNotoEmojiUrl(emojiCodepoint: string): string {
  return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${emojiCodepoint
    .split("-")
    .filter((x) => x !== "fe0f")
    .map((x) => x.padStart(4, "0")) // Handle ©️ and ®️
    .join("_")}.svg`;
}

export function getEmojiData(emojiCodepoint: string): EmojiData {
  if (!cachedMetadata) {
    throw new Error("Metadata not loaded");
  }

  return cachedMetadata.data[emojiCodepoint];
}

export function getSupportedEmoji(): Array<string> {
  if (!cachedMetadata) {
    throw new Error("Metadata not loaded");
  }

  return cachedMetadata.knownSupportedEmoji;
}
