export interface EmojiMetadata {
  knownSupportedEmoji: Array<string>;
  data: {
    [emojiCodepoint: string]: EmojiData;
  };
}

export interface EmojiData {
  alt: string;
  keywords: Array<string>;
  emojiCodepoint: string;
  gBoardOrder: number;
  combinations: { [otherEmojiCodepoint: string]: Array<EmojiCombination> };
}

export interface EmojiCombination {
  gStaticUrl: string;
  alt: string;
  leftEmoji: string;
  leftEmojiCodepoint: string;
  rightEmoji: string;
  rightEmojiCodepoint: string;
  date: string;
  isLatest: boolean;
  gBoardOrder: number;
}

export interface MouseCoordinates {
  mouseX: number;
  mouseY: number;
}
