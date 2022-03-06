(SELECT json_agg(json_build_object(
  'review_id',(SELECT id from review where product_id = $1),
  'rating', (SELECT rating from review where product_id = $1),
  'summary', (SELECT summary from review where product_id = $1),
  'recommend', (SELECT recommend from review where product_id = $1),
  'response', (SELECT response from review where product_id = $1),
  'body', (SELECT body from review where product_id = $1),
  'date', (SELECT date from review where product_id = $1),
  'reviewer_name', (SELECT reviewer_name from review where product_id = $1),
  'helpfulness', (SELECT helpfulness from review where product_id = $1)
)), [params])

  (
  'product', (SELECT product_id from review where product_id = $1),
  'results', (SELECT json_agg(row_to_json(
  'review_id',(SELECT id from review where product_id = $1),
  'rating', (SELECT rating from review where product_id = $1),
  'summary', (SELECT summary from review where product_id = $1),
  'recommend', (SELECT recommend from review where product_id = $1),
  'response', (SELECT response from review where product_id = $1),
  'body', (SELECT body from review where product_id = $1),
  'date', (SELECT date from review where product_id = $1),
  'reviewer_name', (SELECT reviewer_name from review where product_id = $1),
  'helpfulness', (SELECT helpfulness from review where product_id = $1)
  );

  //USED THIS ONE
SELECT json_agg( json_build_object(
  'review_id',review.id,
  'rating', review.rating,
  'summary', review.summary,
  'recommend', review.recommend,
  'response', review.response,
  'body', review.body,
  'date', review.date,
  'reviewer_name', review.reviewer_name,
  'helpfulness', review.helpfulness,
  'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'id', photos.id,'url', photos.url) ) AS photos FROM photos WHERE photos.review_id = review.id) AS photos)
)) AS results FROM review WHERE product_id = $1;
//AS ____ = variables
//FROM photos is table name
//where review_id photos table equals id from review table as whatever you named lined 40
//results is property name otherwise json_agg

SELECT json_agg( json_build_object(
  'review_id',review.id,
  'rating', review.rating,
  'summary', review.summary,
  'recommend', review.recommend,
  'response', review.response,
  'body', review.body,
  'date', review.date,
  'reviewer_name', review.reviewer_name,
  'helpfulness', review.helpfulness,
  'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(row_to_json(p)) FROM ( SELECT id, url FROM photos WHERE review_id = review.id) p) AS photos)
)) AS results FROM review WHERE product_id = $1;

"SELECT json_agg(json_build_object('review_id',(SELECT id from review where product_id = $1),'rating', (SELECT rating from review where product_id = $1,'summary', (SELECT summary from review where product_id = $1),'recommend', (SELECT recommend from review where product_id = $1),'response', (SELECT response from review where product_id = $1),'body', (SELECT body from review where product_id = $1),'date', (SELECT date from review where product_id = $1),'reviewer_name', (SELECT reviewer_name from review where product_id = $1),'helpfulness', (SELECT helpfulness from review where product_id = $1))) AS results FROM review WHERE product_id = $1;"

SELECT json_agg(row_to_json(reviews)) FROM ( SELECT id, rating, summary, recommend FROM review WHERE product_id = $1) reviews;


  {
    product_id: number,
results:r
  }
//works for just prod id and results array obj
  ("SELECT json_agg(row_to_json(reviews)) FROM ( SELECT id, rating, summary, recommend FROM review WHERE product_id = $1) reviews;", [params])
  //with null
  ("SELECT json_agg(json_build_object('review_id',review.id,'rating', review.rating,'summary', review.summary,'recommend', review.recommend,'response', review.response,'body', review.body,'date', review.date,'reviewer_name', review.reviewer_name,'helpfulness', review.helpfulness,'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'id', photos.id,'url', photos.url) ) AS photos from photos WHERE photos.review_id = review.id) AS photos))) AS results FROM review WHERE product_id = $1;", [params])

  //meta
  SELECT json_build_object(row_to_json(reviews)) FROM ( SELECT id, rating, summary, recommend FROM review WHERE product_id = $1) reviews;