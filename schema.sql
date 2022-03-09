-- DROP DATABASE IF EXISTS sdcReviews;
-- CREATE DATABASE sdcReviews;

\c sdcreviews;

DROP TABLE IF EXISTS review, reviews, products, characteristics, userInfo, characteristic, photos, characteristic_value, join_table;

CREATE TABLE products (
 id BIGSERIAL PRIMARY KEY,
 name VARCHAR(400) NOT NULL,
 slogan TEXT NOT NULL,
 description TEXT NOT NULL,
 category VARCHAR(400) NOT NULL,
 default_price INTEGER NOT NULL
);

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

CREATE TABLE characteristic_value (
 id BIGSERIAL PRIMARY KEY,
 characteristic_id BIGINT,
 review_id BIGINT,
 value BIGINT
);

-- CREATE TABLE join_table (
--  id BIGSERIAL PRIMARY KEY,
--  characteristic_id INTEGER NOT NULL,
--  review_id INTEGER NOT NULL,
--  value_id BIGINT
--  );

-- Alter time stamp before query
-- zone via a USING clause:
-- ALTER TABLE review
--     ALTER COLUMN date SET DATA TYPE timestamp with time zone
--     USING
--         timestamp with time zone 'epoch' + CAST(date AS BIGINT)/1000 * interval '1 second';

-- ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);
-- ALTER TABLE join_table ADD CONSTRAINT join_table_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristic(id);
-- ALTER TABLE join_table ADD CONSTRAINT join_table_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);


-- ALTER TABLE review ADD CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);

\copy products from files/product.csv delimiter ',' csv header;
\copy review from files/reviews.csv delimiter ',' csv header;
\copy photos from files/reviews_photos.csv delimiter ',' csv header;
\copy characteristic from files/characteristics.csv delimiter ',' csv header;
\copy characteristic_value from files/characteristic_reviews.csv delimiter ',' csv header;

-- NEW
ALTER TABLE review ADD CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);
ALTER TABLE characteristic ADD CONSTRAINT characteristic_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE characteristic_value ADD CONSTRAINT characteristic_value_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristic(id);
ALTER TABLE characteristic_value ADD CONSTRAINT characteristic_value_review_id_fkey FOREIGN KEY (review_id) REFERENCES review(id);

CREATE INDEX ON photos (review_id);
CREATE INDEX ON review (product_id);