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
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Settings_Load");

    if (results.recordset.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

     // Once all asynchronous operations are complete, send the response
     res.status(200).json({
      success: true,
      data: results.recordset,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.updateSetting = async (req, res) => {
  try {
     
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
