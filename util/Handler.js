const fs = require('fs')
class Handler {
    constructor(client, options = {}) {
        this.client = client;
        this.commandsDir = options.commandsDir;
        this.showWarns = options.showWarns;
        this.prefix = '!';
        this.owners = [];
        let count

        if (!options.commandsDir) console.warn('No specified commands dir. Defaulting to ./commands')
        try {
            this.commandsDir = './commands'
        } catch (err) { 
            return
        }
        fs.readdir(this.commandsDir, (err, files) => {
            count = files.filter(f => !f.startsWith('!')).length
            console.log(`Loaded ${count} commands`)
        }) 

    }
     /**
	 *
	 * @param {String} prefix
	 */
    setPrefix = (prefix) => {
        if (typeof prefix !== 'string') throw new TypeError('Prefix must be a string.')
        this.prefix = prefix
        return this
    }
    /**
     * 
     * @param {Array<String>} owners
     */
    setOwners = (owners) => {
        let Owners
        if (!owners) Owners = [];
        else Owners = owners;
        this.owners = Owners
        return this
    }

}
module.exports.Handler = Handler