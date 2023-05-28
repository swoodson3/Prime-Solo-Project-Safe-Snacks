
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE 
"user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
    "avatar"  VARCHAR (1000),
);

CREATE TABLE
"dogs" (
	"id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
	"user_id" integer,
	"notes" VARCHAR (1000) NOT NULL,
	"breed" VARCHAR (1000) NOT NULL,
	"weight" DECIMAL,
	"birthday" DATE,
	"gender" VARCHAR (1000) NOT NULL
);

-- stretch goal feature with more than one dog 
CREATE TABLE
"dogs_food" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" integer,
    "food_id" integer,
    "category_id" integer
);


CREATE TABLE
"food" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (1000) NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "notes" VARCHAR (1000) NOT NULL
);

-- stretch goal 
CREATE TABLE
"category" (
    "id" SERIAL PRIMARY KEY,
    "safe" BOOLEAN NOT NULL,
    "allergy" BOOLEAN NOT NULL,
    "name" VARCHAR (1000) NOT NULL
);

CREATE TABLE
"poisonous_food" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (1000) NOT NULL,
    "symptoms" VARCHAR (1000) NOT NULL,
    "notes" VARCHAR (1000) NOT NULL
);