const arg = process.argv.splice(2)
const _ = require('lodash')
const generate_data_province = require('./src/generate_prov_kab')
const generate_data = require('./src/generate_data')
const generate_notif = require('./src/generate_notif')
require('colors')

const list_menu = [
    {
        id: "--gp",
        des: "generate provinsi dan kabupaten prov_kab.json",
        act: generate_data_province
    },
    {
        id: "--gd",
        des: "generate data secara otomatis",
        act: generate_data
    },
    {
        id: "--gn",
        des: "generate data notifikasi",
        act: generate_notif
    }
]

function help() {
    console.log(`
MENU
-------------
${list_menu.map((v) => v.id + "\t" + v.des).join('\n')}
`.yellow)
}

async function main() {
    if (_.isEmpty(arg)) return help()
    const data = list_menu.find((v) => v.id === arg[0])
    if (!data) return help()
    data.act()

}

main()