const express = require('express');
const bodyParser = require('body-parser');
const { Pool} = require('pg')



async function routes(app) {
    console.log(process.env.USER)
    const router = express.Router();
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json());
    const pool = new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT_DATABASE,
    })
    app.use('/server', router);
    
    router.post('/addoperation',async (req, result) => {
        try{
            let {concept, amount, date, type} = req.body; 
            
            if(type === 1){
                amount = Number(+amount)
                type = 'Income'
            }else{
                amount= Number(-amount)
                type = 'Outcome'
            }
            await pool.query(`INSERT INTO operations(concept, amount, date, type) VALUES('${concept}',${Number(amount)},'${date}','${type}')`)
            
            const response = await pool.query("SELECT * FROM operations WHERE result=true")
            if(response.rowCount === 0){
                await pool.query(`INSERT INTO operations(amount, result) VALUES(${amount},'true')`)
            }else{
                amount += Number(response.rows[0].amount)
                await pool.query(`UPDATE operations SET amount=${amount} WHERE result='true'`)
            }
            
            result.end()
        } catch (e) {
            console.log(e)
            result.status(400)
        }
    });

    router.put('/update', async (req, result) => {
        let { id, concept, amount, date } = req.body;

        try {
            await pool.query(`UPDATE operations SET 
                date='${date}',
                concept='${concept}',
                amount=${amount}
            WHERE id=${id}
            `)
            result.end();
        } catch (e) {
            console.log(e)
            result.status(400);
        }
    })


    router.get('/list', async (req,result)=>{
        try{
            const response = await pool.query("SELECT * FROM operations WHERE result=false")
            const data = {data: response.rows}
            result.send(data)
        }catch(e){
            console.log(e)
            result.status(400)
        }
    })

    router.get('/result', async (req,result)=>{
        try{
            const response = await pool.query("SELECT * FROM operations WHERE result=true")
            const data = {data: response.rows}
            result.send(data)
        }catch(e){
            console.log(e)
            result.status(400)
        }
    })


    router.get('/delete', async (req, res)=>{
        try{
            const {id} = req.query
            let response = await pool.query(`SELECT * FROM operations WHERE id=${id}`)
            let amount = Number(response.rows[0].amount);
            response = await pool.query("SELECT * FROM operations WHERE result=true")
            let result = Number(response.rows[0].amount)
            const newAmount = result - amount;
            await pool.query(`UPDATE operations SET amount=${newAmount} WHERE result=true`)
            await pool.query(`delete from operations where id=${id} `)
            res.end()
        }catch(e){
            console.log(e)
            res.status(400)
        }
    })
}

module.exports = routes;
