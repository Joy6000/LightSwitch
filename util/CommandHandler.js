
const fs = require('fs')
module.exports = (client, Base, Handler) => {
    const { prefix, owners } = Handler
let {
    name = '',
    aliases = [],
    description = '',
    minArgs = -1,
    maxArgs = null,
    usage = '',
    guildOnly = Boolean,
    ownerOnly = Boolean,
    requiredPermissions = [],
    requiredRoles = [],
    permissionError = '',
    blacklistedUsers = [],
    whitelistedUsers = [],
    callback,
} = Base
const validatePermissions = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]
    for (const perm of permissions) {
        for (const permission of requiredPermissions) {
            if (!validPermissions.includes(permission)) throw new TypeError(`Unknown Permission Node "${perm}"`)
        }
    }
}

    if (typeof requiredPermissions === 'string') requiredPermissions = [requiredPermissions]
    if (requiredPermissions.length) {
            if (typeof requiredPermissions === 'string') requiredPermissions = [requiredPermissions]
            validatePermissions(requiredPermissions)
    }
    client.on('message', message => {
        const { content, member, guild, channel } = message
        for (const alias of aliases) {
            let thing = alias.toLowerCase() || name.toLowerCase()
            const command = `${prefix}${thing}`
            if (
                content.toLowerCase().startsWith(`${command} `) ||
                content.toLowerCase() === command
              ) {
                  console.log(`${member.user.tag} just ran ${command} in ${channel.name}`)
                  // Check if the member that ran the command has permissions required
                for (const permission of requiredPermissions) {
                    if (!member.permissions.has(permission)) {
                        const permError = permissionError ? permissionError : 'You do not have the sufficient permissions to run this command.'
                        return message.reply(permError)
                    }
                }
                // Make sure the member has the required roles to use this command
                for (const Rrole of requiredRoles) {
                    const role = guild.roles.cache.find(r => r.name === Rrole)
                    if (!member.roles.cache.has(role)) {
                        return message.reply('You do not have the required roles needed to use this command.')
                    }
                }
                // Check if the user is blacklisted or not
                for (const blacklistedUser of blacklistedUsers) {
                    if (member.id === blacklistedUser) return
                }
                // Check if the user is whitelisted, if so let them run the command
                for (const whitelistedUser of whitelistedUsers) {
                    if (member.id !== whitelistedUser) return
                }
                // Disallow command if run in a dm
                if (guildOnly && channel.type === 'dm') {
                    return message.reply('This command can only be ran inside a server.')
                }
                // Check if the user is a owner, if so let them run the command
                for (const owner of owners) {
                    if (member.id !== owner) return
                }
                // Split on any number of spaces 
                const arguments = content.split(/[ ]+/)
                // remove first index of the arguments array
                arguments.shift()
                // Check if arguments are correct
                if (
                    arguments.length < minArgs ||
                    (maxArgs !== null && arguments.length > maxArgs)
                  ) {
                    message.reply(`Incorrect usage. Correct usage looks something like: "${command} ${usage}"`)
                    return
                  }
  
                  //THIS MUST BE IN ORDER IN THE COMMAND!!             
                  callback(message, arguments, arguments.join(' '), client)

                  return
              }
        }
    })
        
        
}