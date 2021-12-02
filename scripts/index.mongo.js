/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').createIndexes([{ email: 1 }, { username: 1 }], {
  unique: true,
});

db.getCollection('likes').createIndex(
  { idLiker: 1, idLiked: 1 },
  { unique: true }
);

db.getCollection('follows').createIndex(
  { idFollower: 1, idFollowed: 1 },
  { unique: true }
);
