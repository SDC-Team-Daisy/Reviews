DROP DATABASE IF EXISTS reviewrating;
CREATE DATABASE reviewrating;
USE reviewrating;

CREATE TABLE user (
 id BIGSERIAL NOT NULL DEFAULT NOT NULL,
 product_id INTEGER NOT NULL DEFAULT NOT NULL,
 name VARCHAR(40) NOT NULL DEFAULT 'NOT NULL',
 email VARCHAR(40) NOT NULL DEFAULT 'NOT NULL'
);

ALTER TABLE user ADD CONSTRAINT user_pkey PRIMARY KEY (id);

CREATE TABLE review (
 id BIGSERIAL NOT NULL DEFAULT NOT NULL,
 user_id INTEGER NOT NULL DEFAULT NOT NULL,
 rating SMALLINT NOT NULL DEFAULT NOT NULL,
 summary TEXT NOT NULL DEFAULT 'NOT NULL',
 body TEXT NOT NULL DEFAULT 'NOT NULL',
 response TEXT,
 date VARCHAR NOT NULL DEFAULT 'NOT NULL',
 helpfulness SMALLINT NOT NULL DEFAULT NOT NULL,
 report SMALLINT
);


ALTER TABLE review ADD CONSTRAINT review_pkey PRIMARY KEY (id);

CREATE TABLE characteristic (
 id BIGSERIAL,
 user_id INTEGER NOT NULL DEFAULT NOT NULL,
 name VARCHAR,
 value INTEGER
);


ALTER TABLE characteristic ADD CONSTRAINT characteristic_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL,
 review_id INTEGER NOT NULL DEFAULT NOT NULL,
 url VARCHAR
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

CREATE TABLE characteristic_value (
 id BIGSERIAL,
 value SMALLINT
);


ALTER TABLE characteristic_value ADD CONSTRAINT characteristic_value_pkey PRIMARY KEY (id);

CREATE TABLE join_table (
 characteristic_id INTEGER NOT NULL DEFAULT NOT NULL,
 value_id SMALLINT NOT NULL DEFAULT NOT NULL
);


ALTER TABLE join_table ADD CONSTRAINT join_table_pkey PRIMARY KEY (characteristic_id);

ALTER TABLE review ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE characteristic ADD CONSTRAINT characteristic_user_id_fkey FOREIGN KEY (user_id) REFERENCES user(id);
ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);
ALTER TABLE join_table ADD CONSTRAINT join_table_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristic(id);
ALTER TABLE join_table ADD CONSTRAINT join_table_value_id_fkey FOREIGN KEY (value_id) REFERENCES characteristic_value(id);