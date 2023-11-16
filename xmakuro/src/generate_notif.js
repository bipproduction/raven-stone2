const list_notif = require('../assets/notif.json')
const kab = require('./../assets/kab_prov.json')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

module.exports = function () {
    let index = 1;
    const hasil = []
    for (let a of list_notif) {
        const data = {
            id: index,
            name: a.replace('nama_kabupaten', kab[_.random(0, (kab.length - 1))].kab_name)
        }

        hasil.push(data)
        index++;
    }

    fs.writeFileSync(path.join(__dirname, './../assets/notif_kab.json'), JSON.stringify(hasil, null, 2), "utf-8")
    console.log("SUCCESS!")
}