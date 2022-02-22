var axios = require("axios");
var fs = require("fs");

var knownSupportedDates = [
  "20201001",
  "20210218",
  "20210521",
  "20210831",
  "20211115",
  "20220110",
  "20220203",
];

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
  "1f62e-200d-1f4a8", // 😮‍💨
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
  "1f636-200d-1f32b-fe0f", // 😶‍🌫️
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
  "2764-fe0f", // ❤️
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
  "2764-fe0f-200d-1fa79", // ❤️‍🩹
  "1f494", // 💔
  "1f48b", // 💋
  "1f9a0", // 🦠
  "1f480", // 💀
  "1f440", // 👀
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
  "1f42f", // 🐯
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
  "1f947", // 🥇
  "1f948", // 🥈
  "1f949", // 🥉
  "1f3c5", // 🏅
  "1f396-fe0f", // 🎖
  "1f3c6", // 🏆
  "1fa84", // 🪄
  "1f3a7", // 🎧
  "1f451", // 👑
  "1f48e", // 💎
  "1f4f0", // 📰
  "1f52e", // 🔮
];

// Potential formats are ${rootUrl}/${potentialDate}/${leftEmoji}/${leftEmoji}_${rightEmoji}.png
var rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

function printableEmoji(emoji) {
  return String.fromCodePoint(...emoji.split("-").map((p) => `0x${p}`));
}

function googleRequestEmoji(emoji) {
  return emoji
    .split("-")
    .map((part) => `u${part.toLowerCase()}`)
    .join("-");
}

async function getKitchenSink() {
  // Load up existing data, if any
  var outputData = JSON.parse(fs.readFileSync("emojiOutput.json"));

  // There's no real pattern to the dates the images are found at, so try all the ones I know about
  for (var d = 0; d < knownSupportedDates.length; d++) {
    var date = knownSupportedDates[d];

    for (var i = 0; i < knownSupportedEmoji.length; i++) {
      var leftEmojiCodepoint = knownSupportedEmoji[i];
      var leftRequestEmoji = googleRequestEmoji(leftEmojiCodepoint);

      // Check all the pairwise possibilites...
      for (var j = 0; j < knownSupportedEmoji.length; j++) {
        var rightEmojiCodepoint = knownSupportedEmoji[j];
        var rightRequestEmoji = googleRequestEmoji(rightEmojiCodepoint);

        // ...unless we've already found this pair in the past
        if (
          leftEmojiCodepoint in outputData &&
          outputData[leftEmojiCodepoint].some(
            (x) =>
              x.leftEmoji === leftEmojiCodepoint &&
              x.rightEmoji === rightEmojiCodepoint &&
              x.date === date
          )
        ) {
          console.log(
            `Skipping request for ${printableEmoji(
              leftEmojiCodepoint
            )} x ${printableEmoji(rightEmojiCodepoint)}`
          );
          continue;
        }

        try {
          process.stdout.write(
            `(${d + 1}/${knownSupportedDates.length}) (${i + 1}/${
              knownSupportedEmoji.length
            }) (${j + 1}/${
              knownSupportedEmoji.length
            }) Sending request to: ${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png for ${printableEmoji(
              leftEmojiCodepoint
            )} x ${printableEmoji(rightEmojiCodepoint)} => `
          );

          // Attempt to download, if it doesn't exist, this will throw a 404 exception, caught below
          var response = await axios.get(
            `${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png`,
            {
              responseType: "stream",
              timeout: 5000,
            }
          );

          console.log(response.status ?? 200);

          // New pair found, add data to persistent store to save later
          outputData[leftEmojiCodepoint] = [
            ...(outputData[leftEmojiCodepoint] ?? []),
            {
              leftEmoji: leftEmojiCodepoint,
              rightEmoji: rightEmojiCodepoint,
              date: date,
            },
          ];

          // Also add data to flip side, so each key has a reference to all possible combinations
          // But the left/right ordering is the same (and important to keep straight!)
          if (leftEmojiCodepoint !== rightEmojiCodepoint) {
            outputData[rightEmojiCodepoint] = [
              ...(outputData[rightEmojiCodepoint] ?? []),
              {
                leftEmoji: leftEmojiCodepoint,
                rightEmoji: rightEmojiCodepoint,
                date: date,
              },
            ];
          }

          // Download emoji
          response.data.pipe(
            fs.createWriteStream(
              `downloads/${leftRequestEmoji}_${rightRequestEmoji}.png`
            )
          );
        } catch (e) {
          if (e.response) {
            console.log(e.response.status);
          }
        }
      }
    }
  }

  // Save generated data
  fs.writeFileSync("emojiOutput.json", JSON.stringify(outputData));
}

getKitchenSink();
