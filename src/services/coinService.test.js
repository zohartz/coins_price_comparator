const chai = require("chai");
const sinon = require("sinon");
const assert = chai.assert;

const CoinsService = require("./coinsService");
const coinsService = new CoinsService();

describe("coinsService", () => {
  describe("getPrices", () => {
    let getHistoryPricesStub, getCurrentPricesStub;
    const date = "02/01/2021";

    beforeEach(function () {
      getHistoryPricesStub = sinon.stub(coinsService, "getHistoryPrices");
      getCurrentPricesStub = sinon.stub(coinsService, "getCurrentPrices");
    });

    afterEach(function () {
      getHistoryPricesStub.restore();
      getCurrentPricesStub.restore();
    });

    it("should return valid object", async () => {
      const resultStub = [
        {
          BTC: "-0.35835338812157946%",
        },
        {
          ETH: "-0.17802274613739622%",
        },
        {
          BNB: "-0.2783196774613028%",
        },
      ];

      const currentPricesStub = {
        BTC: {
          USD: 40873.96,
        },
        ETH: {
          USD: 2741.95,
        },
        BNB: {
          USD: 383.38,
        },
      };

      const historyPriceStub = {
        BTC: {
          USD: 41020.96,
        },
        ETH: {
          USD: 2746.84,
        },
        BNB: {
          USD: 384.45,
        },
      };

      const coinsList = "BTC,ETH,BNB";
      getHistoryPricesStub.returns(historyPriceStub);
      getCurrentPricesStub.returns(currentPricesStub);
      const result = await coinsService.getPrices(coinsList, date);
      sinon.assert.calledOnce(getHistoryPricesStub);
      sinon.assert.calledOnce(getCurrentPricesStub);
      assert.deepEqual(result, resultStub);
    });

    it("should return object without invalid coin", async () => {
      const resultStub = [
        {
          BTC: "0.4149247471154194%",
        },
        {
          ETH: "0.6295954514333291%",
        },
      ];

      const currentPricesStub = {
        BTC: {
          USD: 40986.4,
        },
        ETH: {
          USD: 2704.36,
        },
      };

      const historyPriceStub = {
        BTC: {
          USD: 40817.04,
        },
        ETH: {
          USD: 2687.44,
        },
      };

      const coinsList = "BTC,ETH,NOT-VALID-COIN";
      getHistoryPricesStub.returns(historyPriceStub);
      getCurrentPricesStub.returns(currentPricesStub);
      const result = await coinsService.getPrices(coinsList, date);
      sinon.assert.calledOnce(getHistoryPricesStub);
      sinon.assert.calledOnce(getCurrentPricesStub);
      assert.deepEqual(result, resultStub);
    });
  });
});
