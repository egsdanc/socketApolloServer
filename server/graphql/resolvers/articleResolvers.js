const articleController = require('../../controller/articleController.js');

const articleResolvers = {
  Query: {
    async makalelerGetir() {
      return await articleController.getArticles();
    },
    async makaleGetir(parents, args) {
      return await articleController.getArticle(args.id);
    },
    async makaleFiltre(parent, args) {
      return await articleController.filterArticles(args.ids);
    },
  },

  Mutation: {
    async makaleOlustur(parent, args) {
      const { baslik, icerik } = args;
      return await articleController.createArticle(baslik, icerik);
    },
  },
  Subscription: {
    articleGet: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['ARTICLEGET']),
    },
  },
};

module.exports = articleResolvers;
