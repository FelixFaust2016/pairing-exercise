const transformDataToArray = (rawData) => {
  const fields = rawData.fields;
  const data = rawData.data;

  return data.map((item) => {
    return {
      cik_str: item[fields.indexOf("cik")],
      title: item[fields.indexOf("name")],
      ticker: item[fields.indexOf("ticker")],
      exchange: item[fields.indexOf("exchange")]
    };
  });
};

module.exports = transformDataToArray;
