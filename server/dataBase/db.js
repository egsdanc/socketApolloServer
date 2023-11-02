const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/apollDN';

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Veritabanına bağlandı');
  } catch (err) {
    console.error('Veritabanı bağlantısı başarısız', err);
  }
}

module.exports = {
  connectToDatabase,
};
