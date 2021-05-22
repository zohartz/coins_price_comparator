require("dotenv").config();
const { fetchData } = require("../utils/api");
const apiKey = process.env.API_KEY || "";
const baseURL = "https://min-api.cryptocompare.com/data/";

class CoinsService {
  constructor() {}

  comparePrices = async (coinsList, date) => {
    try {
      const coins = coinsList.split(",");
      const timestamp = new Date(date).valueOf();
      const headers = { authorization: `Apikey ${apiKey}` };
      const finalComparison = [];
      const currentPrices = await this.getCurrentPrices(coinsList, headers);
      const historyPrices = await this.getHistoryPrices(
        coins,
        headers,
        timestamp
      );
      for (const item in currentPrices) {
        if (historyPrices[item]) {
          const current = currentPrices[item].USD;
          const history = historyPrices[item].USD;
          const diff = `${(current / history - 1) * 100}%`;
          finalComparison.push({ [item]: diff });
        } else {
          finalComparison.push({ [item]: "no result found" });
        }
      }
      return finalComparison;
    } catch (error) {
      throw new Error(error);
    }
  };

  getCurrentPrices = async (coinsList, headers) => {
    const currentPricesUrl = `pricemulti?fsyms=${coinsList}&tsyms=USD`;
    return await fetchData(baseURL, currentPricesUrl, headers);
  };

  getHistoryPrices = async (coins, headers, timestamp) => {
    // fetch history prices for all required coins
    const historicalPrices = await Promise.all(
      coins.map((coin) => {
        return fetchData(
          baseURL,
          `pricehistorical?fsym=${coin}&tsyms=USD&ts=${timestamp}`, //to do put in string
          headers
        );
      })
    );

    // arrange history object with only valid results
    let historyPrice = {};
    for (const item of historicalPrices) {
      if (coins.indexOf(Object.keys(item)[0]) !== -1) {
        historyPrice = { ...historyPrice, ...item };
      }
    }

    return historyPrice;
  };
}

module.exports = CoinsService;
