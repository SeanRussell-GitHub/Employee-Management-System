DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  role_id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  manager_id INT,
  title VARCHAR(30) NOT NULL
);

CREATE TABLE manager (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_title VARCHAR(30) NOT NULL,
  role_id INT
);