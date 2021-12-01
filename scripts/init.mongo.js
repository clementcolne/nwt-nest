/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('users').insertMany([
  {
    username: 'clement.colne',
    email: 'clement.colne@outlook.com',
    password: '$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy',
    description: 'Software Engineer based in Luxembourg',
    profilePicture: 'assets/img/clement.jpeg',
    nbFollow: 178,
    nbFollowers: 861,
    isPrivate: false,
  },
  {
    username: 'adeleb54',
    email: 'adeleb54.2@gmail.com',
    password: '$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy',
    description: 'Ingénieure logicielle à Grenoble',
    profilePicture: 'assets/img/clement.jpeg',
    nbFollow: 587,
    nbFollowers: 1894,
    isPrivate: false,
  }
]);

// display the final initial data
db.getCollection('users').find({});

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

var posts = db
  .getCollection('posts')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      idAuthor: element.idAuthor,
    };
  });

var users = db
  .getCollection('users')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      username: element.username,
    };
  });

// For each element of the array ...
posts.forEach(function (element) {
  // ... check if we have a manager
  if (!!element.idAuthor) {
    // try to get the related manager element inside the array
    var user = users.find(function (elt) {
      return elt.username.toLowerCase() === element.idAuthor.toLowerCase();
    });

    // check if we found one
    if (!!user) {
      // update the person with the managerId
      db.getCollection('posts').updateOne(
        { _id: element._id },
        { $set: { idAuthor: user._id } }
      );
    }
  }
});

db.getCollection('posts').find({});
