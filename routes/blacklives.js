const express = require('express');
const router = express.Router();
const blacklivesCtrl = require('../controllers/blacklives');


router.use(require('../config/auth'));
router.get('/', blacklivesCtrl.index);
router.post('/',checkAuth, blacklivesCtrl.create);
router.delete('/:id', checkAuth, blacklivesCtrl.delete);
router.get('/:id', checkAuth, blacklivesCtrl.show);
router.put('/:id', checkAuth, blacklivesCtrl.update);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
