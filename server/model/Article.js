const {model,Schema} = require('mongoose')

const modlSchema = new Schema({
    baslik:String,
    icerik:String
})

module.exports = new model('ilkModel',modlSchema)