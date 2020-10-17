const _ = require("lodash")
const matchAll = require("match-all")// note if node version > 12  no need this dependency
/* 
    here i'm using matchAll, this willbe available from node v12
    another one approach we can match one by one and using recursion we can replace.
*/
const interpolate = (value, session = {}, options = {}) => {
    
    const l = _.get(options, "leftDelimiter")
    const r = _.get(options, "rightDelimiter")
    if (l&&r&&value) {
        const matches = matchAll(value, new RegExp(`${l}(.*?)${r}`, "g"))
        let replacedStr = value;
        _.map(matches.toArray(), match => {
            const repl=_.get(session, match, '')
            replacedStr = _.replace(replacedStr, `${l}${match}${r}`, repl)
        })
        return replacedStr
    }
    return value
};

module.exports = { interpolate }