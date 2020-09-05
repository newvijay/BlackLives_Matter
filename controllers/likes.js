const Like = require('../models/like');

module.exports = {
    create,
    index,
    delete: deleteOne,
    show,
    update
}

function create(req, res) {
    req.body.user = req.user._id;

    req.body.liked = "true";
    Like.create(req.body)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function index(req, res) {
    Like.find({user: req.user._id})
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function deleteOne(req, res) {
    Like.findByIdAndDelete(req.params.id)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function show(req, res) {
   Like.findById(req.params.id)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function update(req, res) {
    Like.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}
