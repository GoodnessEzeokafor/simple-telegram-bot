require("dotenv").config()
const express = require("express")
const axios = require("axios")

const { TELEGRAM_BOT_TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
const URI = `/webhook/${TELEGRAM_BOT_TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(express.json())

const init = async () => {
    try {
        const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }

}
app.post(URI, async (req, res) => {
    console.log(req.body)
    const chatId = req.body.message.chat.id
    const text = req.body.message.text
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "Fuck yeah"
    })
    return res.send()
})
app.listen(process.env.PORT || 5050, async () => {
    console.log(`APP IS RUNNING ON PORT ${process.env.PORT}`)
    await init()
})