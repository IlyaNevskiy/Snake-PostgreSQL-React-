const Router = require ('express')
const router = new Router()
const scoreController = require('../controller/score.controller')

router.post('/score', scoreController.createScore)
router.get('/score', scoreController.getScores)
router.get('/score/:id', scoreController.getOneUserScore)
router.delete('/score/:id', scoreController.deleteScore)



module.exports = router