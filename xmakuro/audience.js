const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

; (async () => {
    const audience = await prisma.audience.findMany()
    // console.log(audience)
    fs.writeFileSync('audience.json', JSON.stringify(audience, null, 2), "utf-8")
    console.log("success")
})()