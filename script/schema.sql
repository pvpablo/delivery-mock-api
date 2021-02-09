CREATE TABLE CITIZEN (
    government_id varchar(18) PRIMARY KEY, 
    firstname TEXT NOT NULL, 
    lastname TEXT NOT NULL, 
    birthdate date NOT NULL,
    biological_sex char(1),
    nationality VARCHAR(255) NOT NULL
);

CREATE TABLE REGISTRATION (
    registration_id SERIAL,
    government_id varchar(18) UNIQUE,
    contact_number varchar(20) NOT NULL,
    email TEXT,
    residence_city VARCHAR(255) NOT NULL,
    FOREIGN KEY(government_id) REFERENCES CITIZEN(government_id),
    PRIMARY KEY(registration_id) 
);