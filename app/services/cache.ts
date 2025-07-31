import { getInvitationByUniqueId } from "./share";

const CACHE_PREFIX = "invitation_cache_";
const CACHE_EXPIRY = 1000 * 60 * 30; // 30 minutes

interface CacheItem {
  data: any;
  timestamp: number;
}

export const getCachedInvitation = async (
  uniqueId: string
): Promise<any | null> => {
  try {
    const cacheKey = `${CACHE_PREFIX}${uniqueId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp }: CacheItem = JSON.parse(cachedData);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < CACHE_EXPIRY) {
        return data;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    // If no cache or expired, fetch fresh data
    const freshData = await getInvitationByUniqueId(uniqueId);
    if (freshData) {
      const cacheItem: CacheItem = {
        data: freshData,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    }
    return freshData;
  } catch (error) {
    console.error("[Cache] Error accessing cache:", error);
    return null;
  }
};

export const clearInvitationCache = (uniqueId: string): void => {
  try {
    const cacheKey = `${CACHE_PREFIX}${uniqueId}`;
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.error("[Cache] Error clearing cache:", error);
  }
};

export const clearAllInvitationCaches = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("[Cache] Error clearing all caches:", error);
  }
};
