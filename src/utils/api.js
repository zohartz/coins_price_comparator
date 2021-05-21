const fetch = require("node-fetch");

exports.fetchData = async ( baseURL, url , headers={} ) => {
    try {
      const res = await fetch(baseURL + url,{
        headers
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err.message);
      throw new Error(error);
    }
  };