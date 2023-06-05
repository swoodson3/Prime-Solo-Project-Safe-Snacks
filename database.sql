
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE 
"user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"avatar" VARCHAR (1000) 
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


SELECT dogs.*, jsonb_agg(food.*) AS food
FROM dogs
LEFT JOIN food ON dogs.id = food.dog_id
GROUP BY dogs.id;




CREATE TABLE
"food" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" integer,
    "description" VARCHAR (1000) NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "notes" VARCHAR (1000) 
);


INSERT INTO "food" ("dog_id", "description", "favorite", "notes")
VALUES (1, 'Chicken and Rice', true, 'This is my dogs favorite food');



CREATE TABLE
"dangerous_foods" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (1000) NOT NULL,
    "details" VARCHAR (1000) NOT NULL,
    "symptoms" VARCHAR (1000) NOT NULL
);
    

INSERT INTO "dangerous_foods" ("name", "details", "symptoms")
VALUES
   ('Chocolate', 'Chocolate is toxic to dogs and can cause symptoms such as vomiting, diarrhea, restlessness, increased heart rate, and in severe cases, seizures or cardiac arrest.', 'Vomiting, diarrhea, restlessness, increased heart rate, seizures, cardiac arrest'),
    ('Grapes and raisins', 'Grapes and raisins can lead to kidney failure in dogs and may cause symptoms such as vomiting, diarrhea, abdominal pain, weakness, and increased thirst and urination.', 'Vomiting, diarrhea, abdominal pain, weakness, increased thirst, increased urination'),
    ('Onions and garlic', 'Onions and garlic can damage a dog''s red blood cells, causing symptoms like weakness, pale gums, rapid breathing, vomiting, diarrhea, and dark-colored urine.', 'Weakness, pale gums, rapid breathing, vomiting, diarrhea, dark-colored urine'),
    ('Xylitol', 'Xylitol, found in sugar-free products, can result in low blood sugar levels, causing vomiting, loss of coordination, weakness, seizures, and liver failure in dogs.', 'Vomiting, loss of coordination, weakness, seizures, liver failure'),
    ('Avocado', 'Avocado, particularly the leaves, fruit, and pit, contains a toxin called persin, which can cause gastrointestinal issues and potential obstruction in dogs.', 'Gastrointestinal issues, potential obstruction'),
    ('Alcohol', 'Alcohol is highly toxic to dogs, leading to symptoms such as disorientation, lethargy, coordination problems, vomiting, diarrhea, difficulty breathing, coma, and even death.', 'Disorientation, lethargy, coordination problems, vomiting, diarrhea, difficulty breathing, coma, death'),
    ('Coffee and caffeine', 'Coffee and caffeine contain methylxanthines that are toxic to dogs, causing restlessness, increased heart rate, panting, tremors, vomiting, diarrhea, muscle spasms, seizures, and potentially life-threatening arrhythmias.', 'Restlessness, increased heart rate, panting, tremors, vomiting, diarrhea, muscle spasms, seizures, life-threatening arrhythmias'),
    ('Macadamia nuts', 'Macadamia nuts can cause weakness, tremors, vomiting, elevated body temperature, joint pain, and mobility issues in dogs.', 'Weakness, tremors, vomiting, elevated body temperature, joint pain, mobility issues'),
    ('Dairy products', 'Large quantities of dairy products can result in digestive upset, including diarrhea and gas, as many dogs are lactose intolerant.', 'Digestive upset, diarrhea, gas'),
    ('Raw or undercooked meat, eggs, and bones', 'Raw or undercooked meat, eggs, and bones pose the risk of bacterial contamination, digestive issues, and potential choking, blockages, or intestinal perforations.', 'Bacterial contamination, digestive issues, choking, blockages, intestinal perforations');

CREATE TABLE
"dangerous_plants" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (1000) NOT NULL,
    "details" VARCHAR (1000) NOT NULL,
    "symptoms" VARCHAR (1000) NOT NULL
    
);

INSERT INTO "dangerous_plants" ("name", "details", "symptoms")
VALUES
   ('Sago palm', 'The Sago palm contains cycasin, which is highly toxic to dogs and can cause symptoms such as vomiting, diarrhea, seizures, liver failure, and even death.', 'Vomiting, diarrhea, seizures, liver failure, death'),
    ('Lilies', 'Certain species of lilies, such as Easter lilies, are extremely toxic to cats and can cause kidney failure. Ingestion can result in symptoms like vomiting, loss of appetite, lethargy, and dehydration.', 'Vomiting, loss of appetite, lethargy, dehydration, kidney failure'),
    ('Azaleas and rhododendrons', 'Azaleas and rhododendrons contain grayanotoxins that can cause symptoms such as vomiting, diarrhea, excessive drooling, weakness, and in severe cases, cardiovascular issues or coma.', 'Vomiting, diarrhea, excessive drooling, weakness, cardiovascular issues, coma'),
    ('Tulips and daffodils', 'Tulips and daffodils contain toxins that can cause gastrointestinal upset, drooling, loss of appetite, and, in rare cases, heart problems or organ damage in dogs.', 'Gastrointestinal upset, drooling, loss of appetite, heart problems, organ damage'),
    ('Oleander', 'Oleander is highly toxic to dogs and can cause symptoms such as gastrointestinal issues, irregular heart rate, tremors, seizures, and in severe cases, cardiac arrest.', 'Gastrointestinal issues, irregular heart rate, tremors, seizures, cardiac arrest'),
    ('Dieffenbachia', 'Dieffenbachia contains calcium oxalate crystals that can cause intense oral irritation, excessive drooling, difficulty swallowing, and vomiting in dogs.', 'Oral irritation, excessive drooling, difficulty swallowing, vomiting'),
    ('Castor bean', 'The seeds of the castor bean plant contain ricin, a potent toxin that can lead to symptoms such as abdominal pain, vomiting, diarrhea, tremors, seizures, and, in severe cases, organ failure.', 'Abdominal pain, vomiting, diarrhea, tremors, seizures, organ failure'),
    ('Autumn crocus', 'Autumn crocus plants contain colchicine, which can cause symptoms such as drooling, vomiting, diarrhea, abdominal pain, organ damage, and bone marrow suppression in dogs.', 'Drooling, vomiting, diarrhea, abdominal pain, organ damage, bone marrow suppression'),
    ('Yew', 'Yew is highly toxic to dogs and can cause symptoms such as difficulty breathing, trembling, dilated pupils, seizures, and in severe cases, cardiac arrest or death.', 'Difficulty breathing, trembling, dilated pupils, seizures, cardiac arrest, death'),
    ('Aloe vera', 'While aloe vera is generally safe for topical use, ingestion of aloe vera plants can cause gastrointestinal upset, vomiting, diarrhea, tremors, and in rare cases, changes in urine color or kidney damage in dogs.', 'Gastrointestinal upset, vomiting, diarrhea, tremors, changes in urine color, kidney damage');
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
-- CREATE TABLE
-- "dogs_food" (
--     "id" SERIAL PRIMARY KEY,
--     "dog_id" integer,
--     "food_id" integer,
--     "category_id" integer
-- );


CREATE TABLE
"food" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" integer,
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