const crypto = require('crypto');

module.exports = function gerenerateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}