const db = require ('../db')

class ScoreController {
    async createScore(req, res){
        const {count, userId} = req.body
        const newScore = await db.query('INSERT INTO score (count, user_id) values ($1, $2) RETURNING *', [count, userId])
        res.json(newScore.rows[0])
    }

    async getScores(req, res){
        const scores = await db.query('SELECT * FROM score')
        res.json(scores.rows)
    }

    async getOneUserScore(req, res){
        const userId = req.params.id
        const score = await db.query('SELECT * FROM score WHERE user_id = $1', [userId])
        res.json(score.rows)
    }

    async deleteScore(req, res) {
        const id = req.params.id
        const score = await db.query('DELETE FROM score WHERE id = $1', [id])
        res.json(score.rows[0])
    }
}


module.exports = new ScoreController()