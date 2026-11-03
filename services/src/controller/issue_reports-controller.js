const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const issueReportsService = require("../services/issue-reports-service.js");

// CREATE
const createIssueReport = async (req, res) => {
  try {
    const { computer_id, reported_by, issue_description, priority, status, resolved_date } = req.body;

    const result = await issueReportsService.createIssueReport(
      computer_id,
      reported_by,
      issue_description,
      priority,
      status,
      resolved_date,
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Issue report created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Issue report creation error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get all issue reports
const findAllIssueReports = async (req, res) => {
  try {
    const result = await issueReportsService.findAllIssueReports();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue reports retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find all issue reports error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get issue report by ID
const findIssueReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await issueReportsService.findIssueReportById(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Issue report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue report retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find issue report by ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// READ - Get issue reports by computer ID
const findIssueReportsByComputerId = async (req, res) => {
  try {
    const { computer_id } = req.params;

    const result = await issueReportsService.findIssueReportsByComputerId(computer_id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue reports retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Find issue reports by computer ID error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// UPDATE
const updateIssueReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { computer_id, reported_by, issue_description, priority, status, resolved_date } = req.body;

    const result = await issueReportsService.updateIssueReport(
      id,
      computer_id,
      reported_by,
      issue_description,
      priority,
      status,
      resolved_date,
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Issue report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue report updated successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Issue report update error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

// DELETE
const deleteIssueReport = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await issueReportsService.deleteIssueReport(id);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Issue report not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Issue report deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Issue report delete error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  createIssueReport,
  findAllIssueReports,
  findIssueReportById,
  findIssueReportsByComputerId,
  updateIssueReport,
  deleteIssueReport,
};
