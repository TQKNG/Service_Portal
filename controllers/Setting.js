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
    let formatedSettings = {};
    const pool = await poolPromise;

    formatedSettings["OutbreakMessage"] = JSON.stringify({
      outBreakMessage1: req.body.outbreakMessage1,
      outBreakMessage2: req.body.outbreakMessage2,
    });

    formatedSettings["OutbreakStatus"] = req.body.outbreakStatus;
    formatedSettings["SelectedMessage"] = req.body.selectedMessage; 
    formatedSettings["Language"] = req.body.language;
    formatedSettings["VolumeSetting"] = JSON.stringify(req.body.volumeSetting);
    formatedSettings["AdminOffices"] = JSON.stringify(req.body.adminOffices);
    formatedSettings["OtherMessage"] = JSON.stringify({
      otherMessage1: req.body.otherMessage1,
      otherMessage2: req.body.otherMessage2,
      otherMessage3: req.body.otherMessage3,
      otherMessage4: req.body.otherMessage4,
    });

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

    await pool
      .request()
      .input("keyword", "VolumeSetting")
      .input("valueStr", formatedSettings["VolumeSetting"])
      .execute("dbo.Settings_Update");

    await pool
      .request()
      .input("keyword", "OtherMessage")
      .input("valueStr", formatedSettings["OtherMessage"])
      .execute("dbo.Settings_Update");

    await pool
      .request()
      .input("keyword", "AdminOffices")
      .input("valueStr", formatedSettings["AdminOffices"])
      .execute("dbo.Settings_Update");

    await pool
      .request()
      .input("keyword", "SelectedMessage")
      .input("valueStr", formatedSettings["SelectedMessage"])
      .execute("dbo.Settings_Update");

    sendWebSocketMessage({
      type: "dataReceived",
      data: "Settings Updated",
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
