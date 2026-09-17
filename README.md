# 🧑‍🍳 Emoji Kitchen

This repository contains the source code for the website [https://emojikitchen.dev](https://emojikitchen.dev).

This website allows for quick and easy browsing of the comprehensive list of supported emoji mashups as part of Google's [Emoji Kitchen](https://emojipedia.org/emoji-kitchen/).

There are currently over 100,000 possible valid combinations showcasing the unique illustrations and combined emoji!

## Getting Started

This repository leverages [VSCode's devcontainer](https://code.visualstudio.com/docs/remote/containers) feature to ensure all necessary dependencies are available inside the container for development.

### Application

To get started, download the supporting metadata into `public/` (so the app can load it at runtime), then install and start the project:

```bash
curl -L --compressed https://raw.githubusercontent.com/xsalazar/emoji-kitchen-backend/main/app/metadata.json -o public/metadata.json
npm install && npm start
```

The metadata is loaded asynchronously after the app, which keeps the initial JavaScript bundle small and improves startup time.

This will start the application on your local machine, running on [http://localhost:5173/](http://localhost:5173).

### Deployments

All application deployments are managed via GitHub Actions and the [`./.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) workflow.

Additionally, application dependencies are automatically managed and updated via Dependabot and the [`./.github/workflows/automerge-dependabot.yml`](./.github/workflows/automerge-dependabot.yml) workflow.


## 🌐 Web Resources & Aesthetic Symbols Index
- [AQUARIUS ZODIAC WATER BEARER](https://vintage-lace-symbols-54.pages.dev/symbol/aquarius-zodiac-water-bearer/)
- [SYM 26B9](https://dark-poetry-fonts-30.pages.dev/symbol/sym-26b9/)
- [MUSIC FLAT SIGN](https://gothic-bio-fonts-98.pages.dev/symbol/music-flat-sign/)
- [SYM 1F920](https://anime-sparkle-text-22.pages.dev/symbol/sym-1f920/)
- [ARROWS LINES](https://clean-dot-aesthetic-48.pages.dev/vi/arrows-lines/)
- [SYM 2655](https://cute-face-emoticons-66.pages.dev/symbol/sym-2655/)
- [TABLE FLIP RAGE KAOMOJI](https://theeduplaycampen.pages.dev/symbol/table-flip-rage-kaomoji/)
- [SYM 1F639](https://angelic-bow-symbols-42.pages.dev/symbol/sym-1f639/)
- [SYM 1D419](https://clean-dot-aesthetic-48.pages.dev/symbol/sym-1d419/)
- [SYM 1D436](https://alchemical-symbol-hub-52.pages.dev/symbol/sym-1d436/)
- [SYM 1F630](https://classic-literature-symbols-64.pages.dev/symbol/sym-1f630/)
- [WATER BUBBLES](https://vintage-lace-symbols-65.pages.dev/symbol/water-bubbles/)
- [SYM 2764 FE0F](https://clean-dot-aesthetic-48.pages.dev/symbol/sym-2764-fe0f/)
- [TRENDING](https://techno-hacker-text-43.pages.dev/ru/trending/)
- [SYM 1D491](https://sleek-line-symbols-51.pages.dev/symbol/sym-1d491/)
- [SYM 1F97A](https://minimal-star-symbols-54.pages.dev/symbol/sym-1f97a/)
- [SWIMMING FISH RIGHT](https://classic-literature-symbols-64.pages.dev/symbol/swimming-fish-right/)
- [SYM 2635](https://neon-glitch-symbols-84.pages.dev/symbol/sym-2635/)
- [SYM 2640](https://sleek-unicode-art-69.pages.dev/symbol/sym-2640/)
- [SYM 1F970](https://manga-speech-symbols-95.pages.dev/symbol/sym-1f970/)
- [WHITE FLORETTE BLOSSOM](https://baroque-unicode-decor-43.pages.dev/symbol/white-florette-blossom/)
- [SYM 1F915](https://minimal-star-symbols-25.pages.dev/symbol/sym-1f915/)
- [SYM 1F60D](https://pastel-chibi-emotes-23.pages.dev/symbol/sym-1f60d/)
- [SYM 1D413](https://dolly-kaomoji-text-94.pages.dev/symbol/sym-1d413/)
- [DISCORD STATUS](https://nordic-minimal-fonts-67.pages.dev/vi/discord-status/)
- [SYM 26D8](https://anime-sparkle-text-14.pages.dev/symbol/sym-26d8/)
- [SYM 1D46A](https://anime-sparkle-text-14.pages.dev/symbol/sym-1d46a/)
- [RU](https://daintystar-font-studio-48.pages.dev/ru/)
- [SYM 1D418](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-1d418/)
- [TRENDING](https://coquette-aesthetic-symbols-63.pages.dev/trending/)
- [SYM 26E2](https://zen-aesthetic-fonts-87.pages.dev/symbol/sym-26e2/)
- [SYM 1F92E](https://kawaii-kaomoji-hub-93.pages.dev/symbol/sym-1f92e/)
- [SYM 1F922](https://cyberpunk-clan-tags-43.pages.dev/symbol/sym-1f922/)
- [ZODIAC CELESTIAL](https://vintage-library-rune-80.pages.dev/es/zodiac-celestial/)
- [SYM 1F976](https://witchy-runic-text-71.pages.dev/symbol/sym-1f976/)
- [SYM 1D480](https://lace-heart-kaomoji-64.pages.dev/symbol/sym-1d480/)
- [PISCES ZODIAC FISHES](https://ribbon-bow-unicode-18.pages.dev/symbol/pisces-zodiac-fishes/)
- [MUSIC WEATHER](https://neon-futuristic-symbols-62.pages.dev/music-weather/)
- [TRENDING](https://clean-dot-aesthetic-48.pages.dev/trending/)
- [SYM 26B4](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-26b4/)
- [DISCORD STATUS](https://clean-dot-aesthetic-48.pages.dev/discord-status/)
- [SYM 1F61D](https://gothic-bio-fonts-13.pages.dev/symbol/sym-1f61d/)
- [SYM 26EB](https://angelic-bow-symbols-42.pages.dev/symbol/sym-26eb/)
- [KAOMOJI](https://vintage-angel-text-38.pages.dev/ja/kaomoji/)
- [SUPER SHY BLUSHING KAOMOJI](https://kawaii-kaomoji-hub-93.pages.dev/symbol/super-shy-blushing-kaomoji/)
- [DISCORD STATUS](https://ribbon-bow-unicode-18.pages.dev/pt/discord-status/)
- [SYM 1D472](https://nordic-minimal-fonts-67.pages.dev/symbol/sym-1d472/)
- [SYM 26CA](https://coquette-aesthetic-symbols-62.pages.dev/symbol/sym-26ca/)
- [FIRST QUARTER WAXING MOON](https://chibi-emoticon-world-87.pages.dev/symbol/first-quarter-waxing-moon/)
- [FOUR POINT STAR SPARKLE](https://kawaii-kaomoji-hub-93.pages.dev/symbol/four-point-star-sparkle/)
- [RIGHT MATHEMATICAL WHITE SQUARE BRACKET](https://witchy-runic-text-71.pages.dev/symbol/right-mathematical-white-square-bracket/)
- [SINGLE EIGHTH MUSICAL NOTE](https://alchemical-symbol-hub-52.pages.dev/symbol/single-eighth-musical-note/)
- [SYM 26B7](https://moe-soft-emoticons-41.pages.dev/symbol/sym-26b7/)
- [SYM 1D486](https://cute-face-emoticons-66.pages.dev/symbol/sym-1d486/)
- [SYM 2764 FE0F 200D 1FA79](https://cute-face-emoticons-66.pages.dev/symbol/sym-2764-fe0f-200d-1fa79/)
- [SYM 26AD](https://academic-rune-text-25.pages.dev/symbol/sym-26ad/)
- [SYM 26FC](https://coquette-aesthetic-symbols-62.pages.dev/symbol/sym-26fc/)
- [COQUETTE BOW RIBBON](https://fairy-lace-symbols-92.pages.dev/symbol/coquette-bow-ribbon/)
- [SYM 1F970](https://sleek-bio-symbols-40.pages.dev/symbol/sym-1f970/)
- [AQUARIUS ZODIAC WATER BEARER](https://baroque-crown-unicode-60.pages.dev/symbol/aquarius-zodiac-water-bearer/)
- [ARROWS LINES](https://classic-literature-symbols-64.pages.dev/es/arrows-lines/)
- [UPWARD DIAGONAL ARROW](https://neon-futuristic-symbols-58.pages.dev/symbol/upward-diagonal-arrow/)
- [SYM 1D438](https://cyber-clan-tags-90.pages.dev/symbol/sym-1d438/)
- [SYM 2743](https://chibi-bunny-symbols-82.pages.dev/symbol/sym-2743/)
- [STARS](https://kawaii-kaomoji-hub-93.pages.dev/pt/stars/)
- [CUPID FEATHERY ARROW](https://baroque-crown-unicode-60.pages.dev/symbol/cupid-feathery-arrow/)
- [SYM 267A](https://anime-sparkle-text-95.pages.dev/symbol/sym-267a/)
- [SUPER SHY BLUSHING KAOMOJI](https://ribbon-bow-unicode-18.pages.dev/symbol/super-shy-blushing-kaomoji/)
- [SYM 2621](https://ribbon-bow-unicode-18.pages.dev/symbol/sym-2621/)
- [SYM 1D405](https://kawaii-kaomoji-hub-31.pages.dev/symbol/sym-1d405/)
- [TRENDING](https://kawaii-kaomoji-hub-93.pages.dev/pt/trending/)
- [SYM 1D435](https://scholarly-runes-text-68.pages.dev/symbol/sym-1d435/)
- [TRENDING](https://dark-literary-kaomoji-13.pages.dev/pt/trending/)
- [FREEFIRE NAMES](https://kawaii-kaomoji-hub-93.pages.dev/pt/freefire-names/)
- [SYM 2728](https://synthwave-text-art-35.pages.dev/symbol/sym-2728/)
- [SYM 1F617](https://angelic-bio-symbols-59.pages.dev/symbol/sym-1f617/)
- [SYM 2746](https://cyber-clan-tags-90.pages.dev/symbol/sym-2746/)
- [MUSIC FLAT SIGN](https://ribbon-bow-unicode-18.pages.dev/symbol/music-flat-sign/)
- [RU](https://classic-literature-symbols-64.pages.dev/ru/)
- [CURVED HEART BLOOMY](https://clean-dot-aesthetic-48.pages.dev/symbol/curved-heart-bloomy/)
- [EIGHT POINTED STAR](https://coquette-symbols.pages.dev/symbol/eight-pointed-star/)
- [SYM 26C9](https://coquette-aesthetic-symbols-52.pages.dev/symbol/sym-26c9/)
- [TIKTOK CAPTIONS](https://scholarly-runes-text-68.pages.dev/es/tiktok-captions/)
- [SYM 1D42B](https://zen-typography-hub-86.pages.dev/symbol/sym-1d42b/)
- [CURVED HEART BLOOMY](https://cyber-clan-tags-90.pages.dev/symbol/curved-heart-bloomy/)
- [SYM 1F62E 200D 1F4A8](https://neon-futuristic-symbols-62.pages.dev/symbol/sym-1f62e-200d-1f4a8/)
- [TAURUS ZODIAC BULL](https://witchy-runic-text-71.pages.dev/symbol/taurus-zodiac-bull/)
- [LEFT WHITE CORNER BRACKET](https://anime-sparkle-text-45.pages.dev/symbol/left-white-corner-bracket/)
- [SYM 2687](https://anime-sparkle-text-14.pages.dev/symbol/sym-2687/)
- [SYM 26CE](https://minimal-star-symbols-87.pages.dev/symbol/sym-26ce/)
- [SYM 1D471](https://vintage-lace-symbols-65.pages.dev/symbol/sym-1d471/)
- [RU](https://ribbon-bow-unicode-18.pages.dev/ru/)
- [SYM 26A6](https://cute-face-emoticons-66.pages.dev/symbol/sym-26a6/)
- [TENDER GENTLE TEAR KAOMOJI](https://classic-literature-symbols-64.pages.dev/symbol/tender-gentle-tear-kaomoji/)
- [SYM 1F618](https://witchy-runic-text-71.pages.dev/symbol/sym-1f618/)
- [ROTATED FLORAL HEART](https://minimal-star-symbols-87.pages.dev/symbol/rotated-floral-heart/)
- [RINGED PLANET SATURN](https://witchy-runic-text-71.pages.dev/symbol/ringed-planet-saturn/)
- [SYM 26CD](https://mecha-text-vault-91.pages.dev/symbol/sym-26cd/)
- [SYM 2749](https://coquette-aesthetic-symbols-52.pages.dev/symbol/sym-2749/)
- [RIGHT MATHEMATICAL WHITE SQUARE BRACKET](https://angelic-soft-text-59.pages.dev/symbol/right-mathematical-white-square-bracket/)
- [FREEFIRE NAMES](https://cyber-clan-tags-90.pages.dev/ru/freefire-names/)
- [SYM 1F615](https://angelic-soft-text-59.pages.dev/symbol/sym-1f615/)
- [FREEFIRE NAMES](https://clean-dot-aesthetic-48.pages.dev/ru/freefire-names/)
- [LOVING HEART EYES KAOMOJI](https://coquette-aesthetic-symbols-52.pages.dev/symbol/loving-heart-eyes-kaomoji/)
- [SYM 1D44D](https://nordic-minimal-fonts-67.pages.dev/symbol/sym-1d44d/)
- [OPEN CENTRE STAR](https://cyber-clan-tags-90.pages.dev/symbol/open-centre-star/)
- [SYM 2611](https://cute-face-emoticons-66.pages.dev/symbol/sym-2611/)
- [SYM 1D41B](https://arcane-symbol-vault-32.pages.dev/symbol/sym-1d41b/)
- [SYM 268B](https://coquette-aesthetic-symbols-52.pages.dev/symbol/sym-268b/)
- [SYM 26DF](https://matrix-terminal-fonts-30.pages.dev/symbol/sym-26df/)
- [BRACKETS](https://pink-ribbon-fonts-28.pages.dev/brackets/)
- [SYM 1D490](https://coquette-aesthetic-symbols-62.pages.dev/symbol/sym-1d490/)
- [SYM 1F47F](https://soft-bow-fonts-22.pages.dev/symbol/sym-1f47f/)
- [SYM 1D432](https://matrix-terminal-fonts-30.pages.dev/symbol/sym-1d432/)
- [SYM 2655](https://futuristic-gaming-fonts-52.pages.dev/symbol/sym-2655/)
- [KAOMOJI](https://neon-glitch-symbols-84.pages.dev/ja/kaomoji/)
- [KAOMOJI](https://ribbon-bow-unicode-18.pages.dev/pt/kaomoji/)
- [SYM 1D409](https://coquette-aesthetic-symbols-62.pages.dev/symbol/sym-1d409/)
- [ROBLOX NAMES](https://ribbon-bow-unicode-18.pages.dev/pt/roblox-names/)
- [BRACKETS](https://kawaii-kaomoji-hub-93.pages.dev/pt/brackets/)
- [SYM 1F92C](https://synthwave-text-art-35.pages.dev/symbol/sym-1f92c/)
- [SYM 1D471](https://sleek-line-symbols-51.pages.dev/symbol/sym-1d471/)
- [SYM 2732](https://anime-sparkle-text-14.pages.dev/symbol/sym-2732/)
- [SYM 1D40C](https://lace-heart-kaomoji-64.pages.dev/symbol/sym-1d40c/)
- [ROBLOX NAMES](https://cyber-clan-tags-90.pages.dev/vi/roblox-names/)
- [SYM 2749](https://clean-dot-aesthetic-48.pages.dev/symbol/sym-2749/)
- [FIRST QUARTER WAXING MOON](https://academic-rune-text-25.pages.dev/symbol/first-quarter-waxing-moon/)
- [SYM 1D45E](https://mecha-text-vault-91.pages.dev/symbol/sym-1d45e/)
- [SYM 1D483](https://pink-ribbon-fonts-28.pages.dev/symbol/sym-1d483/)
- [SYM 2684](https://neon-futuristic-symbols-62.pages.dev/symbol/sym-2684/)
