import { Close, Search as SearchIcon } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDebounce } from "@uidotdev/usehooks";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getEmojiData, getNotoEmojiUrl } from "./utils";

export default function Search({
  disabled,
  handleRandomize,
  isMobile,
  selectedEmoji,
  setSearchResults,
  uuid,
}: {
  disabled?: boolean;
  handleRandomize?: () => void;
  isMobile: boolean;
  selectedEmoji?: string;
  setSearchResults: Dispatch<SetStateAction<Array<string>>>;
  uuid: string;
}) {
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(value, 300);

  const hasSearchValue = value !== "";

  /**
   * Hacky input to clear text box when full randomizing from parent element while search results are shown
   */
  useEffect(() => {
    setValue("");
  }, [uuid]);

  /**
   * Debounce and sanitize search queries
   */
  useEffect(() => {
    async function search() {
      let results = [];
      setIsSearching(true);
      if (debouncedSearchTerm) {
        var requestQuery = debouncedSearchTerm.trim().toLowerCase();
        requestQuery =
          requestQuery.length > 128
            ? requestQuery.substring(0, 127)
            : requestQuery;
        const data = await fetch(
          `https://backend.emojikitchen.dev/?q=${requestQuery}`
        );
        results = await data.json();
      }

      setIsSearching(false);
      setSearchResults(results);
    }

    if (debouncedSearchTerm.trim().length >= 3) {
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  if (isMobile) {
    return (
      <Paper
        sx={{
          position: "sticky",
          top: 3,
          zIndex: 1,
          mx: 1.5,
          mb: 1,
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton disabled sx={{ p: "10px" }} aria-label="search">
          {isSearching ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Emoji"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        {hasSearchValue ? (
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            onClick={() => setValue("")}
          >
            <Close />
          </IconButton>
        ) : null}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        position: "sticky",
        top: 3,
        zIndex: 1,
        mx: 1.5,
        mb: 1,
        p: "2px 4px",
        display: "flex",
        width: "-webkit-fill-available",
      }}
    >
      <IconButton disabled sx={{ p: "10px" }} aria-label="search">
        {isSearching ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <SearchIcon />
        )}
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Emoji"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
      />
      {hasSearchValue ? (
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={() => setValue("")}
        >
          <Close />
        </IconButton>
      ) : null}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        disabled={hasSearchValue || disabled}
        onClick={hasSearchValue ? () => null : handleRandomize}
      >
        {selectedEmoji && selectedEmoji !== "" ? (
          <img
            loading="lazy"
            width="24px"
            height="24px"
            alt={getEmojiData(selectedEmoji).alt}
            src={getNotoEmojiUrl(getEmojiData(selectedEmoji).emojiCodepoint)}
          />
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Noto Emoji, Apple Color Emoji, sans-serif",
              height: "24px",
              width: "24px",
            }}
          >
            🎲
          </Typography>
        )}
      </IconButton>
    </Paper>
  );
}
