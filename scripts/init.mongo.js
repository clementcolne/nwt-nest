use amstramgram
db.getCollection('users').insertMany([
  {
    username: 'clement.colne',
    email: 'clement.colne@outlook.com',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Software Engineer based in Luxembourg',
    profilePicture: 'clement-pp.jpg',
    nbFollow: 178,
    nbFollowers: 861,
    isPrivate: false,
    nbPosts: 3,
  },
  {
    username: 'adeleb54',
    email: 'adeleb54.2@gmail.com',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Ingénieure logicielle à Grenoble',
    profilePicture: 'adele-heureuse.jpeg',
    nbFollow: 587,
    nbFollowers: 975,
    isPrivate: false,
    nbPosts: 3,
  },
  {
    username: 'JeanCristhobaldo',
    email: 'thibch@pm.com',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Je ne sais pas compter jusque 4',
    profilePicture: 'default/default.png',
    nbFollow: 1,
    nbFollowers: 2,
    isPrivate: true,
    nbPosts: 1,
  },
  {
    username: 'Kh0zo',
    email: 'coco@hotmail.fr',
    password: '$2b$10$ALOiykukRJlfjQUnwDcJZ.tR5sP.rRgod1iaYbLriF29PReg7S02e',
    description: 'Bronze 3 sur lol depuis la bêta',
    profilePicture: 'coco.jpg',
    nbFollow: 0,
    nbFollowers: 0,
    isPrivate: false,
    nbPosts: 0,
  }
]);
db.getCollection('posts').insertMany([
  {
    idAuthor: 'clement.colne',
    media: 'chocolat.jpeg',
    mediaType: 'image',
    likes: 0,
    description: 'Nelly qui me prend encore pour son cobbaye...',
    location: 'Dépression',
    nbComments: 0,
  },
  {
    idAuthor: 'clement.colne',
    media: 'kiki.jpeg',
    mediaType: 'image',
    likes: 267,
    description: 'Avec mon meilleur copain',
    location: 'Pulnoy',
    nbComments: 0,
  },
  {
    idAuthor: 'adeleb54',
    media: 'copines.jpg',
    mediaType: 'image',
    likes: 83,
    description: 'Nice c*ck',
    location: 'FST, Vandoeuvres',
    nbComments: 0,
  },
  {
    idAuthor: 'JeanCristhobaldo',
    media: 'titi-et-moi.jpeg',
    mediaType: 'image',
    likes: 0,
    description: 'Respectez les gestes barrière',
    location: 'Covid-19',
    nbComments: 0,
  },
  {
    idAuthor: 'clement.colne',
    media: 'pelleteuse.mp4',
    mediaType: 'video',
    likes: 863,
    description: 'Avec les copaing',
    location: 'Jeanménil',
    nbComments: 0,
  },
  {
    idAuthor: 'adeleb54',
    media: 'opi-moche.jpeg',
    mediaType: 'image',
    likes: 83,
    description: 'Doggo de Clément',
    location: 'Artem',
    nbComments: 0,
  },
  {
    idAuthor: 'adeleb54',
    media: 'pschiit.jpg',
    mediaType: 'image',
    likes: 999,
    description: 'Nice cat',
    location: 'Pulnoy',
    nbComments: 0,
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
