// @route   POST /api/school
// @desc    Add User
// @access  public
exports.addReception = async (req, res) => {
  try {
    console.log("test my request body", req.body);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};