module.exports = {
  // mode: "universal",
  /*
   ** Headers of the page
   */
  target: "static",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    // "~/assets/scss/_index.scss"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/localStorage.js",
      mode: "client"
    },
    {
      src: "~/utils/functions.js",
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    // [
    //   "@nuxtjs/dotenv",
    //   {
    //     path: "./config/",
    //     filename:
    //       process.env.NODE_ENV === "production"
    //         ? ".env.prod"
    //         : process.env.NODE_ENV === "staging"
    //         ? ".env.stg"
    //         : process.env.NODE_ENV === "remote_development"
    //         ? ".env.dev"
    //         : ".env.local",
    //   },
    // ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
  ],
  styleResources: {
    // scss: ["~/assets/scss/_index.scss"],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isServer }) {
      if ( isServer ) {
        config.externals = {
          "@firebase/app": "commonjs @firebase/app",
          "@firebase/firestore": "commonjs @firebase/firestore",
          //etc...
        }
      }
    },
    postcss: {
      // キーとしてプラグイン名を、値として引数を追加します
      // プラグインは前もって npm か yarn で dependencies としてインストールしておきます
      plugins: {
        // 値として false を渡すことによりプラグインを無効化します
        "postcss-url": false,
        "postcss-nested": {},
        "postcss-responsive-type": {},
        "postcss-hexrgba": {},
      },
      preset: {
        // postcss-preset-env 設定を変更します
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
  // vuetify: {
  //   customVariables: ["~/assets/scss/variables.scss"],
  //   treeShake: true,
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: "#368F8B",
  //         secondary: "#183446",
  //         accent: "#FF5722",
  //         error: "#FF1744",
  //         warning: "#FFEA00",
  //         info: "#00B0FF",
  //         success: "#76FF03",
  //       },
  //     },
  //   },
  // },
  // serverMiddleware: [
  //   // API middleware
  //   "~/api/index.js",
  // ],
  devServer: {
    disableHostCheck: true,
  },
}
