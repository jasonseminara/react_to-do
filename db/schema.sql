DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  task_id serial unique primary key,
  task_name VARCHAR(50) not null,
  task_desc TEXT,
  completed boolean not null default false,
  task_time_start timestamp,
  task_time_end timestamp,
  task_created timestamp not null default now()
);


CREATE INDEX on tasks (completed) ;
CREATE INDEX on tasks (task_time_start) ;
CREATE INDEX on tasks (task_created) ;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id serial unique primary key,
  name VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  password_digest TEXT not null,
  user_created timestamp not null default now()
);
CREATE INDEX on users (username) ;
CREATE INDEX on users (email) ;

