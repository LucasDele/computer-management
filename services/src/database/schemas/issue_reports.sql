CREATE TABLE issue_reports (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    computer_id BIGINT UNSIGNED NOT NULL,
    reported_by BIGINT UNSIGNED NOT NULL,
    issue_description TEXT NOT NULL,
    priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    status ENUM('Pending', 'In Progress', 'Resolved') NOT NULL DEFAULT 'Pending',
    date_reported TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_issue_reports_computer FOREIGN KEY (computer_id) REFERENCES computers(computer_id),
    CONSTRAINT fk_issue_reports_staff FOREIGN KEY (reported_by)  REFERENCES staffs(id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;