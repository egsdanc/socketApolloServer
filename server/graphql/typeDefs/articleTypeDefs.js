const { gql } = require('apollo-server-express');

const articleTypeDefs = gql`

type MakaleFiltre {
  id: ID!
  baslik: String
  icerik: String
}

type Makale {
    id: ID!
    baslik: String!
    icerik: String!
  }

  type Query {
    makalelerGetir: [Makale]
    makaleGetir(id: ID!): Makale
    makaleFiltre(ids: [ID!]!): [MakaleFiltre]
  }

  type Mutation {
    makaleOlustur(baslik: String!, icerik: String!): Makale
  }
  type Subscription {
    articleGet: [Makale]
  }
`;

module.exports = articleTypeDefs;
