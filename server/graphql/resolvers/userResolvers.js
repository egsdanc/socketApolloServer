const userController = require('../../controller/userController.js');

const userResolvers = {
  Query: {
    async kullanicilarGetir() {
      return await userController.getUsers();
    },
    async kullaniciGetir(parents, args) {
      return await userController.getUser(args.id);
    },
  },

  Mutation: {
    async kullaniciOlustur(parent, args) {
 
      const { Ad, Soyad, Tel, Makaleid } = args;
      return await userController.createUser(Ad, Soyad, Tel, Makaleid);
    },
  },

 
};

module.exports = userResolvers;
