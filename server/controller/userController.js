const Users = require('../model/Users');

async function getUsers() {
  try {
    return await Users.find();
  } catch (error) {
    throw error;
  }
}

async function getUser(id) {
  try {
    return await Users.findById(id);
  } catch (error) {
    throw error;
  }
}
 

const { PubSub } = require('graphql-subscriptions');
 

async function createUser(Ad, Soyad, Tel, Makaleid) {
  const pubsub = new PubSub();

  try {
    const user = {
      Ad,
      Soyad,
      Tel,
      Makaleid: Makaleid.map(id => id.toString()),
    };

    const newUser = await Users.create(user);

    // Publish a notification when a new user is created
    pubsub.publish('userCreated', { userCreated: newUser });

    return newUser;
  } catch (error) {
    throw error;
  }
}



module.exports = {
  getUsers,
  getUser,
  createUser,
};
