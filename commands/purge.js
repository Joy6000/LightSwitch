module.exports = {
    name: 'purge',
    usage: '[Amount (default = 5)]',
    userPerms: 'MANAGE_MESSAGES',
    async execute({ message, args, handler, client }) {
        let toPurge
        if (!args[0]) {
            toPurge = 5 + 1
        } if (args[0]) {
            toPurge = +args[0] + 1
        }
        
        message.channel.bulkDelete(toPurge)
        const msg = await message.channel.send(`**Deleted ${toPurge - 1} messages!**`, {timeout: 500})
        msg.delete({timeout: 5000})
    }
}