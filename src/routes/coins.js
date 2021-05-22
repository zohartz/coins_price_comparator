const express = require("express");
const router = express.Router({ mergeParams: true });
const { handleError } = require("../utils/handleError");
const { STATUS } = require("../utils/constants");
const CoinsService = require("../services/coinsService");
const Response = require("../utils/response");
const coinsService = new CoinsService();

router.get("/", async (req, res) => {
  try {
    const coinsPrices = await coinsService.comparePrices(
      req.query.coinsList,
      req.query.date
    );
    const response = new Response(STATUS.OK, "coins prices comparison", coinsPrices);
    res.status(200).send(response);
  } catch (e) {
    handleError(req, res, e);
  }
});

module.exports = router;
