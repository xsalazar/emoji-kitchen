import emojiMetadata from "./metadata.json";
import { EmojiCombination, EmojiData, EmojiMetadata } from "./types";

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

// The left emoji will always have a top level key, but the correct ordering can be left->right OR right->left
// The ordering is important to ensure we select the correct date for the combo, since it's hardcoded into the request URL
//
// The .pop() will grab the last-most item in the list since it's possible for two emojis to have been revisited at a later date
// For example 🐢 + 👍 have two unique illustrations at `20220815` and `20220823` so we want the most recent illustration
export function findValidEmojiCombo(
  leftEmojiCodepoint: string,
  rightEmojiCodepoint: string
): EmojiCombination {
  const combinations = getEmojiData(leftEmojiCodepoint).combinations;

  let res = combinations
    .filter(
      (combination) =>
        combination.leftEmojiCodepoint === leftEmojiCodepoint &&
        combination.rightEmojiCodepoint === rightEmojiCodepoint
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .pop();

  if (res) {
    return res;
  }

  res = combinations
    .filter(
      (combination) =>
        combination.leftEmojiCodepoint === rightEmojiCodepoint &&
        combination.rightEmojiCodepoint === leftEmojiCodepoint
    )
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .pop();

  return res!; // This has to exist by definition because we only let users select two valid combinations in the UI
}

export function getEmojiData(emojiCodepoint: string): EmojiData {
  return (emojiMetadata as EmojiMetadata).data[emojiCodepoint];
}

export function getSupportedEmoji(): Array<string> {
  return (emojiMetadata as EmojiMetadata).knownSupportedEmoji;
}
