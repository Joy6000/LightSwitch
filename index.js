require('module-alias/register')
require('dotenv').config()
const Discord = require('discord.js')
const zoro = require('zoro-utils')
const client = new Discord.Client()
const main = require('./util/Handler')

new zoro.handler(client, {
    commands: './commands',
    features: './features'
})
.setOwners(['527599831091380234'])
.setPrefix('>')
client.on('ready', () => {
    new main.Handler(client, { showWarns: false })
})



client.login(process.env.TOKEN)