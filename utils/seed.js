const connection = require('../config/connection');
const { Course, Student } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');


  console.info('Seeding complete! 🌱');
  process.exit(0);
});
