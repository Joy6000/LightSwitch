const prefix = process.env.PREFIX
const fs = require('fs')
module.exports = (client, Base) => {
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

    let count = 0
    fs.readdir('./cmds', (err, files) => {
        if (files.length) {
            count = files.length
        }
    }) 
    console.log(`Loaded ${count} commands`)

    if (typeof requiredPermissions === 'string') requiredPermissions = [requiredPermissions]
    if (requiredPermissions.length) {
            if (typeof requiredPermissions === 'string') requiredPermissions = [requiredPermissions]
            validatePermissions(requiredPermissions)
    }
    client.on('message', message => {
        for (const alias of aliases) {
            let thing = alias.toLowerCase() || name.toLowerCase()
            const command = `${prefix}${thing}`
        }
    })
        
        
}