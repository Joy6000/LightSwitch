module.exports = {
    name: 'ping',
    aliases: ['p'],
    ownerOnly: true,
    async execute({ message, args, handler, client }) {
        const msg = await message.channel.send(':ping_pong: Pinging....')
        const ping = msg.createdTimestamp - message.createdTimestamp
        msg.edit(`:ping_pong: Pong!!\nTook: \`${ping}ms\`\nAPI Heartbeat \`${client.ws.ping}ms\``)
        
    }
}