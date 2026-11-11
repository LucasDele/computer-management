const db = require("../config/database.js");

const {
  CREATE_MAINTENANCE_RECORD,
  FIND_ALL_MAINTENANCE_RECORDS,
  FIND_MAINTENANCE_RECORD_BY_ID,
  FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID,
  UPDATE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD,
} = require("../database/queries/maintenance_records-query.js");

// CREATE
const createMaintenanceRecord = async (computer_id, performed_by, maintenance_type, description, status, remarks) => {
  if (!computer_id || !performed_by || !maintenance_type || !description || !status) {
    throw new Error("Computer ID, performed by, maintenance type, description, and status are required.");
  }

  const [result] = await db.query(CREATE_MAINTENANCE_RECORD, [
    computer_id,
    performed_by,
    maintenance_type,
    description,
    status,
    remarks,
  ]);

  return result;
};

// READ - Get all maintenance records
const findAllMaintenanceRecords = async () => {
  const [rows] = await db.query(FIND_ALL_MAINTENANCE_RECORDS);

  return rows;
};

// READ - Get maintenance record by ID
const findMaintenanceRecordById = async (id) => {
  if (!id) {
    throw new Error("Maintenance record ID is required.");
  }

  const [rows] = await db.query(FIND_MAINTENANCE_RECORD_BY_ID, [id]);

  return rows[0] || null;
};

// READ - Get maintenance records by computer ID
const findMaintenanceRecordsByComputerId = async (computer_id) => {
  if (!computer_id) {
    throw new Error("Computer ID is required.");
  }

  const [rows] = await db.query(FIND_MAINTENANCE_RECORDS_BY_COMPUTER_ID, [computer_id]);

  return rows;
};

// UPDATE
const updateMaintenanceRecord = async (
  id,
  computer_id,
  performed_by,
  maintenance_type,
  description,
  status,
  remarks,
) => {
  if (!id) {
    throw new Error("Maintenance record ID is required.");
  }

  if (!computer_id || !performed_by || !maintenance_type || !description || !status) {
    throw new Error("Computer ID, performed by, maintenance type, description, and status are required.");
  }

  const [result] = await db.query(UPDATE_MAINTENANCE_RECORD, [
    computer_id,
    performed_by,
    maintenance_type,
    description,
    status,
    remarks,
    id,
  ]);

  return result;
};

// DELETE
const deleteMaintenanceRecord = async (id) => {
  if (!id) {
    throw new Error("Maintenance record ID is required.");
  }

  const [result] = await db.query(DELETE_MAINTENANCE_RECORD, [id]);

  return result;
};

module.exports = {
  createMaintenanceRecord,
  findAllMaintenanceRecords,
  findMaintenanceRecordById,
  findMaintenanceRecordsByComputerId,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
};

