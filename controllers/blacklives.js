const Blacklive = require('../models/blacklive');
const multer = require("multer");
const path = require("path");
const fs=require("fs");
const util = require("util");

const Comment = require('../models/comment');

const storage =
    multer.diskStorage({
        destination: "./public/",
        filename: function (req, file, cb) {
            var newFilename = path.basename(file.originalname.toString(), path.extname(file.originalname).toString()) + "-" + Date.now().toString() + path.extname(file.originalname);
             cb(null, newFilename);
        }
    });

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
        else{
     cb(null,false);
        }
    }

const upload =
    multer({
        storage: storage,
        fileFilter:fileFilter
    }).single("image");


async function create(req, res) {
    const c = util.promisify(upload)
       await c(req, res);

      const blacklive = new Blacklive();
      blacklive.name = req.body.name;
      blacklive.date=req.body.date;
      blacklive.occupation = req.body.occupation;
      blacklive.image = req.file?req.file.filename:"";
      blacklive.msg = req.body.msg;
      blacklive.user=req.user._id;
      blacklive.save()
         .then(blacklive => {
             res.json(blacklive)
         })
    .catch(err => {res.json(err)})
}

function index(req, res) {
    Blacklive.find({user: req.user._id})
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function deleteOne(req, res) {
    Blacklive.findById(req.params.id)
        .then(blacklive => {
           fs.unlink("./public/"+(blacklive.image).toString(),()=>{});
            Comment.deleteMany({blackliveid:blacklive._id})
            .then(b =>{})
            .catch(err =>{})
        })

    Blacklive.findByIdAndDelete(req.params.id)
    .then(blacklive => {
        res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function show(req, res) {
   Blacklive.findById(req.params.id)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

async function update(req, res) {
        const c = util.promisify(upload)
       await c(req, res);
     Blacklive.findById(req.body._id)
        .then(blacklive => {
            if(req.file) {
                fs.unlink("./public/" + (blacklive.image).toString(), () => {
                });
            }
            blacklive.name = req.body.name;
            blacklive.date = req.body.date;
            blacklive.occupation = req.body.occupation;
            blacklive.image = req.file ? req.file.filename : blacklive.image;
            blacklive.msg = req.body.msg;

      blacklive.save()
         .then(blacklive => {
             res.json(blacklive)
         })
    .catch(err => {res.json(err)})

        })
}


module.exports = {
    create,
    index,
    delete: deleteOne,
    show,
    update
}
