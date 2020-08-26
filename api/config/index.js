import path from "path"

const config = {
  port: 8000,
  secret: {
    session: "video-share-api-session",
  },
  root: path.normalize(path.join(__dirname, "/../..")),
}

export default config
