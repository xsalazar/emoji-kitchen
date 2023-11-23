import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import {
  BackspaceOutlined,
  Close,
  ManageSearchOutlined,
  Search as SearchIcon,
} from "@mui/icons-material";
import { getEmojiData, getNotoEmojiUrl } from "./utils";

export default function Search({
  setSearchResults,
  setMobileSearchIsOpen,
  handleRandomize,
  selectedEmoji,
  uuid,
  isRightSearch,
  disabled,
}: {
  setSearchResults: Dispatch<SetStateAction<Array<string>>>;
  setMobileSearchIsOpen: Dispatch<SetStateAction<boolean>>;
  handleRandomize: () => void;
  selectedEmoji: string;
  uuid: string;
  isRightSearch?: boolean;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(value, 300);
  const [
    mobileSearchPopoverAnchorElement,
    setMobileSearchPopoverAnchorElement,
  ] = React.useState<HTMLElement | null>(null);
  const mobileSearchOpen = Boolean(mobileSearchPopoverAnchorElement);

  const currentWidth = window.innerWidth;
  const collapseSearch = currentWidth < 600;
  const hasSearchValue = value !== "";

  const handleMobileSearchClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMobileSearchIsOpen(true);
    setMobileSearchPopoverAnchorElement(event.currentTarget.parentElement!);
  };

  const handleMobileSearchClose = () => {
    setMobileSearchIsOpen(false);
    setMobileSearchPopoverAnchorElement(null);
  };

  /**
   * Hacky input to clear text box when randomizing from parent element
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

  if (collapseSearch) {
    return (
      <Paper
        sx={{
          position: "sticky",
          top: 3,
          zIndex: 1,
          mx: "auto",
          mb: 1,
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <IconButton
          color={hasSearchValue ? "primary" : "inherit"}
          sx={{
            position: "sticky",
            top: 3,
            zIndex: 1,
            background: hasSearchValue ? 0.5 : null,
          }}
          onClick={handleMobileSearchClick}
        >
          {isSearching ? (
            <CircularProgress size={24} color="inherit" />
          ) : hasSearchValue ? (
            <ManageSearchOutlined />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
        <Popover
          sx={{ mt: 1 }}
          open={mobileSearchOpen}
          anchorEl={mobileSearchPopoverAnchorElement}
          onClose={handleMobileSearchClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: isRightSearch ? "right" : "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: isRightSearch ? "right" : "left",
          }}
        >
          <TextField
            autoFocus
            size="small"
            sx={{ flex: 1 }}
            placeholder="Search Emoji"
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
            inputRef={(input) => {
              setTimeout(() => {
                if (input) {
                  input.focus();
                }
              }, 75);
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  disabled={value === ""}
                  color="primary"
                  sx={{ p: "10px" }}
                  onClick={() => setValue("")}
                >
                  <BackspaceOutlined />
                </IconButton>
              ),
            }}
          />
        </Popover>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          disabled={hasSearchValue || disabled}
          onClick={hasSearchValue ? () => null : handleRandomize}
        >
          {selectedEmoji !== "" ? (
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
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        disabled={hasSearchValue || disabled}
        onClick={hasSearchValue ? () => null : handleRandomize}
      >
        {selectedEmoji !== "" ? (
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
