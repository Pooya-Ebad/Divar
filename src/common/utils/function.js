const isTrue = (value)=> ["true", 1, true].includes(value)
const isFalse = (value)=> ["false", 0, false].includes(value)
function removeFromObject(target, properties =[]){
    for(let item of properties){
        delete target[item]
    }
    return target
}
module.exports = {
    isTrue,
    isFalse,
    removeFromObject
}