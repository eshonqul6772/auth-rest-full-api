const router = require('express').Router();

const adminRoutes = require("./admin");

router.use("/admin", adminRoutes)

router.get("/", (req, res) => {
  res.write("ok")
  res.end();
});

module.exports = router;