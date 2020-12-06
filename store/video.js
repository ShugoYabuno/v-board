import db from "~/plugins/db"
import s3 from "~/plugins/s3"

const format2base64Data = async (_fileVideo) => {
  const fileBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(_fileVideo)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
  const fileData = fileBase64.replace(/^data:\w+\/\w+;base64,/, "")

  return fileData
}

export const state = () => {}

export const actions = {
  async upload(context, value) {
    console.log("開始")

    const { fileVideo } = value

    const data = {
      name: fileVideo.name,
    }
    const dbResponse = await db.add("videos", data)
    console.log(dbResponse)

    const documentId = dbResponse.id
    const fileData = await format2base64Data(fileVideo)
    const fileName = `post/${documentId}`

    console.log(fileData)

    const params = {
      Bucket: process.env.S3_BUCKET_RAW_DATA,
      Key: fileName,
      ContentType: "video/mp4",
      Body: Buffer.from(fileData, "base64"),
      ACL: "public-read",
      CacheControl: "no-cache, no-store",
    }
    const s3Url = `https://${process.env.S3_BUCKET_RAW_DATA}.s3.amazonaws.com/${fileName}`
    const s3ResponseUrl = await new Promise((resolve) => {
      s3.putObject(params, (err, data) => {
        if (err) {
          console.log("err")
          resolve(err)
        } else {
          console.log("success")
          resolve(s3Url)
        }
      })
    })
    console.log(s3ResponseUrl)

    await db.update("videos", documentId, {
      s3_url: s3ResponseUrl,
    })

    return s3ResponseUrl
  },
}
