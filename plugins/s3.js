import AWS from "aws-sdk"

const s3 = new AWS.S3()
s3.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: process.env.S3_REGION,
})

export default s3
