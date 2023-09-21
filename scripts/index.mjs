import axios from "axios";
import fs from "fs";
import pLimit from "p-limit";
import axiosRetry from "axios-retry";

// Global request configuration to create resilient network requests
// Necessary since Google will hold onto requests forever instead of rate-limiting or otherwise cancelling requests
var limit = pLimit(20);
axiosRetry(axios, {
  retries: 3,
  shouldResetTimeout: true,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === "ECONNABORTED"
    );
  },
});

var knownSupportedDates = [
  "20201001",
  "20210218",
  "20210521",
  "20210831",
  "20211115",
  "20220110",
  "20220203",
  "20220406",
  "20220506",
  "20220815",
  "20220823",
  "20221101",
  "20221107",
  "20230118",
  "20230126",
  "20230127",
  "20230216",
  "20230221",
  "20230301",
  "20230405",
  "20230418",
  "20230421",
  "20230426",
  "20230613",
  "20230803",
  "20230818",
  "20230821",
];

var knownSupportedEmoji = [
  "1fa84", // 🪄
  "1f600", // 😀
  "1f603", // 😃
  "1f604", // 😄
  "1f601", // 😁
  "1f606", // 😆
  "1f605", // 😅
  "1f602", // 😂
  "1f923", // 🤣
  "1f62d", // 😭
  "1f609", // 😉
  "1f617", // 😗
  "1f619", // 😙
  "1f61a", // 😚
  "1f618", // 😘
  "1f970", // 🥰
  "1f60d", // 😍
  "1f929", // 🤩
  "1f973", // 🥳
  "1f643", // 🙃
  "1f642", // 🙂
  "1f972", // 🥲
  "1f979", // 🥹
  "1f60b", // 😋
  "1f61b", // 😛
  "1f61d", // 😝
  "1f61c", // 😜
  "1f92a", // 🤪
  "1f607", // 😇
  "1f60a", // 😊
  "263a-fe0f", // ☺️
  "1f60f", // 😏
  "1f60c", // 😌
  "1f614", // 😔
  "1f611", // 😑
  "1f610", // 😐
  "1f636", // 😶
  "1fae1", // 🫡
  "1f914", // 🤔
  "1f92b", // 🤫
  "1fae2", // 🫢
  "1f92d", // 🤭
  "1f971", // 🥱
  "1f917", // 🤗
  "1fae3", // 🫣
  "1f631", // 😱
  "1f928", // 🤨
  "1f9d0", // 🧐
  "1f612", // 😒
  "1f644", // 🙄
  "1f62e-200d-1f4a8", // 😮‍💨
  "1f624", // 😤
  "1f620", // 😠
  "1f621", // 😡
  "1f92c", // 🤬
  "1f97a", // 🥺
  "1f61f", // 😟
  "1f625", // 😥
  "1f622", // 😢
  "2639-fe0f", // ☹️
  "1f641", // 🙁
  "1fae4", // 🫤
  "1f615", // 😕
  "1f910", // 🤐
  "1f630", // 😰
  "1f628", // 😨
  "1f627", // 😧
  "1f626", // 😦
  "1f62e", // 😮
  "1f62f", // 😯
  "1f632", // 😲
  "1f633", // 😳
  "1f92f", // 🤯
  "1f62c", // 😬
  "1f613", // 😓
  "1f61e", // 😞
  "1f616", // 😖
  "1f623", // 😣
  "1f629", // 😩
  "1f62b", // 😫
  "1f635", // 😵
  "1fae5", // 🫥
  "1f634", // 😴
  "1f62a", // 😪
  "1f924", // 🤤
  "1f31b", // 🌛
  "1f31c", // 🌜
  "1f31a", // 🌚
  "1f31d", // 🌝
  "1f31e", // 🌞
  "1fae0", // 🫠
  "1f636-200d-1f32b-fe0f", // 😶‍🌫️
  "1f974", // 🥴
  "1f975", // 🥵
  "1f976", // 🥶
  "1f922", // 🤢
  "1f92e", // 🤮
  "1f927", // 🤧
  "1f912", // 🤒
  "1f915", // 🤕
  "1f637", // 😷
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
  "1f47e", // 👾
  "1f916", // 🤖
  "1f479", // 👹
  "1f47a", // 👺
  "1f383", // 🎃
  "1f608", // 😈
  "1f47f", // 👿
  "1f525", // 🔥
  "1f4ab", // 💫
  "2b50", // ⭐
  "1f31f", // 🌟
  "1f4a5", // 💥
  "1f4af", // 💯
  "1fae7", // 🫧
  "1f573-fe0f", // 🕳️
  "1f38a", // 🎊
  "1fa77", // 🩷
  "2764-fe0f", // ❤️
  "1f9e1", // 🧡
  "1f49b", // 💛
  "1f49a", // 💚
  "1fa75", // 🩵
  "1f499", // 💙
  "1f49c", // 💜
  "1f90e", // 🤎
  "1fa76", // 🩶
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
  "1fac2", // 🫂
  "1f464", // 👤
  "1f465", // 👥
  "1f5e3-fe0f", // 🗣️
  "1f463", // 👣
  "1f9e0", // 🧠
  "1fac0", // 🫀
  "1fac1", // 🫁
  "1fa78", // 🩸
  "1f9a0", // 🦠
  "1f9b7", // 🦷
  "1f9b4", // 🦴
  "1f480", // 💀
  "1f440", // 👀
  "1f441-fe0f", // 👁️
  "1f444", // 👄
  "1fae6", // 🫦
  "1f44d", // 👍
  "1f937", // 🤷
  "1f490", // 💐
  "1f339", // 🌹
  "1f940", // 🥀
  "1f33a", // 🌺
  "1f337", // 🌷
  "1f338", // 🌸
  "1fab7", // 🪷
  "1f4ae", // 💮
  "1f3f5-fe0f", // 🏵️
  "1fabb", // 🪻
  "1f33b", // 🌻
  "1f33c", // 🌼
  "1f342", // 🍂
  "1f341", // 🍁
  "1f344", // 🍄
  "1f33e", // 🌾
  "1f331", // 🌱
  "1f33f", // 🌿
  "1f343", // 🍃
  "1f340", // 🍀
  "1fab4", // 🪴
  "1f335", // 🌵
  "1f334", // 🌴
  "1f333", // 🌳
  "1f332", // 🌲
  "1fab9", // 🪹
  "26f0-fe0f", // ⛰️
  "1f3d4-fe0f", // 🏔️
  "1fab5", // 🪵
  "1faa8", // 🪨
  "26c4", // ⛄
  "1f30a", // 🌊
  "1f32c-fe0f", // 🌬️
  "1f300", // 🌀
  "1f32a-fe0f", // 🌪️
  "1f30b", // 🌋
  "1f3de-fe0f", // 🏞️
  "1f3d6-fe0f", // 🏖️
  "26c5", // ⛅
  "2601-fe0f", // ☁️
  "1f327-fe0f", // 🌧️
  "1f329-fe0f", // 🌩️
  "1f4a7", // 💧
  "2602-fe0f", // ☂️
  "26a1", // ⚡
  "1f308", // 🌈
  "2604-fe0f", // ☄️
  "1f30c", // 🌌
  "1f30d", // 🌍
  "1fa90", // 🪐
  "1f648", // 🙈
  "1f435", // 🐵
  "1f981", // 🦁
  "1f42f", // 🐯
  "1f431", // 🐱
  "1f436", // 🐶
  "1f43a", // 🐺
  "1f43b", // 🐻
  "1f428", // 🐨
  "1f43c", // 🐼
  "1f42d", // 🐭
  "1f430", // 🐰
  "1f98a", // 🦊
  "1f99d", // 🦝
  "1f42e", // 🐮
  "1f437", // 🐷
  "1f984", // 🦄
  "1f422", // 🐢
  "1f438", // 🐸
  "1f429", // 🐩
  "1f410", // 🐐
  "1f98c", // 🦌
  "1f999", // 🦙
  "1f9a5", // 🦥
  "1f994", // 🦔
  "1f987", // 🦇
  "1f989", // 🦉
  "1f426", // 🐦
  "1f414", // 🐔
  "1fabf", // 🪿
  "1f54a-fe0f", // 🕊️
  "1f9a9", // 🦩
  "1f427", // 🐧
  "1f988", // 🦈
  "1f433", // 🐳
  "1f41f", // 🐟
  "1f99e", // 🦞
  "1f980", // 🦀
  "1f419", // 🐙
  "1f9aa", // 🦪
  "1fab8", // 🪸
  "1f982", // 🦂
  "1f577-fe0f", // 🕷️
  "1f41a", // 🐚
  "1f40c", // 🐌
  "1f997", // 🦗
  "1fab2", // 🪲
  "1fab3", // 🪳
  "1f41d", // 🐝
  "1f41e", // 🐞
  "1f98b", // 🦋
  "1f43e", // 🐾
  "1f353", // 🍓
  "1f352", // 🍒
  "1f34e", // 🍎
  "1f349", // 🍉
  "1f34a", // 🍊
  "1f96d", // 🥭
  "1f34d", // 🍍
  "1f34c", // 🍌
  "1f34b", // 🍋
  "1f348", // 🍈
  "1f350", // 🍐
  "1f95d", // 🥝
  "1fad2", // 🫒
  "1fad0", // 🫐
  "1f347", // 🍇
  "1f965", // 🥥
  "1f345", // 🍅
  "1f336-fe0f", // 🌶️
  "1fada", // 🫚
  "1f955", // 🥕
  "1f360", // 🍠
  "1f9c5", // 🧅
  "1f33d", // 🌽
  "1f966", // 🥦
  "1f952", // 🥒
  "1f96c", // 🥬
  "1fadb", // 🫛
  "1fad1", // 🫑
  "1f951", // 🥑
  "1f9c4", // 🧄
  "1f954", // 🥔
  "1fad8", // 🫘
  "1f330", // 🌰
  "1f95c", // 🥜
  "1f35e", // 🍞
  "1fad3", // 🫓
  "1f950", // 🥐
  "1f96f", // 🥯
  "1f9c7", // 🧇
  "1f95e", // 🥞
  "1f373", // 🍳
  "1f9c0", // 🧀
  "1f953", // 🥓
  "1f969", // 🥩
  "1f357", // 🍗
  "1f356", // 🍖
  "1f354", // 🍔
  "1f32d", // 🌭
  "1f96a", // 🥪
  "1f968", // 🥨
  "1f35f", // 🍟
  "1fad4", // 🫔
  "1f32e", // 🌮
  "1f32f", // 🌯
  "1f959", // 🥙
  "1f9c6", // 🧆
  "1f958", // 🥘
  "1f35d", // 🍝
  "1f96b", // 🥫
  "1fad5", // 🫕
  "1f963", // 🥣
  "1f957", // 🥗
  "1f372", // 🍲
  "1f35b", // 🍛
  "1f35c", // 🍜
  "1f363", // 🍣
  "1f364", // 🍤
  "1f961", // 🥡
  "1f35a", // 🍚
  "1f371", // 🍱
  "1f95f", // 🥟
  "1f362", // 🍢
  "1f359", // 🍙
  "1f358", // 🍘
  "1f365", // 🍥
  "1f361", // 🍡
  "1f960", // 🥠
  "1f367", // 🍧
  "1f368", // 🍨
  "1f366", // 🍦
  "1f967", // 🥧
  "1f370", // 🍰
  "1f36e", // 🍮
  "1f382", // 🎂
  "1f9c1", // 🧁
  "1f36d", // 🍭
  "1f36c", // 🍬
  "1f36b", // 🍫
  "1f369", // 🍩
  "1f36a", // 🍪
  "1f36f", // 🍯
  "1f9c2", // 🧂
  "1f9c8", // 🧈
  "1f37f", // 🍿
  "1f964", // 🥤
  "1f9cb", // 🧋
  "1f9c3", // 🧃
  "1f95b", // 🥛
  "1f37c", // 🍼
  "1f375", // 🍵
  "2615", // ☕
  "1fad6", // 🫖
  "1f9c9", // 🧉
  "1f942", // 🥂
  "1f37e", // 🍾
  "1f377", // 🍷
  "1fad7", // 🫗
  "1f379", // 🍹
  "1f376", // 🍶
  "1f962", // 🥢
  "1f37d-fe0f", // 🍽️
  "1f6d1", // 🛑
  "1f6a7", // 🚧
  "1f6a8", // 🚨
  "26fd", // ⛽
  "1f6df", // 🛟
  "2693", // ⚓
  "1f687", // 🚇
  "1f6a6", // 🚦
  "1f6f4", // 🛴
  "1f6b2", // 🚲
  "1f3cd-fe0f", // 🏍️
  "1f697", // 🚗
  "1f69a", // 🚚
  "1f69b", // 🚛
  "1f69c", // 🚜
  "1f3ce-fe0f", // 🏎️
  "1f695", // 🚕
  "1f68c", // 🚌
  "1f682", // 🚂
  "1f6f6", // 🛶
  "1f6a0", // 🚠
  "1f6a1", // 🚡
  "1f6f8", // 🛸
  "1f680", // 🚀
  "2708-fe0f", // ✈️
  "1f3a2", // 🎢
  "1f3a1", // 🎡
  "1f3a0", // 🎠
  "1f3aa", // 🎪
  "1f5fc", // 🗼
  "1f5ff", // 🗿
  "1f3db-fe0f", // 🏛️
  "1f3f0", // 🏰
  "1f3df-fe0f", // 🏟️
  "1f3da-fe0f", // 🏚️
  "1f3e0", // 🏠
  "1f3d5-fe0f", // 🏕️
  "1f307", // 🌇
  "1f3dd-fe0f", // 🏝️
  "1f6e3-fe0f", // 🛣️
  "1f9f3", // 🧳
  "1f388", // 🎈
  "1f380", // 🎀
  "1f381", // 🎁
  "1f386", // 🎆
  "1fa94", // 🪔
  "1faa9", // 🪩
  "1f397-fe0f", // 🎗️
  "1f947", // 🥇
  "1f948", // 🥈
  "1f949", // 🥉
  "1f3c5", // 🏅
  "1f396-fe0f", // 🎖️
  "1f3c6", // 🏆
  "26bd", // ⚽
  "26be", // ⚾
  "1f94e", // 🥎
  "1f3c0", // 🏀
  "1f3d0", // 🏐
  "1f3c8", // 🏈
  "1f3c9", // 🏉
  "1f3be", // 🎾
  "1f945", // 🥅
  "1f3f8", // 🏸
  "1f94d", // 🥍
  "1f3cf", // 🏏
  "1f3d1", // 🏑
  "1f3d2", // 🏒
  "1f94c", // 🥌
  "1f6f7", // 🛷
  "1f3bf", // 🎿
  "26f8-fe0f", // ⛸️
  "1f6fc", // 🛼
  "1fa70", // 🩰
  "1f6f9", // 🛹
  "26f3", // ⛳
  "1f3af", // 🎯
  "1f3f9", // 🏹
  "1f94f", // 🥏
  "1fa83", // 🪃
  "1fa81", // 🪁
  "1f3a3", // 🎣
  "1f93f", // 🤿
  "1f3bd", // 🎽
  "1f94b", // 🥋
  "1f94a", // 🥊
  "1f3b1", // 🎱
  "1f3d3", // 🏓
  "1f3b3", // 🎳
  "265f-fe0f", // ♟️
  "1fa80", // 🪀
  "1f9e9", // 🧩
  "1f3ae", // 🎮
  "1f3b2", // 🎲
  "1f3b0", // 🎰
  "1f3b4", // 🎴
  "1f004", // 🀄
  "1f0cf", // 🃏
  "1f4f7", // 📷
  "1f3a8", // 🎨
  "1f58c-fe0f", // 🖌️
  "1f58d-fe0f", // 🖍️
  "1faa1", // 🪡
  "1f9f5", // 🧵
  "1f9f6", // 🧶
  "1f3b9", // 🎹
  "1f3b7", // 🎷
  "1f3ba", // 🎺
  "1f3b8", // 🎸
  "1fa95", // 🪕
  "1f3bb", // 🎻
  "1fa98", // 🪘
  "1f941", // 🥁
  "1fa87", // 🪇
  "1fa88", // 🪈
  "1fa97", // 🪗
  "1f3a4", // 🎤
  "1f3a7", // 🎧
  "1f39a-fe0f", // 🎚️
  "1f39b-fe0f", // 🎛️
  "1f399-fe0f", // 🎙️
  "1f4fb", // 📻
  "1f4fa", // 📺
  "1f4fc", // 📼
  "1f39e-fe0f", // 🎞️
  "1f3ac", // 🎬
  "1f3ad", // 🎭
  "1f39f-fe0f", // 🎟️
  "1f4f1", // 📱
  "260e-fe0f", // ☎️
  "1f4df", // 📟
  "1f4e0", // 📠
  "1f50c", // 🔌
  "1f50b", // 🔋
  "1faab", // 🪫
  "1f4be", // 💾
  "1f4bf", // 💿
  "1f4bb", // 💻
  "1f5a8-fe0f", // 🖨️
  "1f4b8", // 💸
  "2696-fe0f", // ⚖️
  "1f6d2", // 🛒
  "1f6cd-fe0f", // 🛍️
  "1f4a1", // 💡
  "1f9f1", // 🧱
  "1f6cb-fe0f", // 🛋️
  "1f9f9", // 🧹
  "1f9fc", // 🧼
  "1fa92", // 🪒
  "1faae", // 🪮
  "1f9fa", // 🧺
  "1f9e6", // 🧦
  "1f455", // 👕
  "1f457", // 👗
  "1f393", // 🎓
  "1f452", // 👒
  "1f451", // 👑
  "1faad", // 🪭
  "1f45c", // 👜
  "1f48d", // 💍
  "1f48e", // 💎
  "1f460", // 👠
  "1f45f", // 👟
  "1f97f", // 🥿
  "1f9ea", // 🧪
  "1f321-fe0f", // 🌡️
  "1fa7a", // 🩺
  "1f9ec", // 🧬
  "1f52d", // 🔭
  "1f52c", // 🔬
  "1f9f2", // 🧲
  "1f6e0-fe0f", // 🛠️
  "26cf-fe0f", // ⛏️
  "2699-fe0f", // ⚙️
  "26d3-fe0f", // ⛓️
  "1f587-fe0f", // 🖇️
  "1f4cf", // 📏
  "1f5d1-fe0f", // 🗑️
  "1f58a-fe0f", // 🖊️
  "2712-fe0f", // ✒️
  "270f-fe0f", // ✏️
  "1f4da", // 📚
  "1f5c3-fe0f", // 🗃️
  "1f4ca", // 📊
  "1f4c8", // 📈
  "1f4c9", // 📉
  "2702-fe0f", // ✂️
  "1f4f0", // 📰
  "1f4e6", // 📦
  "1f5f3-fe0f", // 🗳️
  "231a", // ⌚
  "1f570-fe0f", // 🕰️
  "231b", // ⌛
  "23f3", // ⏳
  "23f0", // ⏰
  "1f514", // 🔔
  "1f4e3", // 📣
  "1f50e", // 🔎
  "1f52e", // 🔮
  "1f9ff", // 🧿
  "1f3fa", // 🏺
  "1faa4", // 🪤
  "1f5dd-fe0f", // 🗝️
  "1f512", // 🔒
  "2648", // ♈
  "2649", // ♉
  "264a", // ♊
  "264b", // ♋
  "264c", // ♌
  "264d", // ♍
  "264e", // ♎
  "264f", // ♏
  "2650", // ♐
  "2651", // ♑
  "2652", // ♒
  "2653", // ♓
  "26ce", // ⛎
  "2757", // ❗
  "2753", // ❓
  "2049-fe0f", // ⁉️
  "1f198", // 🆘
  "2668-fe0f", // ♨️
  "1f4f4", // 📴
  "1f508", // 🔈
  "2622-fe0f", // ☢️
  "2623-fe0f", // ☣️
  "26a0-fe0f", // ⚠️
  "267b-fe0f", // ♻️
  "2705", // ✅
  "1f195", // 🆕
  "1f193", // 🆓
  "1f199", // 🆙
  "1f197", // 🆗
  "1f192", // 🆒
  "1f522", // 🔢
  "1f6ae", // 🚮
  "262e-fe0f", // ☮️
  "262f-fe0f", // ☯️
  "267e-fe0f", // ♾️
  "2716-fe0f", // ✖️
  "2795", // ➕
  "2796", // ➖
  "2797", // ➗
  "27b0", // ➰
  "27bf", // ➿
  "3030-fe0f", // 〰️
  "00a9-fe0f", // ©️
  "00ae-fe0f", // ®️
  "2122-fe0f", // ™️
  "2660-fe0f", // ♠️
  "1f5ef-fe0f", // 🗯️
  "1f4ac", // 💬
];

