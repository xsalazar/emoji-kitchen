import React, { Dispatch } from "react";
import { getEmojiData, getNotoEmojiUrl, getSupportedEmoji } from "./utils";
import { ImageListItem } from "@mui/material";

export default function LeftEmojiList({
  leftSearchResults,
  selectedLeftEmoji,
  handleLeftEmojiClicked,
  handleBulkImageDownloadMenuOpen,
}: {
  leftSearchResults: Array<string>;
  selectedLeftEmoji: string;
  handleLeftEmojiClicked: Dispatch<string>;
  handleBulkImageDownloadMenuOpen: Dispatch<React.MouseEvent>;
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
          selectedLeftEmoji === data.emojiCodepoint
            ? handleBulkImageDownloadMenuOpen
            : () => {}
        }
      >
        <ImageListItem
          onClick={(event) => handleLeftEmojiClicked(emojiCodepoint)}
          sx={{
            p: 0.5,
            borderRadius: 2,
            backgroundColor: (theme) =>
              selectedLeftEmoji === data.emojiCodepoint
                ? theme.palette.action.selected
                : theme.palette.background.default,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          <img
            loading="lazy"
            width="32px"
            height="32px"
            alt={data.alt}
            src={getNotoEmojiUrl(data.emojiCodepoint)}
          />
        </ImageListItem>
      </div>
    );
  });
}
