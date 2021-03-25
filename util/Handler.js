const fs = require('fs')
class Handler {
    constructor(client, options = {}) {
        this.client = client;
        this.commandsDir = options.commandsDir
        this.showWarns = options.showWarns
        let count

        if (!options.commandsDir) console.warn('No specified commands dir. Defaulting to ./commands')
        try {
            this.commandsDir = './commands'
        } catch (err) {console.log('Ignoring immeninent error.')}
        fs.readdir(this.commandsDir, (err, files) => {
            count = files.length
            console.log(`Loaded ${count} commands`)
        }) 

    }

}
module.exports.Handler = Handler