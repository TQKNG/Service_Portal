const { sendWebSocketMessage } = require("../utils/webSocketUtils");

const { storeImage, retrieveImage } = require("../utils/storage");
const { splitText } = require("../utils/TextFormatter");

const { poolPromise } = require("../config/db");

exports.addSetting = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getSettings = async (req, res) => {
  try {
    console.log("Tests imm herer");
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Settings_Load");

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Convert arry of objects to single object, where value is parsed from json string to json object
    const formattedSettings = results.recordset.reduce((obj, item) => {
      try {
        if (item.keyword !== "Language") {
          obj[item.keyword] = JSON.parse(item.valueStr);
        } else {
          obj[item.keyword] = item.valueStr;
        }
      } catch (error) {
        console.error(`Error parsing JSON for keyword ${item.keyword}:`, error);
      }
      return obj;
    }, {});

    // Once all asynchronous operations are complete, send the response
    res.status(200).json({
      success: true,
      data: formattedSettings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    console.log("Test here body", req.body);

    // Convert to json string for each property
    {
      `"outBreakMessage1": "There are currently no active outbreaks in the homes", "outBreakMessage2":"We are currently in outbreak"`;
    }

    let formatedSettings = {};

    formatedSettings["OutbreakMessage"] = JSON.stringify({
      outBreakMessage1: req.body.outbreakMessage1,
      outBreakMessage2: req.body.outbreakMessage2,
    });

    formatedSettings["OutbreakStatus"] = req.body.outbreakStatus;

    let results;
    const pool = await poolPromise;
    await pool
      .request()
      .input("keyword", "OutbreakMessage")
      .input("valueStr", formatedSettings["OutbreakMessage"])
      .execute("dbo.Settings_Update");

    await pool
      .request()
      .input("keyword", "OutbreakStatus")
      .input("valueStr", formatedSettings["OutbreakStatus"])
      .execute("dbo.Settings_Update");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
