// ROTAS HOMOLOGAÇÃO

const express = require("express");

const router = express.Router();

router.post("/link", (req, res) => {
    const data = req.body;

    if (data.url.length > 2048) {
        return res.status(400).json({
            status: "error",
            message: "A URL é muito longa :/ (máximo de 2048 caracteres)"
        });
    }

    function isUrl(str) {
        // check if a string is a valid URL
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    
    if (data.url && isUrl(data.url)) {
        return res.status(200).json({
            status: "success",
            code: "KH2435J"
        });
    } else {
        return res.status(400).json({
            status: "error",
            message: "A URL é inválida :/"
        });
    }
});

router.get("/link/:code", (req, res) => {
    const code = req.params.code;
    
    if (code === "KH2435J") {
        return res.status(200).json({
            status: "success",
            url: "https://www.google.com"
        });
    } else {
        return res.status(404).json({
            status: "error"
        });
    }
});

module.exports = router;