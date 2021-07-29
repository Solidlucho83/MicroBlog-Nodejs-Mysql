//defino las rutas y uso el modulo router de express
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = router;