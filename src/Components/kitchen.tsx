import React, { useState } from "react";
import {
  ImageListItem,
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  Fab,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { Download, ContentCopy } from "@mui/icons-material";
import JSZip from "jszip";
import saveAs from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { MouseCoordinates } from "./types";
import { getEmojiData, getSupportedEmoji } from "./utils";
import Search from "./search";
import RightEmojiList from "./right-emoji-list";
import LeftEmojiList from "./left-emoji-list";

export default function Kitchen() {
  // Selection helpers
  const [selectedLeftEmoji, setSelectedLeftEmoji] = useState("");
  const [selectedRightEmoji, setSelectedRightEmoji] = useState("");

  // Downloading helpers
  const [bulkDownloadMenu, setBulkDownloadMenu] = useState<
    MouseCoordinates | undefined
  >();
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  // Search helpers
  const [leftSearchResults, setLeftSearchResults] = useState<Array<string>>([]);
  const [rightSearchResults, setRightSearchResults] = useState<Array<string>>(
    []
  );
  const [leftMobileSearchIsOpen, setLeftMobileSearchIsOpen] = useState(false);
  const [rightMobileSearchIsOpen, setRightMobileSearchIsOpen] = useState(false);

  // Hacks to get the search bar to update when I need it to
  const [leftUuid, setLeftUuid] = useState<string>(uuidv4());
  const [rightUuid, setRightUuid] = useState<string>(uuidv4());

  /**
   * 👈 Handler when an emoji is selected from the left-hand list
   */
  const handleLeftEmojiClicked = (clickedEmoji: string) => {
    // If we're unsetting the left column, clear the right column too
    if (selectedLeftEmoji === clickedEmoji) {
      setSelectedLeftEmoji("");
      setSelectedRightEmoji("");
    }
    // Else we clicked another left emoji while both are selected, set the left column as selected and clear right column
    else if (selectedLeftEmoji !== "" && selectedRightEmoji !== "") {
      setSelectedLeftEmoji(clickedEmoji);
      setSelectedRightEmoji("");
    } else {
      setSelectedLeftEmoji(clickedEmoji);
    }
  };

  /**
   * 🎲 Handler when left-hand randomize button clicked
   */
  const handleLeftEmojiRandomize = () => {
    var possibleEmoji: Array<string>;

    // Pick a random emoji from all possible emoji
    possibleEmoji = getSupportedEmoji().filter(
      (codepoint) => codepoint !== selectedLeftEmoji
    );

    const randomEmoji =
      possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)];

    // Since we're selecting a new left emoji, clear out the right emoji
    setSelectedLeftEmoji(randomEmoji);
    setSelectedRightEmoji("");
  };

  /**
   * 👉 Handler when an emoji is selected from the right-hand list
   */
  const handleRightEmojiClicked = (clickedEmoji: string) => {
    setSelectedRightEmoji(
      clickedEmoji === selectedRightEmoji ? "" : clickedEmoji
    );
  };

  /**
   * 🎲 Handle right-hand randomize button clicked
   */
  const handleRightEmojiRandomize = () => {
    var emojiToPick: Array<string>;

    const data = getEmojiData(selectedLeftEmoji);
    const possibleEmoji = Object.keys(data.combinations).filter(
      (codepoint) =>
        codepoint !== selectedLeftEmoji && codepoint !== selectedRightEmoji
    );

    const randomEmoji =
      possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)];

    setSelectedRightEmoji(randomEmoji);
  };

  /**
   * 🎲 Handle full randomize button clicked
   */
  const handleFullEmojiRandomize = () => {
    const knownSupportedEmoji = getSupportedEmoji();
    const randomLeftEmoji =
      knownSupportedEmoji[
        Math.floor(Math.random() * knownSupportedEmoji.length)
      ];

    const data = getEmojiData(randomLeftEmoji);
    const possibleRightEmoji = Object.keys(data.combinations).filter(
      (codepoint) => codepoint !== randomLeftEmoji
    );

    const randomRightEmoji =
      possibleRightEmoji[Math.floor(Math.random() * possibleRightEmoji.length)];

    setSelectedLeftEmoji(randomLeftEmoji);
    setLeftUuid(uuidv4());
    setLeftSearchResults([]);
    setSelectedRightEmoji(randomRightEmoji);
    setRightUuid(uuidv4());
    setRightSearchResults([]);
  };

  /**
   * 💭 Helper function to open the bulk download menu
   */
  const handleBulkImageDownloadMenuOpen = (event: React.MouseEvent) => {
    event.preventDefault();
    setBulkDownloadMenu(
      bulkDownloadMenu === undefined
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : undefined
    );
  };

  /**
   * 💾 Handle bulk combination downloads
   */
  const handleBulkImageDownload = async () => {
    try {
      // See: https://github.com/Stuk/jszip/issues/369
      // See: https://github.com/Stuk/jszip/issues/690
      const currentDate = new Date();
      const dateWithOffset = new Date(
        currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
      );
      (JSZip as any).defaults.date = dateWithOffset;

      const zip = new JSZip();
      const data = getEmojiData(selectedLeftEmoji);
      const photoZip = zip.folder(data.alt)!;

      setIsBulkDownloading(true);

      const combinations = Object.values(data.combinations)
        .flat()
        .filter((c) => c.isLatest);
      for (var i = 0; i < combinations.length; i++) {
        const combination = combinations[i];
        const image = await fetch(combination.gStaticUrl);
        const imageBlob = await image.blob();
        photoZip.file(`${combination.alt}.png`, imageBlob);
      }

      const archive = await zip.generateAsync({ type: "blob" });
      saveAs(archive, data.alt);

      setBulkDownloadMenu(undefined);
      setIsBulkDownloading(false);
    } catch (e) {
      setBulkDownloadMenu(undefined);
      setIsBulkDownloading(false);
    }
  };

  /**
   * 💾 Handle single combination downloads
   */
  const handleImageDownload = () => {
    var combination = getEmojiData(selectedLeftEmoji).combinations[
      selectedRightEmoji
    ].filter((c) => c.isLatest)[0];

    saveAs(combination.gStaticUrl, combination.alt);
  };

  /**
   * 💾 Handle single image copy-to-clipboard
   */
  const handleImageCopy = async () => {
    var combination = getEmojiData(selectedLeftEmoji).combinations[
      selectedRightEmoji
    ].filter((c) => c.isLatest)[0];

    const fetchImage = async () => {
      const image = await fetch(combination.gStaticUrl);
      return await image.blob();
    };

    navigator.clipboard
      .write([
        new ClipboardItem({
          "image/png": fetchImage(),
        }),
      ])
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };

  // See: https://caniuse.com/async-clipboard
  var hasClipboardSupport = "write" in navigator.clipboard;
  var middleList;
  var showOneCombo = false;

  // Neither are selected, show left list, empty middle list, and disable right list
  if (selectedLeftEmoji === "" && selectedRightEmoji === "") {
    middleList = <div></div>;
  }
  // Left emoji is selected, but not right, disable the right list appropriately
  else if (selectedLeftEmoji !== "" && selectedRightEmoji === "") {
    middleList = Object.values(getEmojiData(selectedLeftEmoji).combinations)
      .flat()
      .filter((combination) => combination.isLatest)
      .sort((c1, c2) => c1.gBoardOrder - c2.gBoardOrder)
      .map((combination) => {
        return (
          <ImageListItem key={combination.alt}>
            <img
              loading="lazy"
              width="256px"
              height="256px"
              alt={combination.alt}
              src={combination.gStaticUrl}
            />
          </ImageListItem>
        );
      });
  }
  // Both are selected, show the single combo
  else {
    showOneCombo = true;
    var combination = getEmojiData(selectedLeftEmoji).combinations[
      selectedRightEmoji
    ].filter((c) => c.isLatest)[0];

    middleList = (
      <ImageListItem>
        <img alt={combination.alt} src={combination.gStaticUrl} />
      </ImageListItem>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "row",
        overflowY: "auto",
        mt: 1,
        position: "relative",
      }}
    >
      {/* Left Emoji Column */}
      <Box
        sx={{
          overflowY: "auto",
          justifyItems: "center",
          flexGrow: "1",
          width: "33%",
        }}
      >
        {/* Left Search */}
        <Search
          setSearchResults={setLeftSearchResults}
          setMobileSearchIsOpen={setLeftMobileSearchIsOpen}
          handleRandomize={handleLeftEmojiRandomize}
          selectedEmoji={selectedLeftEmoji}
          uuid={leftUuid}
        />

        {/* Left Emoji List */}
        <Box
          sx={{
            marginTop: leftMobileSearchIsOpen ? "64px" : 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(7, 1fr)",
              lg: "repeat(9, 1fr)",
              xl: "repeat(10, 1fr)",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
            },
          }}
        >
          <LeftEmojiList
            leftSearchResults={leftSearchResults}
            selectedLeftEmoji={selectedLeftEmoji}
            handleLeftEmojiClicked={handleLeftEmojiClicked}
            handleBulkImageDownloadMenuOpen={handleBulkImageDownloadMenuOpen}
          />
        </Box>

        {/* Bulk Download Menu */}
        {selectedLeftEmoji !== "" ? (
          <Menu
            open={bulkDownloadMenu !== undefined}
            onClose={() => setBulkDownloadMenu(undefined)}
            anchorReference="anchorPosition"
            anchorPosition={
              bulkDownloadMenu !== undefined
                ? {
                    top: bulkDownloadMenu.mouseY,
                    left: bulkDownloadMenu.mouseX,
                  }
                : undefined
            }
          >
            <LoadingButton
              sx={{ mx: 1 }}
              loading={isBulkDownloading}
              loadingPosition="start"
              startIcon={<Download fontSize="small" />}
              onClick={handleBulkImageDownload}
            >
              Bulk Download
            </LoadingButton>
          </Menu>
        ) : undefined}
      </Box>

      {/* Middle Emoji Column */}
      <Fab
        color="primary"
        onClick={handleFullEmojiRandomize}
        sx={{
          position: "absolute",
          bottom: 20,
          right: "35%",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Noto Emoji, Apple Color Emoji, sans-serif",
            height: "24px",
          }}
        >
          🎲
        </Typography>
      </Fab>
      <Box
        sx={{
          mx: 3,
          overflowY: "auto",
          justifyItems: "center",
          flexGrow: "1",
          width: "33%",
          position: "relative",
          display: showOneCombo ? "flex" : null,
          alignItems: showOneCombo ? "center" : null,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: showOneCombo ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
              md: showOneCombo ? "repeat(1, 1fr)" : "repeat(3, 1fr)",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
            },
          }}
        >
          {middleList}
          {showOneCombo && hasClipboardSupport ? (
            <Container
              sx={{ display: "flex", justifyContent: "center", pt: 2 }}
            >
              <IconButton onClick={handleImageCopy}>
                <ContentCopy />
              </IconButton>
            </Container>
          ) : null}

          {showOneCombo && !hasClipboardSupport ? (
            <Container
              sx={{ display: "flex", justifyContent: "center", pt: 2 }}
            >
              <IconButton onClick={handleImageDownload}>
                <Download />
              </IconButton>
            </Container>
          ) : null}
        </Box>
      </Box>

      {/* Right Emoji Column */}
      <Box
        sx={{
          overflowY: "auto",
          justifyItems: "center",
          flexGrow: "1",
          width: "33%",
        }}
      >
        {/* Right Search */}
        <Search
          setSearchResults={setRightSearchResults}
          setMobileSearchIsOpen={setRightMobileSearchIsOpen}
          handleRandomize={handleRightEmojiRandomize}
          selectedEmoji={selectedRightEmoji}
          uuid={rightUuid}
          isRightSearch={true}
          disabled={selectedLeftEmoji === ""}
        />

        {/* Right Emoji List */}
        <Box
          sx={{
            marginTop: rightMobileSearchIsOpen ? "64px" : 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(7, 1fr)",
              lg: "repeat(9, 1fr)",
              xl: "repeat(10, 1fr)",
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
            },
          }}
        >
          <RightEmojiList
            rightSearchResults={rightSearchResults}
            selectedLeftEmoji={selectedLeftEmoji}
            selectedRightEmoji={selectedRightEmoji}
            handleRightEmojiClicked={handleRightEmojiClicked}
          />
        </Box>
      </Box>
    </Container>
  );
}
