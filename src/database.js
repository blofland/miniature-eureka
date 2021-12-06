const path = require('path')
const fs = require("fs")
const {v4: uuid} = require("uuid") // Each record needs a uquine id uuid provides that uuid()


const filepath = path.resolve(__dirname, "../db/db.json")
fs.access(filepath, fs.F_OK, (err) => {if (err) throw(err)})

const readDb = async () => {
    const data = await fs.promises.readFile(filepath, {encoding: "utf8"})
    return JSON.parse(data)
}

const writeDb = async (newData) => {
    try {await fs.promises.writeFile(filepath, JSON.stringify(newData))} 
    catch (err) {console.log(err)}
    return newData 
}

const findIndexById = async (id) => {
    const data = await readDb() 
    return data.findIndex(el => String(el.id) === String(id))
}

const public = {
    index: async () => {
        const data = await readDb()
        return data
    },
    create: async (obj)=>{
        if(obj.id) throw Error("Obj has existing ID. Consider changing to update instead of create")
        const data = await readDb() 
        obj = {...obj, id: uuid()}
        data.push(obj)
        await writeDb(data)
        return obj 
    },
    update: async (obj) => {
        if(!obj.id) throw new Error("Record is not valid without an id")
        const data = await readDb() 
        const index = findIndexById(obj.id)
        if(index === -1) throw new Error("Record with an id of " + obj.id + " not found")
        data[index] = obj
        await write(data)
        return obj 
    },
    destroy: async (obj)=>{
        const data = await readDb() 
        
        const index = await findIndexById(obj.id)
        if(index === -1) throw new Error("Record with an id of " + obj.id + " not found")
        data.splice(index,1)
        await writeDb(data)
    },
    record: async ({id})=> {
        const data = await readDb()
        const index = findIndexById(id)
        return index !== -1 ? data[index] : undefined
    }
}
module.exports = public
