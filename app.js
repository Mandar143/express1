
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let docs = {
    nm : 'android'
}

var MongoClient = require('mongodb').MongoClient
var ObjectId=require('mongodb').ObjectId

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get("/user", function (req, res) {
    
    MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
        if (err) throw err
        else{
            db.collection('user').find().toArray(function (err, result) {
                if (err) throw err
                else {
                    if (result) {
                        res.json(result)
                        
                    }
                   
                }
                db.close() 

            })
        }
        })
  }); 

  app.post("/user", function (req, res) {
  // console.log(JSON.stringify(req.body))
    docs.name = req.body.name
    docs.title = req.body.title
    docs.desc=req.body.desc
         MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
              if (err) throw err
              else{
                db.collection('user').insert(docs ,function (err, result) {
                    if (err) throw err
                    else{
                       // console.log(result)    
                        if (result) {
                            console.log(result)
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: 1
                                    }                     
                        }
                        else{
                            console.log(err)
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(custRes)
                }) 
            }
          })

  }); 


  app.put(
    '/user',
    (req, res) => {
        let custRes = {}
       // var MongoClient = require('mongodb').MongoClient
            // console.log(req.body)

        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
          if (err) throw err
   

          else{
            db.collection('user').update({"_id":new ObjectId(req.body._id)},{$set:{"title":req.body.title,"name":req.body.name,"desc":req.body.desc}},function (err, result) {
                if (err) throw err
                else{
                  //  console.log(result)    
                    if (result) {
                       
                            custRes = {
                                        sts: 200,
                                        msg: 'Successful',
                                        res: result
                                }                     
                    }
                    else{
                        console.log(err)
                        custRes = {
                                    sts: 400,
                                    msg: 'error',
                                    res: 0
                                }                                       
                    }
        
                }
                res.json(custRes)
            }) 
        }
      })
  })



  app.delete(
    '/user',
    (req, res) => {
        let custRes = {}
       // var MongoClient = require('mongodb').MongoClient
            // console.log(req.body.email)
        MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
          if (err) throw err
   
          else{
            db.collection('user').remove({"_id":new ObjectId(req.body._id)},function (err, result) {
                if (err) throw err
                else{
                  //  console.log(result)    
                    if (result) {
                       
                            custRes = {
                                        sts: 200,
                                        msg: 'Successful',
                                        res: result
                                }                     
                    }
                    else{
                        console.log(err)
                        custRes = {
                                    sts: 400,
                                    msg: 'error',
                                    res: 0
                                }                                       
                    }
        
                }
                res.json(custRes)
            }) 
        }
      })
  })

  
  

var server = app.listen(3000, function () {
    console.log("app running on port.");
});