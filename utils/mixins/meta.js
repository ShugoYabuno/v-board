export default {
  head() {
    let meta = this.meta || {}
    let defTitle = `${meta.title ? meta.title : "Vboard" }`
    let ogTitle = meta.titleTemplate ? defTitle : `${defTitle} | ${"Vboard"}`

    let metaInfo = {
      title: meta.title || "Vboard",
      titleTemplate: meta.titleTemplate || `%s | ${"Vboard"}`,
      meta: [
        { hid: "description", name: "description", content: meta.description || "Vboard" },
        { hid: "og:type", property: "og:type", content: meta.type || "website" },
        { hid: "og:title", property: "og:title", content: ogTitle || "Vboard" },
        { hid: "og:description", property: "og:description", content: meta.description || "Vboard" },
        { hid: "og:url", property: "og:url", content: meta.url || `${process.env.BASE_URL}${this.$route.fullPath}`},
        { hid: "og:image", property: "og:image", content: meta.image || `${process.env.BASE_URL}/images/og.png` },
        { hid: "og:site_name", property: "og:site_name", content: "Vboard" },
        { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
        { hid: "twitter:title", name: "twitter:title", content: meta.title || "Vboard"},
        // { hid: "twitter:site", name: "twitter:site", content: "@TENTIAL_Inc" },
        // { hid: "twitter:domain", name: "twitter:domain", content: "twitter.com/TENTIAL_Inc" },
      ],
      link: [
        { hid: "canonical", name: "canonical", href: `${process.env.BASE_URL}${this.$route.fullPath}` }
      ]
    }

    if (meta.robots) metaInfo.meta.push({ hid: "robots", name: "robots", content: meta.robots })

    return metaInfo
  }
}
