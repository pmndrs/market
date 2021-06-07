import { s3 } from '@/helpers/s3'

// Example of how to verify and get user data server-side.
const getUser = async (req, res) => {
  const body = req.body
  console.log(body)
  const params = {
    Bucket: 'market-assets',
    Expires: 60 * 3,
    Key: 'market-assets/uploaded/' + body.fileName,
    ContentType: body.fileType,
    ACL: 'public-read',
  }

  const signedUrl = s3.getSignedUrl('putObject', params)

  return res.json({ signedUrl })
}

export default getUser
