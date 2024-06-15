import emojiMetadata from "./metadata.json";
import { EmojiData, EmojiMetadata } from "./types";

/**
 * Converts an emoji codepoint into a printable emoji used for log statements
 */
export function toPrintableEmoji(emojiCodepoint: string): string {
  return String.fromCodePoint(
    ...emojiCodepoint.split("-").map((p) => parseInt(`0x${p}`))
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
  return (emojiMetadata as EmojiMetadata).data[emojiCodepoint];
}

export function getSupportedEmoji(): Array<string> {
  return (emojiMetadata as EmojiMetadata).knownSupportedEmoji;
}
