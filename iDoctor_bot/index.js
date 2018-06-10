const TelegramBot = require('node-telegram-bot-api');
const token = '458187413:AAHK74A8KG2o_1JuprpKYQooON-TASmFyDo';
const bot = new TelegramBot(token, {polling: true});
const axios = require('axios');
const key = "AIzaSyCLs7NlRy_CqNBjoMaSWDDjZg4-iLPeY_s";

var queue = [];
var queueProcessing = false;

function queueRequest(text) {
    queue.push(text);
    if (queueProcessing) {
        return;
    }
    queueProcessing = true;
    processQueue();
}

function processQueue() {
    if (queue.length == 0) {
        queueProcessing = false;
        return;
    }
    var current = queue.shift();
    request(currentRequest, function(error, response, body) {
        if (error || response.body.error) {
            console.log("Error sending messages!");
        }
        processQueue();
    });
}

bot.on('message', function (msg) {
    const chatId = msg.chat.id;
    axios.post(`http://localhost:4000/pharmacy/simptoms`,{msg: msg.text.toLowerCase()})
    .then(response => {
        let txt = `💊Ліки: \n`;
        response.data.medicaments.forEach((it) => {
            txt += it + ' \n';
        });
        txt += `----------------\n`;
        txt += `🚑Рекомандації лікаря: ${response.data.recomendation}\n----------------\n`;
        txt += `😓Ймовірна хвороба: ${response.data.illness}`;
        bot.sendMessage(chatId, txt);
        axios.get('http://ip-api.com/json')
        .then(responses => {
            axios.post('http://localhost:4000/pharmacy/near',{lat: responses.data.lat,lng: responses.data.lon, needMeds: response.data.medicaments})
            .then(res => {
                let meds = "";
                res.data.med.forEach((it) => {
                    meds += it.m_name + " " + it.m_price + "грн " + it.m_available + "\n";
                });
                bot.sendMessage(chatId,"Найближчі аптеки та потрібні вам ліки в них")
                .then(r => bot.sendMessage(chatId,res.data.apt[0].name))
                .then(r => bot.sendMessage(chatId,res.data.apt[0].vicinity))
                .then(r => bot.sendMessage(chatId,"Час роботи: " + res.data.med[0].apt_time))
                .then(r => bot.sendMessage(chatId,meds));
            })
        });
    });
});