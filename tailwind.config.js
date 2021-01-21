const primary10 = "#392775"
const primary9 = "#45398c"
const primary8 = "#4D4398"
const primary7 = "#564da4"
const primary6 = "#5c55ae"
const primary5 = "#716fba"
const primary4 = "#898ac7"
const primary3 = "#aaabd7"
const primary2 = "#cbcce8"
const primary1 = "#eaebf5"
const secondary10 = "#282561"
const secondary9 = "#37306f"
const secondary8 = "#403679"
const secondary7 = "#4a3e82"
const secondary6 = "#514387"
const secondary5 = "#695c98"
const secondary4 = "#8277aa"
const secondary3 = "#a59dc2"
const secondary2 = "#c8c4da"
const secondary1 = "#e9e7f0"
const gray10 = "#232529"
const gray9 = "#44464b"
const gray8 = "#63666a"
const gray7 = "#787a7f"
const gray6 = "#a1a3a9"
const gray5 = "#bfc2c7"
const gray4 = "#e2e4ea"
const gray3 = "#eff1f7"
const gray2 = "#f3f6fc"
const gray1 = "#f8fbff"
const blue = "#4E88A8"
const darkgreen = "#346B4F"
const lightgreen = "#5D853E"
const yellow = "#E6D56A"
const darkbrown = "#703E38"
const lightbrown = "#8A6C45"
const purple = "#9C57A8"

module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
    },
    colors: {
      primary: {
        DEFAULT: primary8,
        100: primary10,
        90: primary9,
        80: primary8,
        70: primary7,
        60: primary6,
        50: primary5,
        40: primary4,
        30: primary3,
        20: primary2,
        10: primary1,
      },
      secondary: {
        DEFAULT: secondary5,
        100: secondary10,
        90: secondary9,
        80: secondary8,
        70: secondary7,
        60: secondary6,
        50: secondary5,
        40: secondary4,
        30: secondary3,
        20: secondary2,
        10: secondary1,
      },
      gray: {
        DEFAULT: gray10,
        100: gray10,
        90: gray9,
        80: gray8,
        70: gray7,
        60: gray6,
        50: gray5,
        40: gray4,
        30: gray3,
        20: gray2,
        10: gray1,
      },
      black: "#000000",
      white: "#ffffff",
      background: gray5,
      font: {
        dark: gray10,
        DEFAULT: gray7,
        light: gray6,
        accent: {
          primary: "#5c55ae",
          secondary: "#8277aa",
        },
      },
      caution: {
        primary: "#D91C0B",
        secondary: "#F7D2CE",
        teriary: "#FDF4F3",
      },
      focus: "#175ce6",
      blue,
      yellow,
      darkgreen,
      lightgreen,
      darkbrown,
      lightbrown,
      purple,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    gridTemplateColumns: false,
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
    gridTemplateRows: false,
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false,
    gridAutoFlow: false,
    gridAutoColumns: false,
    gridAutoRows: false,
    gap: false,
  },
}
