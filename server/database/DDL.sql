USE tech_award_2024;

-- Roles table for users (e.g., job_seeker, director, employee)
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    role_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Inserting default roles
INSERT INTO roles (role_name) VALUES ('job_seeker'), ('director'), ('employee'), ('recruiter');

-- Users table for storing basic user information
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NULL,
    password_hash VARCHAR(255) NOT NULL,
    main_phone_number VARCHAR(15) NOT NULL UNIQUE,  -- Main phone number directly in users table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for storing extended user information
DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info (
    user_info_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('male', 'female', 'other'),
    birth_date DATE,
    skills TEXT,  -- To store a list of skills
    tax_certification_file VARCHAR(255),  -- Path or name of tax certification file
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint linking to users
    CONSTRAINT fk_user_info_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Linking users to roles (job seeker, director, employee)
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
    user_role_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    role_id TINYINT UNSIGNED NOT NULL,
    
    -- Foreign key constraints
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE RESTRICT
);

-- Organizations table to store organization information
DROP TABLE IF EXISTS organizations;
CREATE TABLE organizations (
    organization_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    legal_name VARCHAR(255) NOT NULL UNIQUE,  -- Legal name of the organization
    brand_name VARCHAR(255) UNIQUE,          -- Brand name (optional)
    director_id INT UNSIGNED,                -- Director (user) who is the head of the organization
    phone_number VARCHAR(15),                -- Organization phone number
    email VARCHAR(255) UNIQUE,               -- Organization email
    description TEXT,                        -- Description of the organization
    logo VARCHAR(255),                       -- Path or name of the logo file
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint linking the director to a user
    CONSTRAINT fk_organizations_director FOREIGN KEY (director_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Table to associate users with organizations (for roles like director or employee)
DROP TABLE IF EXISTS organization_members;
CREATE TABLE organization_members (
    org_member_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    
    -- Foreign key constraints
    CONSTRAINT fk_org_members_org FOREIGN KEY (organization_id) REFERENCES organizations(organization_id) ON DELETE CASCADE,
    CONSTRAINT fk_org_members_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- for web page
DROP TABLE IF EXISTS about_us;
CREATE TABLE about_us (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo_file VARCHAR(255),  -- Path to the logo file
    description TEXT,
    privacy_policy_link VARCHAR(255),
    terms_of_service_link VARCHAR(255)
);

DROP TABLE IF EXISTS faq;
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
