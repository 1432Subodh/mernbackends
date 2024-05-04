const express = require('express')
const cors = require('cors')
const PORT = 3030
const path = require('path')
const fs = require('fs')
const testModel = require('./models/noteFiles')
const BASE_URL = 'http://localhost:5173/'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))


app.get('/get', (req, res) => {
    testModel.find().then(result => res.json(result))
})

app.post("/register", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    fs.writeFile(`./files/${email.split(' ').join('')}.txt`, username, (err) => {
        res.redirect(BASE_URL)
        fs.readdir(`./files`, (err, files) => {

            

            if (files.find(ele => ele == `${email.split(' ').join('')}.txt`)) {
                testModel.create({
                    file: `${email.split(' ').join('')}.txt`
                })
            }
        })
    })
});




app.post('/createData', (req, res) => {
    console.log(req.body.userdata)
    testModel.create({
        file: req.body.userdata
        // file: "hello subodh kaise ho"
    })
    res.redirect(BASE_URL)

})
app.get('/getdata', (req, res) => {
    testModel.find().then(result => res.json(result))
})

app.get('/find', (req, res)=>{
    const seData = new RegExp(req.query.search, "i")
    console.log(req.query.search)
    testModel.find({file: seData}).then(result=>res.json(result))
    // res.json()
    // console.log();
})


app.listen(PORT)
