import {
  ImageListItem,
  Box,
  Container,
  Menu,
  MenuItem,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Input,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import {
  Restore,
  Download,
  Favorite,
  LocationOn,
  Search,
} from "@mui/icons-material";
import React from "react";
import JSZip from "jszip";
import axios from "axios";
import saveAs from "file-saver";
import { MouseCoordinates } from "./types";
import {
  findValidEmojiCombo,
  getEmojiData,
  getNotoEmojiUrl,
  getSupportedEmoji,
} from "./utils";

interface KitchenProps {}

interface KitchenState {
  selectedLeftEmoji: string;
  selectedRightEmoji: string;
  bulkDownloadMenu: undefined | MouseCoordinates;
  bulkDownloading: boolean;
}

export default class Kitchen extends React.Component<
  KitchenProps,
  KitchenState
> {
  constructor(props: KitchenProps) {
    super(props);

    this.state = {
      selectedLeftEmoji: "",
      selectedRightEmoji: "",
      bulkDownloadMenu: undefined,
      bulkDownloading: false,
    };

    this.handleLeftEmojiClicked = this.handleLeftEmojiClicked.bind(this);
    this.handleRightEmojiClicked = this.handleRightEmojiClicked.bind(this);
    this.handleBulkDownloadMenuOpen =
      this.handleBulkDownloadMenuOpen.bind(this);
    this.handleBulkDownload = this.handleBulkDownload.bind(this);
  }

  render(): React.ReactNode {
    const {
      selectedLeftEmoji,
      selectedRightEmoji,
      bulkDownloadMenu,
      bulkDownloading,
    } = this.state;

    var leftList;
    var middleList;
    var rightList;
    var showOneCombo = false;

    // Neither are selected, show left list, empty middle list, and disable right list
    if (selectedLeftEmoji === "" && selectedRightEmoji === "") {
      leftList = this.getEmojiImageList(undefined, this.handleLeftEmojiClicked);
      middleList = <div></div>;
      rightList = this.getEmojiImageList();
    }
    // Left emoji is selected, but not right, disable the right list appropriately
    else if (selectedLeftEmoji !== "" && selectedRightEmoji === "") {
      leftList = this.getEmojiImageList(
        selectedLeftEmoji,
        this.handleLeftEmojiClicked
      );

      middleList = getEmojiData(selectedLeftEmoji)
        .combinations.map((combination) => {
          // This will return the correct, latest-date illustration for duplicates
          return findValidEmojiCombo(
            combination.leftEmojiCodepoint,
            combination.rightEmojiCodepoint
          );
        })
        .filter((combo, index, self) => {
          // This will filter out the duplicates since the above will return identical objects for any one with duplicates
          return self.indexOf(combo) === index;
        })
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

      rightList = this.getEmojiImageList(
        undefined,
        this.handleRightEmojiClicked,
        selectedLeftEmoji
      );
    }
    // Both are selected, show the single combo
    else {
      showOneCombo = true;
      var combo = findValidEmojiCombo(selectedLeftEmoji, selectedRightEmoji);

      leftList = this.getEmojiImageList(
        selectedLeftEmoji,
        this.handleLeftEmojiClicked
      );

      middleList = (
        <ImageListItem>
          <img alt={combo.alt} src={combo.gStaticUrl} />
        </ImageListItem>
      );

      rightList = this.getEmojiImageList(
        selectedRightEmoji,
        this.handleRightEmojiClicked,
        selectedLeftEmoji
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
        }}
      >
        {/* Left Emoji List */}
        <Box
          sx={{
            overflowY: "auto",
            justifyItems: "center",
            flexGrow: "1",
            width: "33%",
          }}
        >
          <Input></Input>
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
            {leftList}
          </Box>

          <Paper
            sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="Random"
                icon={
                  <Typography
                    sx={{
                      fontFamily: "'Noto Emoji', sans-serif",
                      height: "24px",
                    }}
                  >
                    🎲
                  </Typography>
                }
              ></BottomNavigationAction>
            </BottomNavigation>
          </Paper>

          {/* Bulk Download Menu */}
          {selectedLeftEmoji !== "" ? (
            <Menu
              open={bulkDownloadMenu !== undefined}
              onClose={() => {
                this.setState({ bulkDownloadMenu: undefined });
              }}
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
              <MenuItem>
                <LoadingButton
                  loading={bulkDownloading}
                  loadingPosition="start"
                  startIcon={<Download fontSize="small" />}
                  onClick={this.handleBulkDownload}
                >
                  Bulk Download
                </LoadingButton>
              </MenuItem>
            </Menu>
          ) : undefined}
        </Box>

        {/* Middle Combination List */}
        <Box
          sx={{
            mx: 3,
            overflowY: "auto",
            justifyItems: "center",
            flexGrow: "1",
            width: "33%",
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
          </Box>
        </Box>

        {/* Right Emoji List */}
        <Box
          sx={{
            overflowY: "auto",
            justifyItems: "center",
            flexGrow: "1",
            width: "33%",
          }}
        >
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
            {rightList}
          </Box>

          <Paper
            sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation showLabels>
              <BottomNavigationAction label="Search" icon={<Search />} />
              <BottomNavigationAction
                label="Random"
                icon={
                  <Typography
                    sx={{
                      fontFamily: "'Noto Emoji', sans-serif",
                      height: "24px",
                    }}
                  >
                    🎲
                  </Typography>
                }
              ></BottomNavigationAction>
            </BottomNavigation>
          </Paper>
        </Box>
      </Container>
    );
  }

  handleLeftEmojiClicked(clickedEmoji: string, event: React.SyntheticEvent) {
    // If we're unsetting the left column, clear the right column too
    if (this.state.selectedLeftEmoji === clickedEmoji) {
      this.setState({
        selectedLeftEmoji: "",
        selectedRightEmoji: "",
      });
    }
    // Else we clicked another left emoji while both are selected, set the left column as selected and clear right column
    else if (
      this.state.selectedLeftEmoji !== "" &&
      this.state.selectedRightEmoji !== ""
    ) {
      this.setState({
        selectedLeftEmoji: clickedEmoji,
        selectedRightEmoji: "",
      });
    } else {
      this.setState({
        selectedLeftEmoji: clickedEmoji,
      });
    }
  }

  handleRightEmojiClicked(clickedEmoji: string, event: React.SyntheticEvent) {
    this.setState({
      selectedRightEmoji:
        clickedEmoji === this.state.selectedRightEmoji ? "" : clickedEmoji,
    });
  }

  getEmojiImageList(
    selectedEmoji?: string,
    onClickHandler?: (
      clickedEmoji: string,
      event: React.SyntheticEvent
    ) => void,
    filterToValidCombosFor?: string
  ): Array<JSX.Element> {
    const knownSupportedEmoji = getSupportedEmoji();
    return knownSupportedEmoji.map((emojiCodepoint) => {
      const data = getEmojiData(emojiCodepoint);

      // Every emoji is considered valid unless we pass in one-half of the pair to filter on
      var isValidCombo = true;
      if (filterToValidCombosFor) {
        // Find the pairs where the emoji we're on is either on the left or right side of the combinations for this emoji
        isValidCombo = getEmojiData(filterToValidCombosFor).combinations.some(
          (c) => {
            // If we're on the double emoji combo, both sides need to be equal to be valid
            if (data.emojiCodepoint === filterToValidCombosFor) {
              return (
                data.emojiCodepoint === c.leftEmojiCodepoint &&
                data.emojiCodepoint === c.rightEmojiCodepoint
              );
            }

            // Otherwise, being on either side is valid
            return (
              data.emojiCodepoint === c.leftEmojiCodepoint ||
              data.emojiCodepoint === c.rightEmojiCodepoint
            );
          }
        );
      }

      // Handle complex enable/disable behavior -- due to needing to restrict certain invalid combinations
      var onClick: (clickedEmoji: string, event: React.SyntheticEvent) => void;
      var opacity: number;
      if (isValidCombo && onClickHandler) {
        onClick = onClickHandler;
        opacity = 1;
      } else {
        onClick = () => {};
        opacity = 0.2;
      }

      return (
        <div
          key={data.alt}
          onContextMenu={
            selectedEmoji === data.emojiCodepoint
              ? this.handleBulkDownloadMenuOpen
              : () => {}
          }
        >
          <ImageListItem
            onClick={(event) => onClick(data.emojiCodepoint, event)}
            sx={{
              p: 0.5,
              borderRadius: 2,
              opacity: opacity,
              backgroundColor: (theme) =>
                selectedEmoji === data.emojiCodepoint
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

  handleBulkDownloadMenuOpen(event: React.MouseEvent) {
    event.preventDefault();
    this.setState({
      bulkDownloadMenu:
        this.state.bulkDownloadMenu === undefined
          ? {
              mouseX: event.clientX - 2,
              mouseY: event.clientY - 4,
            }
          : undefined,
    });
  }

  async handleBulkDownload() {
    try {
      const zip = new JSZip();
      const data = getEmojiData(this.state.selectedLeftEmoji);
      const photoZip = zip.folder(data.alt);

      this.setState({ bulkDownloading: true });

      for (var i = 0; i < data.combinations.length; i++) {
        const combo = data.combinations[i];
        const comboBlob = (
          await axios.get(
            `https://backend.emojikitchen.dev?imageSource=${combo.gStaticUrl}`,
            {
              responseType: "blob",
            }
          )
        ).data;
        photoZip?.file(`${combo.alt}.png`, comboBlob);
      }

      const archive = await zip.generateAsync({ type: "blob" });
      saveAs(archive, data.alt);

      this.setState({ bulkDownloadMenu: undefined, bulkDownloading: false });
    } catch (e) {
      this.setState({ bulkDownloadMenu: undefined, bulkDownloading: false });
    }
  }
}
