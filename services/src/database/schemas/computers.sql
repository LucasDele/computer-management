CREATE TABLE computers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    pc_number VARCHAR(32) NOT NULL,
    status ENUM('Operational', 'Under Maintenance', 'Damaged', 'For Replacement') NOT NULL DEFAULT 'Operational',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_computers_pc_number (pc_number)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;