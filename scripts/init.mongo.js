use amstramgram
db.getCollection('users').insertMany([
  {
    username: 'clement.colne',
    email: 'clement.colne@outlook.com',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Software Engineer based in Luxembourg',
    profilePicture: 'default/default.jpeg',
    nbFollow: 178,
    nbFollowers: 861,
    isPrivate: false,
  },
  {
    username: 'adeleb54',
    email: 'adeleb54.2@gmail.com',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Ingénieure logicielle à Grenoble',
    profilePicture: 'default/default.jpeg',
    nbFollow: 587,
    nbFollowers: 1894,
    isPrivate: false,
  }
]);
db.getCollection('posts').insertMany([
  {
    idAuthor: 'clement.colne',
    media: 'https://randomuser.me/portraits/men/78.jpg',
    mediaType: 'image',
    likes: 100,
    description: 'This is a description',
    location: 'Paris, France',
    nbComments: 3,
  },
  {
    idAuthor: 'adeleb54',
    media: 'assets/img/clement.jpeg',
    mediaType: 'image',
    likes: 100,
    description: 'This is a description',
    location: 'Paris, France',
    nbComments: 1,
  }
]);
var posts = db.getCollection('posts').find({}).map(function (element) {return {_id: element._id,idAuthor: element.idAuthor}});
var users = db.getCollection('users').find({}).map(function (element) {return {_id: element._id,username: element.username}});
posts.forEach(function (element) {
  if (!!element.idAuthor) {
    users.forEach(function (u) {
      if(u.username === element.idAuthor){
        user = u
      }
      if (!!user) {
        db.getCollection('posts').updateOne(
          { _id: element._id },
          { $set: { idAuthor: user._id } }
        );
      }
    });
  }
});
db.getCollection('posts').find({});
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
