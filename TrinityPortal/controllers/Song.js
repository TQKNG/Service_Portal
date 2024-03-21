// @route   POST /api/song
// @desc    Add Song

const { sendWebSocketMessage } = require("../utils/webSocketUtils");

// @access  public
exports.addSong = async (req, res) => {
  try {
    console.log("test my request body", req.body);
    sendWebSocketMessage({ type: 'dataReceived', data: req.body});
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};