const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const maintenanceRecordsService = require("../services/maintenance-records-service.js");

// CREATE
const createMaintenanceRecord = async (req, res) => {
  try {
    const { computer_id, performed_by, maintenance_type, description, status, remarks } = req.body;

    const result = await maintenanceRecordsService.createMaintenanceRecord(
      computer_id,
      performed_by,
      maintenance_type,
      description,
      status,
      remarks,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Maintenance record created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Maintenance record creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all maintenance records
const findAllMaintenanceRecords = async (req, res) => {
  try {
    const result = await maintenanceRecordsService.findAllMaintenanceRecords();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Maintenance records retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all maintenance records error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get maintenance record by ID
const findMaintenanceRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await maintenanceRecordsService.findMaintenanceRecordById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Maintenance record not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Maintenance record retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find maintenance record by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get maintenance records by computer ID
const findMaintenanceRecordsByComputerId = async (req, res) => {
  try {
    const { computer_id } = req.params;

    const result = await maintenanceRecordsService.findMaintenanceRecordsByComputerId(computer_id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Maintenance records retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find maintenance records by computer ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateMaintenanceRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const { computer_id, performed_by, maintenance_type, description, status, remarks } = req.body;

    const result = await maintenanceRecordsService.updateMaintenanceRecord(
      id,
      computer_id,
      performed_by,
      maintenance_type,
      description,
      status,
      remarks,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Maintenance record not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Maintenance record updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Maintenance record update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteMaintenanceRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await maintenanceRecordsService.deleteMaintenanceRecord(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Maintenance record not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Maintenance record deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Maintenance record delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createMaintenanceRecord,
  findAllMaintenanceRecords,
  findMaintenanceRecordById,
  findMaintenanceRecordsByComputerId,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
};
