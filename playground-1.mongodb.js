// db.help();

use('usersDB');

// -------- CRUD --------
//! C insertOne({})/insertMany({})                 *INSERT
//! R - find({},{}).sort({}).limit().skip()        *SELECT
//! U - updateOne/updateMany({фильтр},{})          *UPDETE
//! D - deleteOne/deleteMany({фильтр})             *DELETE

//! C insertOne({})/insertMany({}) *INSERT

// db.users.insertOne({ name: 'Test1', age: 20 });
// db.users.insertOne({ name: 'Test2', age: 19 });

// db.users.insertMany([
//   {
//     firstName: 'Test4',
//     lastName: 'Testovych4',
//     email: 'test4@test.com',
//     birthday: new Date(1995, 5, 20),
//     isMarried: false,
//     yearsOfExperience: 8,
//     gender: 'male',
//   },
//   {
//     firstName: 'Test5',
//     lastName: 'Testovych5',
//     email: 'test5@test.com',
//     birthday: new Date(1998, 1, 5),
//     yearsOfExperience: 5,
//     gender: 'female',
//     languages: ['EN', 'UA'],
//     phone: {
//       work: '+380123456789',
//       home: '+380987654321',
//     },
//   },
// ]);
// db.users.insertMany([
//   {
//     name: 'John Smith',
//     email: 'john.smith@example.com',
//     yearsOfExperience: 5,
//     address: {
//       city: 'Kyiv',
//       street: 'Khreshchatyk Street',
//       building: '20',
//     },
//     hobbies: ['football', 'reading', 'traveling'],
//     birthDate: new Date('1993-04-15'),
//     gender: 'male',
//   },
//   {
//     name: 'Olena Petrivna',
//     email: 'olena.petrovna@example.com',
//     yearsOfExperience: 3,
//     address: {
//       city: 'Lviv',
//       street: 'Svobody Avenue',
//       building: '5',
//     },
//     hobbies: ['drawing', 'cycling', 'swimming'],
//     birthDate: new Date('1998-02-10'),
//     gender: 'female',
//   },
//   {
//     name: 'Andriy Sydorov',
//     email: 'andriy.sydorov@example.com',
//     yearsOfExperience: 15,
//     address: {
//       city: 'Odesa',
//       street: 'Derybasivska Street',
//       building: '15',
//     },
//     hobbies: ['fishing', 'chess', 'gardening'],
//     birthDate: new Date('1983-07-25'),
//     gender: 'male',
//   },
//   {
//     name: 'Maria Kovalenko',
//     email: 'maria.kovalenko@example.com',
//     yearsOfExperience: 10,
//     address: {
//       city: 'Kharkiv',
//       street: 'Sumskaya Street',
//       building: '12',
//     },
//     hobbies: ['traveling', 'yoga', 'cooking'],
//     birthDate: new Date('1989-12-05'),
//     gender: 'female',
//   },
// ]);
// db.users.insertMany([
//     {
//       firstName: 'Test2',
//       lastName: 'testovych2',
//       email: 'test2@test.com',
//       birthday: new Date(1998, 1, 5),
//       yearsOfExperiense: 5,
//       gender: 'female',
//       languages: ['EN', 'UA'],
//       phone: {
//         work: '+380987654321',
//         home: '+380987654322',
//       },
//     },
//     {
//       firstName: 'Test2',
//       lastName: 'testovych2',
//       email: 'test2@test.com',
//       birthday: new Date(1998, 1, 5),
//       yearsOfExperiense: 5,
//       gender: 'female',
//       languages: ['UA', 'EN'],
//       phone: {
//         work: '+380987654321',
//         home: '+380987654322',
//       },
//     },
//     {
//       firstName: 'Test2',
//       lastName: 'testovych2',
//       email: 'test2@test.com',
//       birthday: new Date(1998, 1, 5),
//       yearsOfExperiense: 5,
//       gender: 'female',
//       languages: ['EN', 'UA', 'PL'],
//       phone: {
//         work: '+380987654321',
//         home: '+380987654322',
//       },
//     },
//   ]);

//! R - find({},{}).sort({}).limit().skip()  *SELECT

// db.users.find().limit(2).skip(3);

// СОРТУВАННЯ - ORDER BY - sort
//  1 - ASC
// -1 - DESC

// db.users.find().sort({ yearsOfExperience: -1 });
// db.users.find().sort({ lastName: 1, firstName: -1 });

// db.users.find().sort({ email: 1 }).limit(3).skip(3);

//? Проекція SELECT first_name... другий компонент find({},{})

// db.users.find({}, { firstName: 1, lastName: 1, _id: 0 });
// db.users.find({}, { name: 1, _id: 0 });

//? ФІЛЬТРАЦІЯ WHERE - перший компонент find({},{})

// db.users.find({ gender: 'male' });

// db.users.find({ firstName: 'Test4', lastName: 'Testovych4' });

// db.users.find({ $or: [{ firstName: 'Test4' }, { lastName: 'Testovych5' }] });

// db.users.find({ yearsOfExperience: { $gt: 4 } });

// db.users.find({
//   $and: [
//     { birthDate: { $gte: new Date(1990, 0, 1) } },
//     { birthDate: { $lte: new Date(1999, 11, 31) } },
//   ],
// });

// ВБУДОВАНІ документи
// from Lviv
// db.users.find({ 'address.city': 'Lviv' });

// db.users.find({ languages: ['EN', 'UA'] });
// db.users.find({ languages: { $all: ['EN', 'UA'] } });
// db.users.find({ languages: 'PL' });

//! U - updateOne/updateMany({фильтр},{})          *UPDETE
// db.users.updateOne({ name: 'Test1' }, { $set: { name: 'NewTest' } });
// db.users.updateOne(
//   { _id: ObjectId('671e58ac79a91251b4801064') },
//   { $set: { age: 21 } }
// );

//! D - deleteOne/deleteMany({фильтр})             *DELETE
// db.users.deleteOne({ _id: ObjectId('671e593840cfaf000eca7513') });

//! $group stage in aggregation pipline             *GROUP BY

// db.users.aggregate([
//   {
//     $group: {
//       _id: '$gender',
//       peopleCount: {
//         $count: {},
//       },
//     },
//   },
//   {
//     $sort: {
//       peopleCount: -1,
//     },
//   },
// ]);

// порахувати кількість чоловіків і жінок,
// які мають років досвідіу > 4

// db.users.aggregate([
//   {
//     $match: {
//       yearsOfExperiense: { $gt: 4 },
//     },
//   },
//   {
//     $group: {
//       _id: '$gender',
//       peopleCount: {
//         $count: {},
//       },
//     },
//   },
// ]);

// відобразити сумарну кількість років досвіду серед жінок і чоловіків

db.users.aggregate([
  {
    $group: {
      _id: '$gender',
      totalYearsOfExperience: { $sum: '$yearsOfExperiense' },
    },
  },
]);
