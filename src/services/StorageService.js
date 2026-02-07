import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'despair_counter_data';

export const StorageService = {
  async saveDespairStatus(date, isDespair) {
    try {
      const existingData = await this.getAllDespairData();
      existingData[date] = isDespair;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('Error saving despair status:', error);
    }
  },

  async getDespairStatus(date) {
    try {
      const data = await this.getAllDespairData();
      return data[date] || false;
    } catch (error) {
      console.error('Error getting despair status:', error);
      return false;
    }
  },

  async getAllDespairData() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error getting all despair data:', error);
      return {};
    }
  },

  async clearAllData() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
};
