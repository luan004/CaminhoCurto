const express = require("express");
const { addLink, getCode } = require("./conn");

const router = express.Router();

router.post("/link", (req, res) => {
    const data = req.body;

    function isUrl(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    if (data.url && isUrl(data.url)) {
        addLink(data.url).then((code) => {
            return res.status(200).json({
                status: "success",
                code: code
            });
        });
    } else {
        return res.status(400).json({
            status: "error"
        });
    }
});

router.get("/link/:code", (req, res) => {
    const code = req.params.code;

    getCode(code).then((url) => {
        if (url.length > 0) {
            return res.status(200).json({
                status: "success",
                url: url[0].url
            });
        } else {
            return res.status(404).json({
                status: "error"
            });
        }
    }).catch(() => {
        return res.status(404).json({
            status: "error"
        });
    });
});

module.exports = router;