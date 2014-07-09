
module.exports = new (require('mongo-ticket'))('mongodb://localhost:27017/mongo-ticket', function (err) { if (err) throw err; });
