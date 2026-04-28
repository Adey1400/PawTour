-- ── 1. USERS ────────────────────────────────────────────────────────
-- Added 'ON CONFLICT' so it skips this line if the admin already exists
INSERT INTO users (username, points) 
VALUES ('admin', 0) 
ON CONFLICT (username) DO NOTHING;

-- ── 2. ACCOMMODATIONS (Hotels, OYO, Eco-Shacks) ─────────────────────
-- KOLKATA
INSERT INTO accommodation (name, type, city, latitude, longitude, price_per_night, rating, description, is_featured) 
VALUES ('The Oberoi Grand', 'HOTEL', 'Kolkata', 22.5626, 88.3522, 8500.00, 4.8, 'Heritage luxury hotel in the heart of the city. Highly pet-friendly.', true);
INSERT INTO accommodation (name, type, city, latitude, longitude, price_per_night, rating, description, is_featured) 
VALUES ('Backpackers Haven', 'OYO', 'Kolkata', 22.5555, 88.3476, 1200.00, 3.9, 'Budget stay near Park Street.', false);

-- DARJEELING
INSERT INTO accommodation (name, type, city, latitude, longitude, price_per_night, rating, description, is_featured) 
VALUES ('Windamere Hotel', 'HOTEL', 'Darjeeling', 27.0446, 88.2660, 6500.00, 4.7, 'Colonial-era charm with views of the Himalayas.', true);
INSERT INTO accommodation (name, type, city, latitude, longitude, price_per_night, rating, description, is_featured) 
VALUES ('Pine Tree Shack', 'ECO_SHACK', 'Darjeeling', 27.0500, 88.2600, 1500.00, 4.2, 'Wooden cabins nested in the pine forests.', false);

-- DIGHA
INSERT INTO accommodation (name, type, city, latitude, longitude, price_per_night, rating, description, is_featured) 
VALUES ('Sea View Resort', 'HOTEL', 'Digha', 21.6266, 87.5258, 2500.00, 4.1, 'Direct access to the beach. Great for morning walks.', true);

-- ── 3. VENDORS (Cafes, Restaurants, Guides) ─────────────────────────
-- KOLKATA
INSERT INTO vendor (name, type, city, latitude, longitude, google_rating, description, is_featured)
VALUES ('Peter Cat', 'RESTAURANT', 'Kolkata', 22.5535, 88.3533, 4.8, 'Famous for Chelo Kebabs. A Kolkata legend.', true);
INSERT INTO vendor (name, type, city, latitude, longitude, google_rating, description, is_featured)
VALUES ('Blue Tokai Coffee', 'CAFE', 'Kolkata', 22.5400, 88.3600, 4.5, 'Specialty coffee roasters with outdoor seating.', false);

-- DARJEELING
INSERT INTO vendor (name, type, city, latitude, longitude, google_rating, description, is_featured)
VALUES ('Glenarys Bakery', 'CAFE', 'Darjeeling', 27.0425, 88.2654, 4.9, 'Iconic bakery with Darjeeling tea and mountain views.', true);
INSERT INTO vendor (name, type, city, latitude, longitude, google_rating, description, is_featured)
VALUES ('Himalayan Mountaineers', 'LOCAL_GUIDE', 'Darjeeling', 27.0450, 88.2670, 4.6, 'Expert local guides for Tiger Hill and trekking.', false);

-- MALDA
INSERT INTO vendor (name, type, city, latitude, longitude, google_rating, description, is_featured)
VALUES ('Mango Orchard Tours', 'LOCAL_GUIDE', 'Malda', 25.0108, 88.1411, 4.4, 'Guided tours through the famous Malda mango plantations.', true);

-- ── 4. FAIR PRICES (Scam Detector Data) ─────────────────────────────
INSERT INTO fair_price (city, category, item_name, min_price, max_price) VALUES ('Kolkata', 'Food', 'Kati Roll', 40.00, 80.00);
INSERT INTO fair_price (city, category, item_name, min_price, max_price) VALUES ('Kolkata', 'Transport', 'Yellow Taxi (Base Fare)', 30.00, 40.00);
INSERT INTO fair_price (city, category, item_name, min_price, max_price) VALUES ('Darjeeling', 'Food', 'Momos (Plate)', 60.00, 120.00);
INSERT INTO fair_price (city, category, item_name, min_price, max_price) VALUES ('Darjeeling', 'Transport', 'Shared Jeep (Town)', 20.00, 50.00);
INSERT INTO fair_price (city, category, item_name, min_price, max_price) VALUES ('Digha', 'Food', 'Fried Fish Plate', 100.00, 250.00);


-- ── 5. ITINERARIES (Curated Routes) ─────────────────────────────────
INSERT INTO itinerary (title, description, city, duration) 
VALUES ('The Ultimate Kolkata Heritage Walk', 'Step back in time and explore the colonial heart of India, featuring history, art, and legendary food.', 'Kolkata', '1 Day');

-- ── 6. ITINERARY STOPS (Timeline) ───────────────────────────────────
-- Note: We assume the itinerary above gets ID = 1 since it is the first one inserted.
-- We are flagging the lunch and coffee stops as "is_sponsored = true" to show how you can monetize the app!

INSERT INTO itinerary_stop (itinerary_id, stop_number, location_name, description, time_suggestion, is_sponsored) 
VALUES (1, 1, 'Victoria Memorial', 'Start your day exploring this iconic white marble monument and its sprawling gardens.', '09:00 AM', false);

INSERT INTO itinerary_stop (itinerary_id, stop_number, location_name, description, time_suggestion, is_sponsored) 
VALUES (1, 2, 'Peter Cat', 'Grab a legendary Chelo Kebab for lunch. Highly recommended by Buddy!', '01:00 PM', true);

INSERT INTO itinerary_stop (itinerary_id, stop_number, location_name, description, time_suggestion, is_sponsored) 
VALUES (1, 3, 'Indian Museum', 'Walk off lunch by exploring the oldest and largest museum in India.', '03:00 PM', false);

INSERT INTO itinerary_stop (itinerary_id, stop_number, location_name, description, time_suggestion, is_sponsored) 
VALUES (1, 4, 'Blue Tokai Coffee', 'Relax with a specialty brew and reflect on the day. Show this app for a free cookie!', '05:30 PM', true);