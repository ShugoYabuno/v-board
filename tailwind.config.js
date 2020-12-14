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
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        focus: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
      },
    },
    colors: {
      primary: {
        DEFAULT: primary8,
        10: primary10,
        9: primary9,
        8: primary8,
        7: primary7,
        6: primary6,
        5: primary5,
        4: primary4,
        3: primary3,
        2: primary2,
        1: primary1,
      },
      secondary: {
        DEFAULT: secondary5,
        10: secondary10,
        9: secondary9,
        8: secondary8,
        7: secondary7,
        6: secondary6,
        5: secondary5,
        4: secondary4,
        3: secondary3,
        2: secondary2,
        1: secondary1,
      },
      gray: {
        10: gray10,
        9: gray9,
        8: gray8,
        7: gray7,
        6: gray6,
        5: gray5,
        4: gray4,
        3: gray3,
        2: gray2,
        1: gray1,
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
