const list_data = require('./data.json')
const perhitunganv4 = require('./perhitunganv4')
const fs = require('fs')
const path = require('path')
const papa = require('papaparse')

const total = 1000089
const param = {
    positive: 60,
    negative: 30,
    neutral: 10
}

function main() {
    const hasil = []
    for (let d of list_data) {
        const apa = perhitunganv4(param, d, total)
        hasil.push(apa)
    }


    const un = papa.unparse(hasil.map((v) => v.hasil_data), { "header": true })
    fs.writeFileSync(path.join(__dirname, './output/data.csv'), un, "utf-8")
    console.log("data berhasil dimanipulasi")

}

main()
