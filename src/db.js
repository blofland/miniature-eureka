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

const index = async() => {
   return await read()
}

const create = async(obj) => {
  const data = await read() 
  obj.id = uuid()
  data.push(obj)
  await write(data)
  return obj  
}

const update = async() => {}

const destroy = async() => {}


// Controller / Routes 

// const newRow = model.create({name: "Superman", description: "He's a superman"})

module.exports = {index, create, update, destroy}