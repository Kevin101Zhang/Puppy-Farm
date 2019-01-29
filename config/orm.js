var connection = require("./connection.js");

var orm = {
    selectAll: function () {
        connection.query('SELECT * FROM Puppies; SELECT * FROM PuppiesAdopted', [1, 2], function (err, results) {
            if (err) throw err;
            console.log(results[0]); // [{1: 1}] Puppies
            console.log(results[1]); // [{2: 2}] PuppiesAdopted
            
            var items = {
                Puppies: results[0],
                PuppiesAdopted: results[1],
            };
            return items;
        });
    },
};

module.exports = orm;