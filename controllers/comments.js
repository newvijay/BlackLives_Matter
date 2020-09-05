const Comment = require('../models/comment');

module.exports = {
    create,
    index,
    delete: deleteOne,
    show,
    update
}

function create(req, res) {
    req.body.user = req.user._id
    Comment.create(req.body)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function index(req, res) {
    Comment.find({user: req.user._id})
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function deleteOne(req, res) {
    Comment.findByIdAndDelete(req.params.id)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function show(req, res) {
   Comment.findById(req.params.id)
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}

function update(req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(blacklive => {res.json(blacklive)})
    .catch(err => {res.json(err)})
}
