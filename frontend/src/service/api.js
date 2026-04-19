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

const QUEST_FALLBACK = [];

const CLUE_FALLBACK = {
  found:   false,
  message: "Could not load clue. Please try again.",
};

const VERIFY_FALLBACK = {
  success: false,
  message: "Verification failed. Please try again.",
};

const PRICE_FALLBACK = {
  itemFound: false,
  isScam:    false,
  verdict:   "UNKNOWN_ITEM",
  message:   "Could not check price right now. Use your best judgement!",
};

// ── 3. apiService ────────────────────────────────────────────────────────────

export const apiService = {

  /**
   * Fetch every available quest for the explore / home screen.
   * GET /quests
   * @returns {Promise<Quest[]>}
   */
  async getAllQuests() {
    try {
      const { data } = await apiClient.get("/quests");
      return data;
    } catch (error) {
      console.error("[getAllQuests] Failed:", error.readableMessage);
      return QUEST_FALLBACK; // safe empty list — UI can show "no quests found"
    }
  },

  /**
   * Fetch the riddle/clue for a specific step in a quest.
   * GET /quests/:questId/clue?step=:step
   * @param {number} questId
   * @param {number} step      — 1-based sequence order
   * @returns {Promise<Clue>}
   */
  async getCurrentClue(questId, step) {
    try {
      const { data } = await apiClient.get(`/quests/${questId}/clue`, {
        params: { step },
      });
      return data;
    } catch (error) {
      console.error("[getCurrentClue] Failed:", error.readableMessage);
      return CLUE_FALLBACK;
    }
  },

  /**
   * Verify the traveller has physically reached the correct location.
   * POST /quests/verify
   * userId is hardcoded to 1 for the MVP.
   * @param {number} questId
   * @param {number} sequenceOrder
   * @returns {Promise<VerifyResponse>}
   */
  async verifyLocation(questId, sequenceOrder) {
    try {
      const { data } = await apiClient.post("/quests/verify", {
        userId: 1, // MVP hardcode — swap for auth context later
        questId,
        sequenceOrder,
      });
      return data;
    } catch (error) {
      // Verification errors are critical — rethrow with a readable message
      // so the calling component can show a specific failure state
      const readable = error.readableMessage ?? "Location verification failed.";
      throw new Error(readable);
    }
  },

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
};