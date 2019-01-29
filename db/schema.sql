DROP DATABASE adoptPuppies_db;

CREATE DATABASE adoptPuppies_db;
USE adoptPuppies_db;

CREATE TABLE Puppies(
id INTEGER auto_increment not null,
puppy_name VARCHAR(255) not null,
adopted boolean DEFAULT false not null,
PRIMARY KEY(id)
);

CREATE TABLE PuppiesAdopted(
id INTEGER auto_increment not null,
puppy_name VARCHAR(255) not null,
adopted boolean DEFAULT false not null,
PRIMARY KEY(id)
);
