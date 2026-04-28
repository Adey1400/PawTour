# Database Schema Updates

## Run these SQL commands to set up the new tables:

```sql
-- Create Accommodation Table
CREATE TABLE accommodation (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  rating DOUBLE PRECISION,
  price_per_night DOUBLE PRECISION,
  external_url VARCHAR(500),
  external_rating DOUBLE PRECISION,
  amenities TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Vendor Table
CREATE TABLE vendor (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  zomato_id VARCHAR(100),
  google_rating DOUBLE PRECISION,
  speciality VARCHAR(255),
  commission_percentage DOUBLE PRECISION,
  cuisines TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Engagement Table
CREATE TABLE user_engagement (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  loyalty_points INTEGER DEFAULT 0,
  quests_completed INTEGER DEFAULT 0,
  badges_earned TEXT,
  referral_code VARCHAR(50),
  referral_bonus DOUBLE PRECISION DEFAULT 0,
  total_spent DOUBLE PRECISION DEFAULT 0,
  tier VARCHAR(50) DEFAULT 'BRONZE',
  affiliate_commission_earned DOUBLE PRECISION DEFAULT 0,
  next_tier_threshold INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

-- Create User Recommendation Table
CREATE TABLE user_recommendation (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  accommodation_id BIGINT,
  vendor_id BIGINT,
  recommendation_reason VARCHAR(255),
  score DOUBLE PRECISION,
  distance_km DOUBLE PRECISION,
  clicked BOOLEAN DEFAULT FALSE,
  booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (accommodation_id) REFERENCES accommodation(id),
  FOREIGN KEY (vendor_id) REFERENCES vendor(id)
);

-- Create indexes for better performance
CREATE INDEX idx_accommodation_city ON accommodation(city);
CREATE INDEX idx_accommodation_type ON accommodation(type);
CREATE INDEX idx_accommodation_location ON accommodation(latitude, longitude);

CREATE INDEX idx_vendor_city ON vendor(city);
CREATE INDEX idx_vendor_type ON vendor(type);
CREATE INDEX idx_vendor_location ON vendor(latitude, longitude);

CREATE INDEX idx_user_engagement_user ON user_engagement(user_id);
CREATE INDEX idx_user_recommendation_user ON user_recommendation(user_id);
```

## Insert Demo Data:

```sql
-- Insert Sample Accommodations
INSERT INTO accommodation (name, city, type, description, latitude, longitude, rating, price_per_night, external_url)
VALUES
  ('Taj Hotel Kolkata', 'Kolkata', 'HOTEL', 'Luxury 5-star beachfront hotel with world-class amenities', 22.5656, 88.3434, 4.8, 8000, 'https://www.tajhotels.com'),
  ('OYO Rooms Sudder Street', 'Kolkata', 'OYO', 'Budget-friendly rooms in the heart of Kolkata', 22.5450, 88.3640, 3.9, 1299, 'https://www.oyorooms.com'),
  ('Eco Shack Nature Retreat', 'Kolkata', 'ECO_SHACK', 'Sustainable eco-friendly stay near Sundarbans', 22.3045, 88.8145, 4.4, 2500, 'https://www.ecoshack.co.in'),
  ('The Park Kolkata', 'Kolkata', 'HOTEL', 'Boutique 4-star hotel with modern design', 22.5456, 88.3668, 4.6, 5500, 'https://www.theparkhotels.com');

-- Insert Sample Vendors
INSERT INTO vendor (name, city, type, speciality, google_rating, cuisines)
VALUES
  ('Flurys Restaurant', 'Kolkata', 'CAFE', 'Historic café since 1927, famous for eggs', 4.5, 'Bengali, Continental, Desserts'),
  ('Oh! Calcutta', 'Kolkata', 'RESTAURANT', 'Authentic rooftop Bengali cuisine', 4.3, 'Bengali'),
  ('Zara Cafe', 'Kolkata', 'CAFE', 'Modern cafe with fusion menu', 4.2, 'Continental, Asian'),
  ('The Artisan Shop', 'Kolkata', 'ARTISAN', 'Handmade textiles and crafts', 4.6, NULL),
  ('Local Guide Services', 'Kolkata', 'LOCAL_GUIDE', 'Themed city tours and experiences', 4.7, NULL);

-- Create a sample user_engagement record
INSERT INTO user_engagement (user_id, loyalty_points, quests_completed, tier)
VALUES (1, 500, 3, 'SILVER');
```

## Verify the data:

```sql
-- Check accommodations
SELECT * FROM accommodation;

-- Check vendors
SELECT * FROM vendor;

-- Check user_engagement
SELECT * FROM user_engagement;
```
