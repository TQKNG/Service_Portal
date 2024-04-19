const { poolPromise } = require("../config/db");

exports.addReception = async (req, res) => {
  try {
    console.log("test my request body2", req.body);
  
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getReceptions = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results;

    results = await pool.request().execute("dbo.Visits_Load");

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


exports.updateReception = async (req, res) => {
  try {
    if (req.body) {
      const { SongID, Name, Lyrics, SongData, SongLogo } = req.body;

      const pool = await poolPromise;

      if(SongData !== ""){
        var songPath = await storeAudio("SongAudio", SongData, SongID);
      }

      if(SongLogo !== ""){
        var imgPath = await storeImage("SongLogo", SongLogo, SongID);
      }

      await pool
        .request()
        .input("singSongID", SongID)
        .input("songName", Name)
        .input("songPath", songPath)
        .input("imagePath", imgPath)
        .input("lyrics", Lyrics)
        .execute("dbo.Songs_Update");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.deleteReception = async (req, res) => {
  try {
    const pool = await poolPromise;
    const results = await pool
      .request()
      .input("singSongID", req.params.songID)
      .execute("dbo.Songs_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};