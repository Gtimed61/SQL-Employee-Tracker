INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 120000, 2),
  ('Software Engineer', 100000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 130000, 4),
  ('Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Moe', 1, NULL),
  ('Dan', 'Chang', 2, 1),
  ('Ashliegh', 'Ramirez', 3, NULL),
  ('Keith', 'Thorn', 4, 3),
  ('Malik', 'Noel', 5, NULL),
  ('Sam', 'Lowe', 6, NULL),
  ('Tom', 'Allen', 7, 6),
  ('Megan', 'Barnes', 8, 6);

