// require config and utility modules
require('module-alias/register')
require('dotenv').config()
const Discord = require('discord.js')
const zoro = require('zoro-utils')
// Create new client instance
const client = new Discord.Client()
const { Handler } = require('./util/Handler')
// temp handler
new zoro.handler(client, {
    commands: './commands',
    features: './features'
})
.setOwners(['527599831091380234'])
.setPrefix('>')
client.on('ready', () => {
    // main handler
    new Handler(client, { showWarns: false }).setPrefix('>')
})


// login
client.login(process.env.TOKEN)