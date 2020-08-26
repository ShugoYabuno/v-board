import express from "express"
// import jwt from "jsonwebtoken"

const router = express.Router()
// const secret = "tesfpwejpafjpet"

router.post("/sign", async (req, res) => {
  console.log("api")
  // const {
  //   email,
  //   name,
  //   password,
  //   name_kana,
  //   is_login,
  //   tel,
  //   address_zip,
  //   address_prefecture_id,
  //   address_attr_1,
  // } = req.body.params || req.body

  // let user = ""

  try {
    // if (is_login) {
    //   if (!email || !password)
    //     throw new Error("Error: email or password is not found")
    // } else {
    //   if (
    //     !email ||
    //     !password ||
    //     !name ||
    //     !name_kana ||
    //     !tel ||
    //     !address_zip ||
    //     !address_prefecture_id ||
    //     !address_attr_1
    //   )
    //     throw new Error("Error: email or password is not found")
    // }

    // if (is_login) {
    //   user = await models.User.findOne({ email, status: true })
    //   if (!user) throw new Error("Error: user not found")
    // } else {
    //   user = await models.User.findOne({ email, status: true })
    // }

    // // 新規登録のとき
    // if (!is_login) {
    //   // 既に登録済みのメールアドレスのとき
    //   if (user) throw new Error("Error: email already exists")
    //   if (!user) {
    //     user = await models.User()
    //     await user.signUp(req.body)
    //     await user.createTimestamp()
    //     user = await user.save()
    //     if (process.env.NODE_ENV === "production") {
    //       Benchmark.register(user, "register")
    //     }
    //   }
    // }

    // if (!user) throw new Error("Error: failed user save")
    // if (!user.comparePassword(password))
    //   throw new Error("Error: email or password is invalid")

    // user.device_token = jwt.sign(email, secret) // { expiresIn: 604800 }
    // await user.save()

    // user.password = undefined

    res.status(200)
    return res.json({
      status: 200,
      msg: "success",
      // data: user,
    })
  } catch (e) {
    console.log(e)
    res.status(400)
    return res.json({
      status: 400,
      msg: e.message,
    })
  }
})

export default router
