import AsyncStorage from '@react-native-async-storage/async-storage';

// In-memory fallback for environments where native storage is unavailable (e.g. web, mismatched dev builds)
const memoryStore: Record<string, string> = {};

const isNativeModuleAvailable = () => {
  try {
    // Attempt a trivial operation to check for native module presence
    return !!AsyncStorage;
  } catch {
    return false;
  }
};

const safeStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.warn(`SafeStorage: getItem failed for ${key}, falling back to memory`, e);
      return memoryStore[key] || null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.warn(`SafeStorage: setItem failed for ${key}, falling back to memory`, e);
      memoryStore[key] = value;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn(`SafeStorage: removeItem failed for ${key}, falling back to memory`, e);
      delete memoryStore[key];
    }
  },
};

export default safeStorage;
