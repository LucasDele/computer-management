const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const computersService = require("../services/computers-service.js");

// CREATE
const createComputer = async (req, res) => {
  try {
    const { pc_number, status } = req.body;

    const result = await computersService.createComputer(pc_number, status);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Computer created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all computers
const findAllComputers = async (req, res) => {
  try {
    const result = await computersService.findAllComputers();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computers retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all computers error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get computer by ID
const findComputerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await computersService.findComputerById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find computer by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get computer by PC number
const findComputerByPcNumber = async (req, res) => {
  try {
    const { pc_number } = req.params;

    const result = await computersService.findComputerByPcNumber(pc_number);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find computer by PC number error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get computers by status
const findComputersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const result = await computersService.findComputersByStatus(status);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computers retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find computers by status error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const { pc_number, status } = req.body;

    const result = await computersService.updateComputer(id, pc_number, status);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteComputer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await computersService.deleteComputer(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createComputer,
  findAllComputers,
  findComputerById,
  findComputerByPcNumber,
  findComputersByStatus,
  updateComputer,
  deleteComputer,
};
