require('module-alias/register')
require('dotenv').config()
const Discord = require('discord.js')
const zoro = require('zoro-utils')
const client = new Discord.Client()


new zoro.handler(client, {
    commands: './commands',
    features: './features'
})
.setOwners(['527599831091380234'])
.setPrefix('>')



client.login(process.env.TOKEN)