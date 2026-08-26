CREATE TABLE maintenance_records (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    computer_id BIGINT UNSIGNED NOT NULL,
    performed_by BIGINT UNSIGNED NOT NULL,
    maintenance_type ENUM('Preventive', 'Corrective', 'Repair', 'Upgrade') NOT NULL,
    description TEXT NOT NULL,
    date_performed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Scheduled', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Scheduled',
    remarks TEXT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_maintenance_records_computer FOREIGN KEY (computer_id) REFERENCES computers(id),
    CONSTRAINT fk_maintenance_records_staff FOREIGN KEY (performed_by) REFERENCES staffs(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;