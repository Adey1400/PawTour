import axios from "axios";

// ── 1. Axios instance ────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 s — fail fast during the hackathon demo
});

// ── Request interceptor — logs every outgoing call in the console ────────────
apiClient.interceptors.request.use(
  (config) => {
    console.debug(
      `[PawTour API] ➡️  ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      config.data ?? ""
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — normalises errors into readable messages ───────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status  = error.response?.status;
    const detail  = error.response?.data?.message ?? error.message ?? "Unknown error";
    const url     = error.config?.url ?? "";

    console.error(`[PawTour API] ❌ ${status ?? "Network Error"} on ${url} — ${detail}`);

    // Attach a clean, human-readable message for callers to surface in the UI
    error.readableMessage =
      status === 404 ? `Not found: ${url}` :
      status === 400 ? `Bad request — ${detail}` :
      status === 500 ? "Server error — is your Spring Boot app running?" :
      !status        ? "Cannot reach the server — check that localhost:8080 is up." :
                       `Unexpected error (${status}): ${detail}`;

    return Promise.reject(error);
  }
);

// ── 2. Fallback shapes (keeps the UI renderable on error) ────────────────────

const PRICE_FALLBACK = {
  itemFound: false,
  isScam:    false,
  verdict:   "UNKNOWN_ITEM",
  message:   "Could not check price right now. Use your best judgement!",
};

// ── 3. apiService ────────────────────────────────────────────────────────────

export const apiService = {

  /**
   * Check whether a quoted price is fair, a scam, or a great deal.
   * POST /scam/check
   * @param {string} city
   * @param {string} category
   * @param {string} itemName
   * @param {number} userPrice
   * @returns {Promise<PriceCheckResponse>}
   */
  async checkPrice(city, category, itemName, userPrice) {
    try {
      const { data } = await apiClient.post("/scam/check", {
        city,
        category,
        itemName,
        userPrice,
      });
      return data;
    } catch (error) {
      console.error("[checkPrice] Failed:", error.readableMessage);
      return PRICE_FALLBACK; // safe fallback — never crash the scam checker mid-trip
    }
  },

  // ── 4. Discovery & Exploration ──────────────────────────────────────────

  /**
   * Get accommodations in a city by type.
   * GET /discovery/accommodations?city=Kolkata&type=HOTEL
   * @param {string} city
   * @param {string} type - HOTEL, OTA, OYO, ECO_SHACK, GUESTHOUSE
   * @returns {Promise<AccommodationDTO[]>}
   */
  async getAccommodations(city, type) {
    try {
      const { data } = await apiClient.get("/discovery/accommodations", {
        params: { city, type }
      });
      console.debug("[getAccommodations] Fetched accommodations:", data);
      return data;
    } catch (error) {
      console.error("[getAccommodations] Failed:", error.readableMessage);
      return [];
    }
  },

  /**
   * Find accommodations near user's current location.
   * GET /discovery/accommodations/nearby?latitude=22.5&longitude=88.3&radiusKm=2
   * @param {number} latitude
   * @param {number} longitude
   * @param {number} radiusKm
   * @returns {Promise<AccommodationDTO[]>}
   */
  async getNearbyAccommodations(latitude, longitude, radiusKm = 2.0) {
    try {
      const { data } = await apiClient.get("/discovery/accommodations/nearby", {
        params: { latitude, longitude, radiusKm }
      });
      console.debug("[getNearbyAccommodations] Found nearby places:", data);
      return data;
    } catch (error) {
      console.error("[getNearbyAccommodations] Failed:", error.readableMessage);
      return [];
    }
  },

  /**
   * Get vendors (restaurants, shops, artisans, guides) in a city.
   * GET /discovery/vendors?city=Kolkata&type=RESTAURANT
   * @param {string} city
   * @param {string} type - RESTAURANT, CAFE, SHOP, ARTISAN, LOCAL_GUIDE, TRANSPORT
   * @returns {Promise<VendorDTO[]>}
   */
  async getVendors(city, type) {
    try {
      const { data } = await apiClient.get("/discovery/vendors", {
        params: { city, type }
      });
      console.debug("[getVendors] Fetched vendors:", data);
      return data;
    } catch (error) {
      console.error("[getVendors] Failed:", error.readableMessage);
      return [];
    }
  },

  /**
   * Find restaurants by cuisine type.
   * GET /discovery/restaurants?city=Kolkata&cuisine=Bengali
   * @param {string} city
   * @param {string} cuisine
   * @returns {Promise<VendorDTO[]>}
   */
  async getRestaurantsByCuisine(city, cuisine) {
    try {
      const { data } = await apiClient.get("/discovery/restaurants", {
        params: { city, cuisine }
      });
      console.debug("[getRestaurantsByCuisine] Fetched restaurants:", data);
      return data;
    } catch (error) {
      console.error("[getRestaurantsByCuisine] Failed:", error.readableMessage);
      return [];
    }
  },

  /**
   * Get top-rated vendors across all cities.
   * GET /discovery/top-rated?minRating=4.0
   * @param {number} minRating
   * @returns {Promise<VendorDTO[]>}
   */
  async getTopRatedVendors(minRating = 4.0) {
    try {
      const { data } = await apiClient.get("/discovery/top-rated", {
        params: { minRating }
      });
      console.debug("[getTopRatedVendors] Fetched top vendors:", data);
      return data;
    } catch (error) {
      console.error("[getTopRatedVendors] Failed:", error.readableMessage);
      return [];
    }

    
  },

  // ── 5. Backpack / Saved Items ─────────────────────────────────────────

  /**
   * Save an item to the user's backpack
   */
  async addToBackpack(userId, itemType, itemId, notes = "") {
    try {
      const { data } = await apiClient.post("/backpack/add", {
        userId,
        itemType,
        itemId,
        notes,
      });
      return data;
    } catch (error) {
      console.error("[addToBackpack] Failed:", error.readableMessage);
      throw error; // Let the component handle the error toast
    }
  },

  /**
   * Get all items saved in a user's backpack
   */
  async getBackpack(userId) {
    try {
      const { data } = await apiClient.get(`/backpack/${userId}`);
      console.debug("[getBackpack] Fetched backpack:", data);
      return data;
    } catch (error) {
      console.error("[getBackpack] Failed:", error.readableMessage);
      return [];
    }
  },

  /**
   * Remove an item from the backpack
   */
  async removeFromBackpack(backpackItemId) {
    try {
      await apiClient.delete(`/backpack/remove/${backpackItemId}`);
    } catch (error) {
      console.error("[removeFromBackpack] Failed:", error.readableMessage);
      throw error;
    }
  },
  async reportPrice(userId, city, category, itemName, reportedPrice) {
    try {
      const { data } = await apiClient.post("/scam/report", {
        userId,
        city,
        category,
        itemName,
        reportedPrice
      });
      return data; // Returns the success string from the backend
    } catch (error) {
      console.error("[reportPrice] Failed:", error.readableMessage);
      throw error;
    }
  }
};

