const prov = require('./../assets/prov.json')
const kab = require('./../assets/kab_prov.json')
const _ = require("lodash")



let apa = true
module.exports = async function () {

    let index = 0

    while (apa) {
        for (let k in kab) {
            kab[k].emotion = _.random(0, 2)
        }
        let ran = _.random(0, kab.length - 1)
        const a = kab[ran]
        const b = kab[index + 1]

        kab[index + 1] = a
        kab[index] = b
        kab[index].emotion = 0

        await new Promise(r => setTimeout(r, 1000))
        index++;
        if (index > 10) index = 0

    }


}

