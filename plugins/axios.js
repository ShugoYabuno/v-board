import * as axios from "axios"

const options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || "localhost"}:${
    process.env.PORT || 3045
  }`
}

export default axios.create(options)
