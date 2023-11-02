const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type Users {
    id: ID!
    Ad: String!
    Soyad: String!
    Tel: String!
    Makaleid: [String]!
  }

  type Query {
    kullanicilarGetir: [Users]
    kullaniciGetir(id: ID!): Users
  }

  type Mutation {
    kullaniciOlustur(Ad: String!, Soyad: String!, Tel: String!, Makaleid: [String]!): Users
  }

 
`;

module.exports = userTypeDefs;
