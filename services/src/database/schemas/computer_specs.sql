CREATE TABLE computer_specs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    computer_id BIGINT UNSIGNED NOT NULL,
    processor VARCHAR(128) NULL,
    ram VARCHAR(64) NULL,
    storage VARCHAR(64) NULL,
    operating_system VARCHAR(128) NULL,
    gpu VARCHAR(128) NULL,
    motherboard VARCHAR(128) NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uq_computer_specs_computer_id (computer_id),

    CONSTRAINT fk_computer_specs_computer FOREIGN KEY (computer_id) REFERENCES computers(computer_id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;