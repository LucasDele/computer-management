const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const computerSpecsService = require("../services/computer-specs-service.js");

// CREATE
const createComputerSpec = async (req, res) => {
  try {
    const { computer_id, processor, ram, storage, operating_system, gpu, motherboard } = req.body;

    const result = await computerSpecsService.createComputerSpec(
      computer_id,
      processor,
      ram,
      storage,
      operating_system,
      gpu,
      motherboard,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Computer specification created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer specification creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all computer specifications
const findAllComputerSpecs = async (req, res) => {
  try {
    const result = await computerSpecsService.findAllComputerSpecs();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer specifications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all computer specifications error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get computer specification by ID
const findComputerSpecById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await computerSpecsService.findComputerSpecById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer specification not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer specification retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find computer specification by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get computer specification by computer ID
const findComputerSpecByComputerId = async (req, res) => {
  try {
    const { computer_id } = req.params;

    const result = await computerSpecsService.findComputerSpecByComputerId(computer_id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer specification not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer specification retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find computer specification by computer ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateComputerSpec = async (req, res) => {
  try {
    const { id } = req.params;

    const { computer_id, processor, ram, storage, operating_system, gpu, motherboard } = req.body;

    const result = await computerSpecsService.updateComputerSpec(
      id,
      computer_id,
      processor,
      ram,
      storage,
      operating_system,
      gpu,
      motherboard,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer specification not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer specification updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer specification update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteComputerSpec = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await computerSpecsService.deleteComputerSpec(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Computer specification not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Computer specification deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Computer specification delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createComputerSpec,
  findAllComputerSpecs,
  findComputerSpecById,
  findComputerSpecByComputerId,
  updateComputerSpec,
  deleteComputerSpec,
};
