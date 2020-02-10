const express = require('express');
const Hubs = require('./data/hubs-model')

const server = express();
server.use(express.json()); //needed for POST PUT/PATCH, teaches express how to read JSON from the body

server.get('/', (req, res)=>{
    res.json({hello: 'world'})
})

server.get('/api/hubs', (req, res)=>{
    Hubs.find()
        .then(hubs=>{
            res.status(200).json(hubs);
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({errorMessage: 'oops'})
        });
})

server.post('/api/hubs', (req, res)=>{
    const hubInfo = req.body;
    //validate data, and if the data is valid, save it
    Hubs.add(hubInfo)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({errorMessage: 'oops'})
        });
})

server.delete('/api/hubs/:id', (req, res)=>{
    // const {id} = req.params  then could pass id into Hubs.remove
    Hubs.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({errorMessage: 'oops'})
        });
})



const port = 5000; 
server.listen(port, ()=>console.log(`\n Listening on port ${port}\n`))