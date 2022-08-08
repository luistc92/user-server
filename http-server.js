const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ users: []})
  .write()



app.use(express.static('./public'))
app.use([express.json(), express.urlencoded({extended: false})])


app.post('/addUser', (req,res)=>{
  
  db.get('users').push(req.body).write()
  res.send('Yeaaaaah!!!!!!!')
});

app.post('/addUsers', (req,res)=>{
    console.log(req.body.length)
    for(i=0;i<20;i++){
      db.get('users').push(req.body[i]).write()
    }
    res.send(JSON.stringify(req.body))
  });
  


app.get('/showUsers',(req,res)=>{

  const users = db.get('users').value()
  console.log(users.length)
  res.send(users)
});

app.delete('/deleteUsers',(req,res)=>{
  db.get('users').remove().write();
  res.send('Deleted')
});





app.listen(3000, ()=>{ console.log('App listening in port 3000!')})
