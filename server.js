const express = require("express");
const transformDataToArray = require("./utils/transformData");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
let jsonData = null;
let activity = {};

const fetchData = async () => {
  try {
    const url = "https://www.sec.gov/files/company_tickers_exchange.json";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyApp/1.0 (contact@example.com)",
        "Accept-Encoding": "gzip, deflate",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    jsonData = await response.json();
    jsonData = transformDataToArray(jsonData);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

app.get("/api/ticker/:ticker", (req, res) => {
  const { ticker } = req.params;

  const tickerExists = jsonData.find(
    (tickerData) => tickerData.ticker === ticker
  );

  if (!tickerExists) {
    return res.status(400).json({ message: "ticker does not exist!" });
  }

  if (activity.hasOwnProperty(ticker)) {
    activity = { ...activity, [ticker]: activity[ticker] + 1 };
    return res.json({ ...tickerExists }).status(200);
  }

  activity = { ...activity, [ticker]: 1 };
  return res.json({ ...tickerExists }).status(200);
});

app.get("/api/activity", (req, res) => {
  return res.json({ ...activity }).status(200);
});

app.listen(PORT, () => {
  console.log(`Port is running on 8080!!!`);
});