var emojiOfInterest = [];

var shouldPruneData = false;

// Potential formats are ${rootUrl}/${potentialDate}/${leftEmoji}/${leftEmoji}_${rightEmoji}.png
var rootUrl = "https://www.gstatic.com/android/keyboard/emojikitchen";

/**
 * Converts and emoji codepoint into a printable emoji used for log statements
 * @param {string} emojiCodepoint
 * @returns {string}
 */
function printableEmoji(emojiCodepoint) {
  return String.fromCodePoint(
    ...emojiCodepoint.split("-").map((p) => `0x${p}`)
  );
}

/**
 * Converts an emoji codepoint value to its emoji used for Google URL Requests
 * @param {string} emojiCodepoint
 * @returns {string}
 */
function toGoogleRequestEmoji(emojiCodepoint) {
  return emojiCodepoint
    .split("-")
    .map((part) => `u${part.toLowerCase()}`)
    .join("-");
}

/**
 * Converts an emoji used in Google URL Requests to its emoji codepoint value
 * @param {string} googleRequestEmoji
 * @returns {string}
 */
function toEmojiCodepoint(googleRequestEmoji) {
  return googleRequestEmoji
    .split("-")
    .map((part) => part.replace("u", ""))
    .join("-");
}

/**
 * Sorts the output data based on the canonical ordering, derived from GBoard.
 * If duplicates exists, it subsorts based on date.
 * @param {{[key: string]: [{leftEmoji: string, rightEmoji: string, date: string}]}} outputData
 * @returns {{[key: string]: [{leftEmoji: string, rightEmoji: string, date: string}]}}
 */
