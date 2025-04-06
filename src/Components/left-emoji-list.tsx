import { ImageListItem } from "@mui/material";
import React, { Dispatch } from "react";
import { getEmojiData, getNotoEmojiUrl, getSupportedEmoji } from "./utils";

export default function LeftEmojiList({
  handleLeftEmojiClicked,
  handleBulkImageDownloadMenuOpen,
  leftSearchResults,
  selectedLeftEmoji,
}: {
  handleLeftEmojiClicked: Dispatch<string>;
  handleBulkImageDownloadMenuOpen: Dispatch<React.MouseEvent>;
  leftSearchResults: Array<string>;
  selectedLeftEmoji: string;
}) {
  var knownSupportedEmoji = getSupportedEmoji();

  // If we have search results, filter the top-level items down
  if (leftSearchResults.length > 0) {
    knownSupportedEmoji = knownSupportedEmoji.filter((emoji) =>
      leftSearchResults.includes(emoji)
    );
  }

  return knownSupportedEmoji.map((emojiCodepoint) => {
    const data = getEmojiData(emojiCodepoint);

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
            handleLeftEmojiClicked(emojiCodepoint);
          }}
          sx={{
            p: 0.5,
            borderRadius: 2,
            opacity: (_) => {
              return 1;
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
