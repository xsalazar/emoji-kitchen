import {
  createTheme,
  Grid,
  ImageList,
  ImageListItem,
  Box,
} from "@mui/material";
import { imageListItemClasses } from "@mui/material/ImageListItem";
import React from "react";
import emojiData from "./emojiData.json";

interface KitchenProps {}

interface KitchenState {
  leftSink: string;
  rightSink: string;
  emojiData: EmojiData;
}

export default class Kitchen extends React.Component<
  KitchenProps,
  KitchenState
> {
  constructor(props: KitchenProps) {
    super(props);
    this.state = {
      leftSink: "",
      rightSink: "",
      emojiData: emojiData,
    };
    this.handleLeftEmojiClicked = this.handleLeftEmojiClicked.bind(this);
    this.handleRightEmojiClicked = this.handleRightEmojiClicked.bind(this);
  }

  render(): React.ReactNode {
    var rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

    var knownSupportedEmoji = [
      "1f600", // 😀
      "1f603", // 😃
      "1f604", // 😄
      "1f601", // 😁
      "1f606", // 😆
      "1f605", // 😅
      "1f602", // 😂
      "1f923", // 🤣
      "1f62d", // 😭
      "1f617", // 😗
      "1f619", // 😙
      "1f61a", // 😚
      "1f618", // 😘
      "1f970", // 🥰
      "1f60d", // 😍
      "1f929", // 🤩
      "1f973", // 🥳
      "1f917", // 🤗
      "1f643", // 🙃
      "1f642", // 🙂
      "1f972", // 🥲
      "1f979", // 🥹
      "263a-fe0f", // ☺️
      "1f60a", // 😊
      "1f60f", // 😏
      "1f60c", // 😌
      "1f609", // 😉
      "1fae2", // 🫢
      "1f92d", // 🤭
      "1f636", // 😶
      "1f610", // 😐
      "1f611", // 😑
      "1f614", // 😔
      "1f60b", // 😋
      "1f61b", // 😛
      "1f61d", // 😝
      "1f61c", // 😜
      "1f92a", // 🤪
      "1fae1", // 🫡
      "1f914", // 🤔
      "1f928", // 🤨
      "1f9d0", // 🧐
      "1f644", // 🙄
      "1f612", // 😒
      "1f624", // 😤
      "1f620", // 😠
      "1f621", // 😡
      "1f92c", // 🤬
      "2639-fe0f", // ☹️
      "1f641", // 🙁
      "1fae4", // 🫤
      "1f615", // 😕
      "1f61f", // 😟
      "1f97a", // 🥺
      "1f633", // 😳
      "1f62c", // 😬
      "1f910", // 🤐
      "1f92b", // 🤫
      "1f630", // 😰
      "1f628", // 😨
      "1f627", // 😧
      "1f626", // 😦
      "1f62e", // 😮
      "1f62f", // 😯
      "1f632", // 😲
      "1fae3", // 🫣
      "1f631", // 😱
      "1f92f", // 🤯
      "1f622", // 😢
      "1f625", // 😥
      "1f613", // 😓
      "1f61e", // 😞
      "1f616", // 😖
      "1f623", // 😣
      "1f629", // 😩
      "1f62b", // 😫
      "1f924", // 🤤
      "1f971", // 🥱
      "1f634", // 😴
      "1f62a", // 😪
      "1f31b", // 🌛
      "1f31c", // 🌜
      "1f31e", // 🌞
      "1f922", // 🤢
      "1f92e", // 🤮
      "1f927", // 🤧
      "1f912", // 🤒
      "1f915", // 🤕
      "1f974", // 🥴
      "1fae0", // 🫠
      "1fae5", // 🫥
      "1f635", // 😵
      "1f975", // 🥵
      "1f976", // 🥶
      "1f637", // 😷
      "1f607", // 😇
      "1f920", // 🤠
      "1f911", // 🤑
      "1f60e", // 😎
      "1f913", // 🤓
      "1f978", // 🥸
      "1f925", // 🤥
      "1f921", // 🤡
      "1f47b", // 👻
      "1f4a9", // 💩
      "1f47d", // 👽
      "1f916", // 🤖
      "1f383", // 🎃
      "1f608", // 😈
      "1f47f", // 👿
      "1f525", // 🔥
      "1f4ab", // 💫
      "2b50", // ⭐
      "1f31f", // 🌟
      "1f4af", // 💯
      "1f573-fe0f", // 🕳️
      "1f38a", // 🎊
      "1f9e1", // 🧡
      "1f49b", // 💛
      "1f49a", // 💚
      "1f499", // 💙
      "1f49c", // 💜
      "1f90e", // 🤎
      "1f5a4", // 🖤
      "1f90d", // 🤍
      "2665-fe0f", // ♥️
      "1f498", // 💘
      "1f49d", // 💝
      "1f496", // 💖
      "1f497", // 💗
      "1f493", // 💓
      "1f49e", // 💞
      "1f495", // 💕
      "1f48c", // 💌
      "1f49f", // 💟
      "2763-fe0f", // ❣️
      "2764-fe0f", // ❤️
      "1f494", // 💔
      "1f48b", // 💋
      "1f9a0", // 🦠
      "1f480", // 💀
      "1f441-fe0f", // 👁️
      "1f490", // 💐
      "1f339", // 🌹
      "1f337", // 🌷
      "1f338", // 🌸
      "1f33c", // 🌼
      "1f335", // 🌵
      "1f332", // 🌲
      "1fab5", // 🪵
      "1f32a-fe0f", // 🌪️
      "26c4", // ⛄
      "2601-fe0f", // ☁️
      "1f308", // 🌈
      "1f30d", // 🌍
      "1f648", // 🙈
      "1f435", // 🐵
      "1f981", // 🦁
      "1f431", // 🐱
      "1f436", // 🐶
      "1f43b", // 🐻
      "1f428", // 🐨
      "1f43c", // 🐼
      "1f42d", // 🐭
      "1f430", // 🐰
      "1f99d", // 🦝
      "1f437", // 🐷
      "1f984", // 🦄
      "1f422", // 🐢
      "1f429", // 🐩
      "1f410", // 🐐
      "1f98c", // 🦌
      "1f999", // 🦙
      "1f9a5", // 🦥
      "1f994", // 🦔
      "1f987", // 🦇
      "1f426", // 🐦
      "1f989", // 🦉
      "1f427", // 🐧
      "1f41f", // 🐟
      "1f419", // 🐙
      "1f982", // 🦂
      "1f577-fe0f", // 🕷️
      "1f40c", // 🐌
      "1f41d", // 🐝
      "1f353", // 🍓
      "1f34a", // 🍊
      "1f34d", // 🍍
      "1f34c", // 🍌
      "1f34b", // 🍋
      "1f336-fe0f", // 🌶️
      "1f951", // 🥑
      "1f35e", // 🍞
      "1f9c0", // 🧀
      "1f32d", // 🌭
      "1f382", // 🎂
      "1f9c1", // 🧁
      "2615", // ☕
      "1f37d-fe0f", // 🍽️
      "1f307", // 🌇
      "1f388", // 🎈
      "1f381", // 🎁
      "1f397-fe0f", // 🎗️
      "1f3c6", // 🏆
      "1fa84", // 🪄
      "1f3a7", // 🎧
      "1f451", // 👑
      "1f48e", // 💎
      "1f4f0", // 📰
      "1f52e", // 🔮
    ];

    var middleList;
    if (this.state.leftSink !== "" && this.state.rightSink === "") {
      middleList = this.state.emojiData[this.state.leftSink].map((combo) => {
        return (
          <ImageListItem>
            <img
              src={`${rootUrl}/${combo.date}/${this.googleRequestEmoji(
                combo.leftEmoji
              )}/${this.googleRequestEmoji(
                combo.leftEmoji
              )}_${this.googleRequestEmoji(combo.rightEmoji)}.png`}
            />
          </ImageListItem>
        );
      });
    } else if (this.state.leftSink !== "" && this.state.rightSink !== "") {
      middleList = (
        <ImageListItem>
          <img
            src={`${rootUrl}/${
              this.state.emojiData[this.state.leftSink][0].date
            }/${this.googleRequestEmoji(
              this.state.leftSink
            )}/${this.googleRequestEmoji(
              this.state.leftSink
            )}_${this.googleRequestEmoji(this.state.rightSink)}.png`}
          />
        </ImageListItem>
      );
    } else {
      middleList = <div></div>;
    }

    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 350,
          md: 650,
          lg: 900,
          xl: 1200,
        },
      },
    });

    return (
      <Grid container>
        <Grid item xs={4} sx={{ backgroundColor: "lightblue" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(8, 1fr)",
                xl: "repeat(8, 1fr)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {knownSupportedEmoji.map((emojiCodepoint) => {
              return (
                <ImageListItem
                  key={emojiCodepoint}
                  onClick={(event) =>
                    this.handleLeftEmojiClicked(emojiCodepoint, event)
                  }
                  sx={{
                    p: 1,
                    m: 0.5,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      emojiCodepoint === this.state.leftSink
                        ? theme.palette.action.selected
                        : theme.palette.background.default,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${emojiCodepoint
                      .split("-")[0]
                      .replaceAll("-", "_")}.svg`}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: "lightgreen" }}>
          <ImageList cols={4} gap={8}>
            {middleList}
          </ImageList>
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: "lightblue" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(8, 1fr)",
                xl: "repeat(8, 1fr)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {" "}
            {knownSupportedEmoji.map((emojiCodepoint) => {
              return (
                <ImageListItem
                  key={emojiCodepoint}
                  onClick={(event) =>
                    this.handleRightEmojiClicked(emojiCodepoint, event)
                  }
                  sx={{
                    p: 1,
                    m: 0.5,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                      emojiCodepoint === this.state.rightSink
                        ? theme.palette.action.selected
                        : theme.palette.background.default,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u${emojiCodepoint
                      .split("-")[0]
                      .replaceAll("-", "_")}.svg`}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    );
  }

  // this.state.leftSink !== "" && this.state.rightSink !== "" ? (
  // <img
  //   src={`${rootUrl}/${
  //     this.state.emojiData[this.state.leftSink][0].date
  //   }/u${this.state.leftSink}/u${this.state.leftSink}_u${
  //     this.state.rightSink
  //   }.png`}
  // />
  // ) : (
  //   <div></div>
  // )

  googleRequestEmoji(emoji: string): string {
    return emoji
      .split("-")
      .map((part: string) => `u${part.toLowerCase()}`)
      .join("-");
  }

  handleLeftEmojiClicked(clickedEmoji: string, event: React.SyntheticEvent) {
    this.setState({
      leftSink: clickedEmoji === this.state.leftSink ? "" : clickedEmoji,
    });
  }

  handleRightEmojiClicked(clickedEmoji: string, event: React.SyntheticEvent) {
    this.setState({
      rightSink: clickedEmoji === this.state.rightSink ? "" : clickedEmoji,
    });
  }
}

interface EmojiData {
  [emojiCodepoint: string]: EmojiCombo[];
}

interface EmojiCombo {
  leftEmoji: string;
  rightEmoji: string;
  date: string;
}
