const fs = require('fs'), crypto = require('crypto');

let json = fs.readFileSync('state.json').toString()
json = JSON.parse(json);

for (var i = 0; i < 1000; i++) {
    json.balances["YsS8gMIessj5IA4nQ6ONWJHaUrABz4uNoNx1JB66HoQ"][i] = crypto.randomBytes(6).toString('hex');
}

fs.writeFileSync('state.json', JSON.stringify(json));