function sortOutputData(outputData) {
  // Iterate through each key and sort the array of sub-values
  for (var i = 0; i < Object.entries(outputData).length; i++) {
    var kvps = Object.entries(outputData)[i];

    var key = kvps[0];
    var values = kvps[1];

    console.log(`Sorting ${printableEmoji(key)}`);

    var valuesWithSortOrder = values.map((v) => {
      // Inner sort is always on the emoji that's _not_ the top-level emoji
      var sortCodePoint = v.leftEmoji === key ? v.rightEmoji : v.leftEmoji;

      // Find the sort order from the reference list
      var sortOrder = knownSupportedEmoji.indexOf(sortCodePoint);

      return { ...v, sortOrder: sortOrder };
    });

    var sortedValues = valuesWithSortOrder
      .sort((e1, e2) => {
        return e1.sortOrder - e2.sortOrder || e1.date.localeCompare(e2.date);
      })
      .map((v) => {
        // Remove sort order from inner values
        return {
          leftEmoji: v.leftEmoji,
          rightEmoji: v.rightEmoji,
          date: v.date,
        };
      })
      .filter(
        (value, index, selfArray) =>
          index ===
          selfArray.findIndex(
            (v) =>
              v.leftEmoji === value.leftEmoji &&
              v.rightEmoji === value.rightEmoji &&
              v.date === value.date
          )
      );

    outputData[key] = sortedValues;
  }

  return outputData;
}

