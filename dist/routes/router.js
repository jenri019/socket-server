"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        message: 'GET Mensajes OK',
    });
});
router.post('/mensajes', (req, res) => {
    const { cuerpo, de } = req.body;
    res.json({
        ok: true,
        message: 'POST Listo',
        cuerpo,
        de,
    });
});
router.post('/mensajes/:id', (req, res) => {
    const { cuerpo, de } = req.body;
    const { id } = req.params;
    res.json({
        ok: true,
        message: 'POST Listo',
        cuerpo,
        de,
        para: id,
    });
});
exports.default = router;
