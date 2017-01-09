const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('tasks', {
  attributes: [
    'name',
    'description',
    'completed',
    'deleted',
    'created_at',
    'updated_at',
  ],
});


