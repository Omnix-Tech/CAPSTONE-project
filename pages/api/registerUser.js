// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { UserCollection } = require('../../models/User');
const { Auth } = require('../../auth/auth.server')



export default async function handler(req, res) {
  const { firstName, lastName, email, password } = req.body


  try {
    const userRecord = await Auth.registerUser({
      firstName, lastName, email, password
    }).catch(error => { throw error })

    await UserCollection.create({
      uid: userRecord.uid, firstName, lastName, email
    }).catch(error => { throw error })

    res.status(200).json({ token: await Auth.getCustomToken(userRecord.uid) })
  } catch (error) {
    res.status(200).json({ error: error.message })
  }
}
