const prov = require('../assets/provinsi.json')
const kab = require('../assets/kabupaten.json')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

module.exports = async function () {
    let result = []
    let result_all = []
    let result_prov = []
    let id_prov = 1;
    let g_id = 1;

    for (let p of prov) {
        let data = {
            id: id_prov,
            name: p.Provinsi,
            kab: []
        }

        result_prov.push({
            id: id_prov,
            name: p.Provinsi,
            emotion: _.random(0, 2)
        })

        id_prov++
        let id_kab = 1;
        for (let k of kab) {
            if (data.name === k.Provinsi) {
                let data_kab = {
                    id: id_kab,
                    name: k.Kabupaten.replace("Kabupaten", '').trim()
                }

                data.kab.push(data_kab)
                result_all.push({
                    id: g_id,
                    prov_id: id_prov,
                    kab_id: id_prov + "_" + id_kab,
                    prov_name: p.Provinsi,
                    kab_name: k.Kabupaten.replace("Kabupaten", '').trim(),
                    emotion: _.random(0, 2)
                })
                id_kab++;
                g_id++;
            }
        }

        result.push(data)
    }


    fs.writeFileSync(path.join(__dirname, './../assets/prov_kab.json'), JSON.stringify(result, null, 2))
    fs.writeFileSync(path.join(__dirname, './../assets/kab_prov.json'), JSON.stringify(result_all, null, 2))
    fs.writeFileSync(path.join(__dirname, './../assets/prov.json'), JSON.stringify(result_prov, null, 2))

    console.log("generate data prov_kab success")
}