
const { ClearpathAlgorithm } = require('./ClearpathAlgorithm');
const fs = require('fs');

fs.readFile('input.json', 'utf8', function (err, data) {
     if (err) throw err;
    let obj = JSON.parse(data);
    let available = obj.available;
    let allocated = [];
    let max = [];

    for(let i=0, length = obj.process.length; i < length; i++) {
        let p = obj.process[i];
        allocated[i] = p.allocated;
        max[i] = p.max;
    }

    ClearpathAlgorithm(allocated, max, available).then(res => {
        let sequence = "";
        res.forEach(value => {
            sequence+=`${obj.process[value].id} `;
        });
        console.log(sequence);
    }).catch(err =>  console.log(err));

});
