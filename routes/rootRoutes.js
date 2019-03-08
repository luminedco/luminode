const express = require("express"),
    router = express.Router();

router.get("/", (req, res, next) => {
    return res.status(200).json({
        "status": "OK"
    });
});

module.exports = router;