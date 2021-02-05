const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Holaaaa');
});

router.get('/:id', (req, res) => {
    res.send('Holaaaa');
});

router.post('/', (req, res) => {
    res.send('Holaaaa');
});

router.put('/:id', (req, res) => {
    res.send('Holaaaa');
});

router.delete('/:id', (req, res) => {
    res.send('Holaaaa');
});

module.exports = router;