/**
 * Locally prunes data from any old entries that now return 404s.
 * Long running function
 * @param {{[key: string]: [{leftEmoji: string, rightEmoji: string, date: string}]}} outputData
 * @returns {Promise<{[key: string]: [{leftEmoji: string, rightEmoji: string, date: string}]}>}
 */
async function pruneData(outputData) {
  // Will hold the rebuilt data and return
  var locallyPrunedData = {};

  for (var i = 0; i < Object.entries(outputData).length; i++) {
    var kvps = Object.entries(outputData)[i];

    var key = kvps[0];
    var values = kvps[1];

    console.log(`Validating ${printableEmoji(key)}`);

    for (var j = 0; j < values.length; j++) {
      var value = values[j];
      var leftEmojiCodepoint = value.leftEmoji;
      var leftRequestEmoji = toGoogleRequestEmoji(leftEmojiCodepoint);
      var rightEmojiCodepoint = value.rightEmoji;
      var rightRequestEmoji = toGoogleRequestEmoji(rightEmojiCodepoint);
      var date = value.date;

      var res = await axios.get(
        `${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png`,
        {
          responseType: "arraybuffer",
          timeout: 5000,
          validateStatus: false,
        }
      );

      // Somehow invalid, skip
      if (res.status !== 200) {
        process.stdout.write(`x`);
        continue;
      } else {
        process.stdout.write(`.`);
      }

      locallyPrunedData[leftEmojiCodepoint] = [
        ...(locallyPrunedData[leftEmojiCodepoint] ?? []),
        {
          leftEmoji: leftEmojiCodepoint,
          rightEmoji: rightEmojiCodepoint,
          date: date,
        },
      ];

      // Also add data to flip side, so each key has a reference to all possible combinations
      // But the left/right ordering is the same (and important to keep straight!)
      if (leftEmojiCodepoint !== rightEmojiCodepoint) {
        locallyPrunedData[rightEmojiCodepoint] = [
          ...(locallyPrunedData[rightEmojiCodepoint] ?? []),
          {
            leftEmoji: leftEmojiCodepoint,
            rightEmoji: rightEmojiCodepoint,
            date: date,
          },
        ];
      }
    }

    console.log(`\n`);
  }

  return locallyPrunedData;
}

