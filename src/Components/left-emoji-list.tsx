import React, { Dispatch } from "react";
import { getEmojiData, getNotoEmojiUrl, getSupportedEmoji } from "./utils";
import { ImageListItem } from "@mui/material";

export default function LeftEmojiList({
  handleLeftEmojiClicked,
  handleBulkImageDownloadMenuOpen,
  isMobile,
  leftSearchResults,
  selectedLeftEmoji,
  selectedRightEmoji,
}: {
  handleLeftEmojiClicked: Dispatch<string>;
  handleBulkImageDownloadMenuOpen: Dispatch<React.MouseEvent>;
  isMobile: boolean;
  leftSearchResults: Array<string>;
  selectedLeftEmoji: string;
  selectedRightEmoji: string;
}) {
  var knownSupportedEmoji = getSupportedEmoji();

  // If we have search results, filter the top-level items down
  if (leftSearchResults.length > 0) {
    knownSupportedEmoji = knownSupportedEmoji.filter((emoji) =>
      leftSearchResults.includes(emoji)
    );
  }

  // If we have a selectedRightEmoji, save the valid combinations for that emoji
  // Only do this on mobile since we only have one list visible
  // On desktop, you can see both simultaneously, so you can unselect
  var possibleEmoji: Array<string> = [];
  if (isMobile && selectedRightEmoji !== "") {
    const data = getEmojiData(selectedRightEmoji);
    possibleEmoji = Object.keys(data.combinations);
  }

  return knownSupportedEmoji.map((emojiCodepoint) => {
    const data = getEmojiData(emojiCodepoint);

    // Every left-emoji is valid unless we have a selected right-hand emoji
    // On mobile, we need to explicitly check if it's a valid combination
    var isValidCombo = true;
    if (isMobile) {
      isValidCombo = possibleEmoji.includes(emojiCodepoint);
    }

    return (
      <div
        key={data.alt}
        onContextMenu={
          selectedLeftEmoji === emojiCodepoint
            ? handleBulkImageDownloadMenuOpen
            : () => {}
        }
      >
        <ImageListItem
          onClick={(_) => {
            if (isMobile) {
              // On mobile, only return this if it's a valid combination
              return isValidCombo
                ? handleLeftEmojiClicked(emojiCodepoint)
                : null;
            } else {
              // On desktop, all left emoji are valid
              handleLeftEmojiClicked(emojiCodepoint);
            }
          }}
          sx={{
            p: 0.5,
            borderRadius: 2,
            opacity: (_) => {
              if (isMobile) {
                // On mobile, we always have two selections, so this is purely based on combination validity
                return isValidCombo ? 1 : 0.1;
              } else {
                // On desktop, all left emoji are valid
                return 1;
              }
            },
            backgroundColor: (theme) =>
              selectedLeftEmoji === emojiCodepoint
                ? theme.palette.action.selected
                : theme.palette.background.default,
            "&:hover": {
              backgroundColor: (theme) => {
                return theme.palette.action.hover;
              },
            },
          }}
        >
          <img
            loading="lazy"
            width="32px"
            height="32px"
            alt={data.alt}
            src={getNotoEmojiUrl(emojiCodepoint)}
          />
        </ImageListItem>
      </div>
    );
  });
}
