# 🔍 PawTours Backend Debugging Guide

## Issue: Clue Not Loading

### ✅ Step 1: Verify Backend is Running

```bash
# Check if the backend is running on port 8080
curl http://localhost:8080/api/quests

# Expected response: Array of quests or array (even if empty)
# If you get "Connection refused" → Backend isn't running!
```

**To start backend:**
```bash
cd Backend
mvn spring-boot:run
```

---

## ✅ Step 2: Check Database Has Test Data

### Insert Test Quest & Locations

Open your PostgreSQL client and run:

```sql
-- Insert a test quest
INSERT INTO quest (id, city_name, title, description)
VALUES (1, 'Kolkata', 'City Explorer Challenge', 'Explore historic landmarks of Kolkata');

-- Insert test locations/stops for Quest 1
INSERT INTO location (id, quest_id, sequence_order, name, riddle_text, latitude, longitude)
VALUES
  (1, 1, 1, 'Victoria Memorial', 'I stand white and tall by the river, a symbol of love and architecture. Find me.', 22.5448, 88.3426),
  (2, 1, 2, 'Kolkata Museum', 'I house treasures of the past. History speaks through my walls.', 22.5456, 88.3668),
  (3, 1, 3, 'St. Paul''s Cathedral', 'I am a place of peace and art. Gothic beauty defines me.', 22.5430, 88.3640);

-- Verify data was inserted
SELECT * FROM quest;
SELECT * FROM location WHERE quest_id = 1 ORDER BY sequence_order;
```

---

## ✅ Step 3: Test the API Endpoint Directly

### Test Get Clue Endpoint

```bash
# Request first clue for Quest 1, Step 1
curl "http://localhost:8080/api/quests/1/clue?step=1"

# Expected response format:
{
  "locationName": "Victoria Memorial",
  "riddleText": "I stand white and tall by the river...",
  "sequenceOrder": 1,
  "totalLocations": 3
}
```

### Common Issues:

| Issue | Solution |
|-------|----------|
| `404 Not Found` | Quest 1 or Location Step 1 doesn't exist in DB |
| `null` values | Check field names in response match `locationName`, `riddleText` |
| Connection refused | Backend not running on port 8080 |
| Empty array | No data in database |

---

## ✅ Step 4: Check Browser Console

Your frontend now has **detailed logging**. Open DevTools (F12) and look for:

```javascript
🔍 Fetching clue for Quest 1, Step 1...
✅ Clue response received: {...}
// OR
❌ Failed to fetch clue: Error...
```

---

## 🐛 Quick Troubleshooting Checklist

- [ ] Backend running? (`mvn spring-boot:run`)
- [ ] Database has Quest 1? (`SELECT * FROM quest;`)
- [ ] Database has Location step 1? (`SELECT * FROM location WHERE quest_id=1;`)
- [ ] API endpoint working? (Test with `curl`)
- [ ] Application properties configured? (Check database URL)

---

## 🚨 Still Not Working?

### Check Backend Logs for Errors:
```bash
# Look for error messages in terminal where mvn is running
# Common errors:
# - Database connection failed
# - Table doesn't exist
# - Incorrect SQL queries
```

### Verify Database Connection:
```bash
# In application.properties, check:
spring.datasource.url=jdbc:postgresql://localhost:5432/pawtour
spring.datasource.username=postgres
spring.datasource.password=your_password
```

---

## ✨ Once Backend is Fixed

The frontend will automatically:
1. Stop showing demo data
2. Display real clues from the database
3. Allow location verification to work

**For now:** The app shows a demo clue so you can see the UI working while you set up the backend!