/**
 * Main function to generate all Emoji Kitchen data
 * Long running function
 */
async function getKitchenSink() {
  var outputData = {};

  // Load up existing data, if any
  if (fs.existsSync(`./emojiOutput.json`)) {
    outputData = JSON.parse(fs.readFileSync("emojiOutput.json"));
  }

  if (shouldPruneData) {
    // Prune the old data just for good measure
    outputData = await pruneData(outputData);
  }

  // There's no real pattern to the dates the images are found at, so try all the ones I know about
  for (var d = 0; d < knownSupportedDates.length; d++) {
    var date = knownSupportedDates[d];

    for (var i = 0; i < knownSupportedEmoji.length; i++) {
      var requests = [];
      var leftEmojiCodepoint = knownSupportedEmoji[i];
      var leftRequestEmoji = toGoogleRequestEmoji(leftEmojiCodepoint);

      // Check all the pairwise possibilities...
      for (var j = 0; j < knownSupportedEmoji.length; j++) {
        var rightEmojiCodepoint = knownSupportedEmoji[j];
        var rightRequestEmoji = toGoogleRequestEmoji(rightEmojiCodepoint);

        if (
          emojiOfInterest.length > 0 &&
          !(
            emojiOfInterest.includes(leftEmojiCodepoint) ||
            emojiOfInterest.includes(rightEmojiCodepoint)
          )
        ) {
          continue;
        }

        requests.push(
          limit(
            (rootUrl, date, leftRequestEmoji, rightRequestEmoji) => {
              return axios.get(
                `${rootUrl}/${date}/${leftRequestEmoji}/${leftRequestEmoji}_${rightRequestEmoji}.png`,
                {
                  responseType: "arraybuffer",
                  timeout: 5000,
                  validateStatus: false,
                }
              );
            },
            rootUrl,
            date,
            leftRequestEmoji,
            rightRequestEmoji
          )
        );
      }

      // Wait for all the requests
      var res = await Promise.all(requests);

      // Map and save all the results
      res.map((r) => {
        var parts = r.request.path.split("/");
        var date = parts[4];
        var leftRequestEmoji = parts[5];
        var leftEmojiCodepoint = toEmojiCodepoint(leftRequestEmoji);
        var rightRequestEmoji = parts[6].split(".")[0].split("_")[1];
        var rightEmojiCodepoint = toEmojiCodepoint(rightRequestEmoji);

        console.log(
          `${printableEmoji(leftEmojiCodepoint)} x ${printableEmoji(
            rightEmojiCodepoint
          )} @ ${date} => ${r.status}`
        );

        // Invalid combo, move on
        if (r.status == 404) {
          return;
        }

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
        fs.writeFileSync(
          `downloads/${leftRequestEmoji}_${rightRequestEmoji}_${date}.png`,
          r.data
        );
      });
    }
  }

  var sortedOutputData = sortOutputData(outputData);

  // Save generated data
  fs.writeFileSync("emojiOutput.json", JSON.stringify(sortedOutputData));
}

getKitchenSink();
