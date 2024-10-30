import React, { useEffect, useState } from "react";
import {
  ImageListItem,
  Box,
  Container,
  Typography,
  IconButton,
  Menu,
  Fab,
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import { Download, ContentCopy } from "@mui/icons-material";
import JSZip from "jszip";
import saveAs from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { MouseCoordinates } from "./types";
import { getEmojiData, getNotoEmojiUrl, getSupportedEmoji } from "./utils";
import Search from "./search";
import RightEmojiList from "./right-emoji-list";
import LeftEmojiList from "./left-emoji-list";

export default function Kitchen() {
  // Selection helpers
  const [selectedLeftEmoji, setSelectedLeftEmoji] = useState("");
  const [selectedRightEmoji, setSelectedRightEmoji] = useState("");

  // Mobile helpers
  const [leftEmojiSelected, setLeftEmojiSelected] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Downloading helpers
  const [bulkDownloadMenu, setBulkDownloadMenu] = useState<
    MouseCoordinates | undefined
  >();
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);

  // Search results helpers
  const [leftSearchResults, setLeftSearchResults] = useState<Array<string>>([]);
  const [rightSearchResults, setRightSearchResults] = useState<Array<string>>(
    []
  );
  const [mobileSearchResults, setMobileSearchResults] = useState<Array<string>>(
    []
  );

  // Search terms helpers
  const [leftUuid, setLeftUuid] = useState<string>(uuidv4());
  const [rightUuid, setRightUuid] = useState<string>(uuidv4());
  const [mobileUuid, setMobileUuid] = useState<string>(uuidv4());

  /**
   * 📱 Mobile handler to naively detect if we're on a phone or not
   */
  function handleWindowSizeChange() {
    window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  /**
   * 📱 Mobile handler to set a random combination on load
   */
  useEffect(() => {
    if (isMobile) {
      handleFullEmojiRandomize();
    }
  }, []);

  /**
   * 📱 Mobile handler to reset state when resizing window smaller to trigger mobile view
   */
  useEffect(() => {
    if (!isMobile) {
      // Leaving mobile view should always be a subset of desktop functionality
      return;
    }

    if (selectedLeftEmoji === "" && selectedRightEmoji !== "") {
      handleLeftEmojiRandomize();
    } else if (selectedLeftEmoji !== "" && selectedRightEmoji === "") {
      handleRightEmojiRandomize();
    } else if (selectedLeftEmoji === "" && selectedRightEmoji === "") {
      handleFullEmojiRandomize();
    }
  }, [isMobile]);

  /**
   * 👈 Handler when an emoji is selected from the left-hand list
   */
  const handleLeftEmojiClicked = (clickedEmoji: string) => {
    if (isMobile) {
      // Don't allow columns unselect on mobile
      if (selectedLeftEmoji !== clickedEmoji) {
        setSelectedLeftEmoji(clickedEmoji);
      }
    } else {
      // If we're unsetting the left column, clear the right column too
      if (selectedLeftEmoji === clickedEmoji) {
        setSelectedLeftEmoji("");
        setSelectedRightEmoji("");
      }
      // Else we clicked another left emoji while both are selected, set the left column as selected and clear right column
      else if (selectedRightEmoji !== "") {
        setSelectedLeftEmoji(clickedEmoji);
        setSelectedRightEmoji("");
      } else {
        setSelectedLeftEmoji(clickedEmoji);
      }
    }
  };

  /**
   * 🎲 Handler when left-hand randomize button clicked
   */
  const handleLeftEmojiRandomize = () => {
    if (isMobile) {
      // On mobile, use the right emoji as a base and select a random left emoji from the supported list
      const data = getEmojiData(selectedRightEmoji);
      const possibleLeftEmoji = Object.keys(data.combinations).filter(
        (codepoint) => codepoint !== selectedLeftEmoji // Don't randomly choose the same left emoji
      );

      const randomLeftEmoji =
        possibleLeftEmoji[Math.floor(Math.random() * possibleLeftEmoji.length)];

      setSelectedLeftEmoji(randomLeftEmoji);
      setLeftEmojiSelected(true); // If you click random on the left emoji, select that one
    } else {
      // Since we're selecting a new left emoji, clear out the right emoji
      var possibleEmoji: Array<string>;

      // Pick a random emoji from all possible emoji
      possibleEmoji = getSupportedEmoji().filter(
        (codepoint) => codepoint !== selectedLeftEmoji
      );

      const randomEmoji =
        possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)];
      setSelectedLeftEmoji(randomEmoji);
      setSelectedRightEmoji("");
    }
  };

  /**
   * 👉 Handler when an emoji is selected from the right-hand list
   */
  const handleRightEmojiClicked = (clickedEmoji: string) => {
    if (isMobile) {
      // Don't allow column unselect on mobile
      if (selectedRightEmoji !== clickedEmoji) {
        setSelectedRightEmoji(clickedEmoji);
      }
    } else {
      setSelectedRightEmoji(
        clickedEmoji === selectedRightEmoji ? "" : clickedEmoji
      );
    }
  };

  /**
   * 🎲 Handle right-hand randomize button clicked
   */
  const handleRightEmojiRandomize = () => {
    const data = getEmojiData(selectedLeftEmoji);
    const possibleEmoji = Object.keys(data.combinations).filter(
      (codepoint) => codepoint !== selectedRightEmoji // Don't randomly choose the same right emoji
    );

    const randomEmoji =
      possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)];

    setSelectedRightEmoji(randomEmoji);

    if (isMobile) {
      setLeftEmojiSelected(false);
    }
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
    setSelectedRightEmoji(randomRightEmoji);

    if (isMobile) {
      setMobileSearchResults([]);
      setMobileUuid(uuidv4());
    } else {
      setLeftSearchResults([]);
      setLeftUuid(uuidv4());
      setRightSearchResults([]);
      setRightUuid(uuidv4());
    }
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
  var combination;
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
    combination = getEmojiData(selectedLeftEmoji).combinations[
      selectedRightEmoji
    ].filter((c) => c.isLatest)[0];

    middleList = (
      <ImageListItem>
        <img alt={combination.alt} src={combination.gStaticUrl} />
      </ImageListItem>
    );
  }

  if (isMobile) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          mt: 1,
          position: "relative",
          height: "100dvh",
          minWidth: "320px",
        }}
      >
        {/* Emoji Column */}
        <Box
          sx={{
            overflowY: "auto",
            flexGrow: "1",
            width: "100%",
          }}
        >
          {/* Equation Section */}
          <Paper
            sx={{
              position: "sticky",
              top: 3,
              zIndex: 2,
              mx: 1.5,
              mb: 1,
              p: "16px",
              justifyContent: "center",
            }}
          >
            <Grid container columns={14} spacing={2}>
              {/* Left Emoji */}
              <Grid size={4}>
                <Stack direction="column">
                  <Paper
                    elevation={0}
                    onClick={() => setLeftEmojiSelected(true)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexShrink: 0,
                      marginBottom: "4px",
                      backgroundColor: (theme) =>
                        leftEmojiSelected
                          ? theme.palette.action.selected
                          : theme.palette.background.default,
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.action.hover,
                      },
                    }}
                  >
                    {selectedLeftEmoji !== "" ? (
                      <img
                        style={{
                          aspectRatio: 1,
                          padding: "8px",
                        }}
                        loading="lazy"
                        alt={getEmojiData(selectedLeftEmoji).alt}
                        src={getNotoEmojiUrl(
                          getEmojiData(selectedLeftEmoji).emojiCodepoint
                        )}
                      />
                    ) : null}
                  </Paper>
                  <IconButton
                    onClick={handleLeftEmojiRandomize}
                    sx={{
                      width: "fit-content",
                      marginX: "auto",
                    }}
                  >
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
                  </IconButton>
                </Stack>
              </Grid>

              {/* Plus sign */}
              <Grid
                alignItems="center"
                display="flex"
                justifyContent="center"
                paddingBottom="45px"
                size={1}
                textAlign="center"
              >
                <Typography>+</Typography>
              </Grid>

              {/* Right Emoji */}
              <Grid size={4}>
                <Stack direction="column" justifyContent="center">
                  <Paper
                    elevation={0}
                    onClick={() => setLeftEmojiSelected(false)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "4px",
                      backgroundColor: (theme) =>
                        leftEmojiSelected
                          ? theme.palette.background.default
                          : theme.palette.action.selected,
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.action.hover,
                      },
                    }}
                  >
                    {selectedRightEmoji !== "" ? (
                      <img
                        style={{
                          aspectRatio: 1,
                          padding: "8px",
                        }}
                        loading="lazy"
                        alt={getEmojiData(selectedRightEmoji).alt}
                        src={getNotoEmojiUrl(
                          getEmojiData(selectedRightEmoji).emojiCodepoint
                        )}
                      />
                    ) : null}
                  </Paper>
                  <IconButton
                    onClick={handleRightEmojiRandomize}
                    sx={{
                      width: "fit-content",
                      marginX: "auto",
                    }}
                  >
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
                  </IconButton>
                </Stack>
              </Grid>

              {/* Equal sign */}
              <Grid
                alignItems="center"
                display="flex"
                justifyContent="center"
                paddingBottom="45px"
                size={1}
                textAlign="center"
              >
                <Typography>=</Typography>
              </Grid>

              {/* Result */}
              <Grid size={4}>
                <Stack direction="column" justifyContent="center">
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "4px",
                    }}
                  >
                    {showOneCombo ? (
                      <div style={{ display: "flex", padding: "8px" }}>
                        <img
                          style={{
                            aspectRatio: 1,
                            maxHeight: "100%",
                            width: "100%",
                          }}
                          loading="lazy"
                          alt={combination!.alt}
                          src={combination!.gStaticUrl}
                        />
                      </div>
                    ) : null}
                  </Paper>
                  <IconButton
                    onClick={handleImageCopy}
                    sx={{
                      height: "40px",
                      width: "40px",
                      marginX: "auto",
                    }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Search */}
          <Search
            isMobile={isMobile}
            setSearchResults={setMobileSearchResults}
            uuid={mobileUuid}
          />

          {/* Emoji List */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(8, 1fr)",
                sm: "repeat(8, 1fr)",
                md: "repeat(8, 1fr)",
                lg: "repeat(9, 1fr)",
                xl: "repeat(10, 1fr)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
              },
            }}
          >
            {leftEmojiSelected ? (
              <LeftEmojiList
                handleBulkImageDownloadMenuOpen={
                  handleBulkImageDownloadMenuOpen
                }
                handleLeftEmojiClicked={handleLeftEmojiClicked}
                isMobile={isMobile}
                leftSearchResults={mobileSearchResults}
                selectedLeftEmoji={selectedLeftEmoji}
                selectedRightEmoji={selectedRightEmoji}
              />
            ) : (
              <RightEmojiList
                handleRightEmojiClicked={handleRightEmojiClicked}
                rightSearchResults={mobileSearchResults}
                selectedLeftEmoji={selectedLeftEmoji}
                selectedRightEmoji={selectedRightEmoji}
              />
            )}
          </Box>
          <Fab
            color="primary"
            onClick={handleFullEmojiRandomize}
            sx={{
              position: "absolute",
              bottom: 20,
              right: "10%",
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
        </Box>
      </Container>
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
          handleRandomize={handleLeftEmojiRandomize}
          isMobile={isMobile}
          selectedEmoji={selectedLeftEmoji}
          setSearchResults={setLeftSearchResults}
          uuid={leftUuid}
        />

        {/* Left Emoji List */}
        <Box
          sx={{
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
            handleBulkImageDownloadMenuOpen={handleBulkImageDownloadMenuOpen}
            handleLeftEmojiClicked={handleLeftEmojiClicked}
            isMobile={isMobile}
            leftSearchResults={leftSearchResults}
            selectedLeftEmoji={selectedLeftEmoji}
            selectedRightEmoji={selectedRightEmoji}
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
              loading={isBulkDownloading}
              loadingPosition="start"
              onClick={handleBulkImageDownload}
              startIcon={<Download fontSize="small" />}
              sx={{ mx: 1 }}
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
          disabled={selectedLeftEmoji === ""}
          handleRandomize={handleRightEmojiRandomize}
          isMobile={isMobile}
          selectedEmoji={selectedRightEmoji}
          setSearchResults={setRightSearchResults}
          uuid={rightUuid}
        />

        {/* Right Emoji List */}
        <Box
          sx={{
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
            handleRightEmojiClicked={handleRightEmojiClicked}
            rightSearchResults={rightSearchResults}
            selectedLeftEmoji={selectedLeftEmoji}
            selectedRightEmoji={selectedRightEmoji}
          />
        </Box>
      </Box>
    </Container>
  );
}
