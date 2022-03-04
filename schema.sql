-- DROP DATABASE IF EXISTS sdcReviews;
-- CREATE DATABASE sdcReviews;

\c sdcreviews;

DROP TABLE IF EXISTS review, reviews, characteristics, userInfo, characteristic, photos, characteristic_value, join_table;

-- CREATE TABLE userInfo (
--  id BIGSERIAL PRIMARY KEY NOT NULL,
--  product_id INTEGER,
--  reviewer_name VARCHAR(40),
--  reviewer_email VARCHAR(40)
-- );

CREATE TABLE review (
 id BIGSERIAL PRIMARY KEY NOT NULL,
 product_id BIGINT,
 rating BIGINT,
 date BIGINT,
 summary TEXT,
 body TEXT,
 recommend BOOLEAN,
 reported BOOLEAN,
 reviewer_name TEXT,
 reviewer_email TEXT,
 response TEXT,
 helpfulness BIGINT
);

-- id,product_id,name
CREATE TABLE characteristic (
 id BIGSERIAL PRIMARY KEY NOT NULL,
 product_id BIGINT,
 name VARCHAR(60)
);

CREATE TABLE photos (
 id BIGSERIAL PRIMARY KEY NOT NULL,
 review_id BIGINT,
 url VARCHAR(400)
);

-- id,characteristic_id,review_id,value
CREATE TABLE characteristic_value (
 id BIGSERIAL PRIMARY KEY,
 characteristic_id BIGINT,
 review_id BIGINT,
 value BIGINT
);

CREATE TABLE join_table (
 characteristic_id INTEGER PRIMARY KEY NOT NULL,
 value_id BIGINT
 );

-- ALTER TABLE review ADD CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id) REFERENCES userInfo(id);
-- ALTER TABLE characteristic ADD CONSTRAINT characteristic_product_id_fkey FOREIGN KEY (product_id) REFERENCES userInfo(id);
ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);
ALTER TABLE join_table ADD CONSTRAINT join_table_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristic(id);
ALTER TABLE join_table ADD CONSTRAINT join_table_value_id_fkey FOREIGN KEY (value_id) REFERENCES characteristic_value(id);

\copy review from files/reviews.csv delimiter ',' csv header;
\copy photos from files/reviews_photos.csv delimiter ',' csv header;
\copy characteristic from files/characteristics.csv delimiter ',' csv header;
\copy characteristic_value from files/characteristic_reviews.csv delimiter ',' csv header;