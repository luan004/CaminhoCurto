// ROTAS HOMOLOGAÇÃO

const express = require("express");

const router = express.Router();

router.post("/link", (req, res) => {
    const data = req.body;

    function isUrl(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo opcional
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // nome do domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou endereço IP (v4)
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragmento
        return !!pattern.test(str);
    }

    if (data.url && isUrl(data.url)) {
        return res.status(200).json({
            status: "success",
            code: "KH2435J"
        });
    } else {
        return res.status(400).json({
            status: "error"
        });
    }
});



module.exports = router;