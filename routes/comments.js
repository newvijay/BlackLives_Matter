const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.use(require('../config/auth'));
router.get('/', commentsCtrl.index);
router.post('/', checkAuth,commentsCtrl.create);
router.delete('/:id',checkAuth, commentsCtrl.delete)
router.get('/:id', checkAuth,commentsCtrl.show);
router.put('/:id', checkAuth,commentsCtrl.update);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}
module.exports = router;
