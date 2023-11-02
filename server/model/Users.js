 const { model, Schema } = require('mongoose');

const modlSchemaU = new Schema({
    Ad: String,
    Soyad: String,
    Tel: String,
    Makaleid: [String] // Makaleid alanını bir dizi olarak tanımladık
});

module.exports = model('Use', modlSchemaU); // Model adını "User" olarak düzeltilmiş
