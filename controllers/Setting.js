const { sendWebSocketMessage } = require("../utils/webSocketUtils");


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

    let formatedSettings = {};

    formatedSettings["OutbreakMessage"] = JSON.stringify({
      outBreakMessage1: req.body.outbreakMessage1,
      outBreakMessage2: req.body.outbreakMessage2,
    });

    formatedSettings["OutbreakStatus"] = req.body.outbreakStatus;
    formatedSettings["Language"] = req.body.language;
    formatedSettings["VolumeSetting"] = req.body.volumeSetting;


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

    await pool
      .request()
      .input("keyword", "Language")
      .input("valueStr", formatedSettings["Language"])
      .execute("dbo.Settings_Update");

    // await pool
    //   .request()
    //   .input("keyword", "Volume")
    //   .input("valueStr", formatedSettings["VolumeSetting"])
    //   .execute("dbo.Settings_Update");
    

    sendWebSocketMessage({
      type: "dataReceived",
      data: "Outbreak Status Change",
    });
    
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
