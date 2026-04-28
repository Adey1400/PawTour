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