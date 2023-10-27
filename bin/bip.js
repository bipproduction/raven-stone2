#!/bin/node
const _ = require('lodash');
const prompts = require("prompts")
require('colors')
const { execSync } = require('child_process')
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString()

const list_menu = [
    {
        id: "1",
        name: "push",
        act: _push
    },
    {
        id: "2",
        name: "push auto",
        act: _push_auto
    },
    {
        id: "3",
        name: "studio",
        act: _studio
    },
    {
        id: "x",
        name: "help",
        act: _help
    }

]


async function _studio() {
    execSync('npx prisma studio', { stdio: "inherit" })
}


async function _push_auto() {
    execSync(`git add -A && git commit -m "
    Title: auto
    Description: auto
    Note: auto
    Refs: auto
    " && git push origin ${branch}`, { stdio: "inherit" })
}

async function _push() {

    const list_commit = [
        {
            ttl: "Title",
            val: "",
        },
        {
            ttl: "Description",
            val: "",
        },
        {
            ttl: "Note",
            val: ""
        },
        {
            ttl: "Refs",
            val: ""
        }
    ]

    for (let a in list_commit) {
        const apa = await prompts({
            name: "commit",
            type: "text",
            message: `mmasukkan ${list_commit[a].ttl}`
        }).then((v) => v.commit)

        list_commit[a].val = apa
    }

    const template = `
    \t${list_commit.map((v) => v.ttl + " : " + v.val).join('\t\n\t')}
    `

    execSync(`git add -A && git commit -m "${template}" && git push origin ${branch}`, { stdio: "inherit" })

}

function _help() {
    console.log(`
MENU
---------------
\t${list_menu.map((v) => v.name).join('\t\n\t')}

EXAMPLE
    yarn bip ${list_menu[0].name}
    `.cyan)
}

async function main() {
    prompts({
        name: "menu",
        message: "pilih menu",
        type: "select",
        choices: list_menu.map((v) => ({
            title: v.name,
            value: v.id
        }))
    }).then(async ({ menu }) => {
        if (!menu) return console.log(`bye ...`)
        const m = list_menu.find((v) => v.id === menu)
        await m.act()

    })
}


main()