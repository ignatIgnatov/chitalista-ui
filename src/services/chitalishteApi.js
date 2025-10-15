import { processChitalishteData } from '../data/chitalishteData';

class ChitalishteApiService {
  constructor() {
    this.baseUrl = '/api';
  }

  async fetchAllChitalishta() {
    try {
      const response = await fetch(`${this.baseUrl}/chitalishta`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return processChitalishteData(data);
    } catch (error) {
      console.error('Error fetching chitalishta data:', error);
      throw error;
    }
  }

  async fetchChitalishteById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/chitalishta/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return processChitalishteData([data])[0];
    } catch (error) {
      console.error('Error fetching chitalishte details:', error);
      throw error;
    }
  }

  async searchChitalishta(filters) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      
      const response = await fetch(`${this.baseUrl}/chitalishta/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return processChitalishteData(data);
    } catch (error) {
      console.error('Error searching chitalishta:', error);
      throw error;
    }
  }
}

export const chitalishteApiService = new ChitalishteApiService();