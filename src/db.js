const fs = require('fs');
const promisify = require('util').promisify;
const {v4: uuid} = require("uuid");
const path = require('path')
const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const dbFilePath = path.resolve(__dirname, "../db/db.json")

const read = async() => {
    const data = await readFile(dbFilePath)
    return JSON.parse(data)
}

async function write(object) {
  await  writeFile(dbFilePath, object)
  return object
    
}
read()