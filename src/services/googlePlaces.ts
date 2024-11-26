import axios from 'axios';
import { config } from '../config';
import { logger } from './logger';
import { CompanyInput, CompanyInfo, GooglePlacesResponse } from '../types';

export class GooglePlacesService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    this.apiKey = config.GOOGLE_PLACES_API_KEY;
  }

  async getCompanyInfo(input: CompanyInput): Promise<CompanyInfo> {
    try {
      const searchResponse = await this.searchPlace(input);
      
      if (!searchResponse.candidates.length) {
        throw new Error('No results found for the given company and address');
      }

      const placeId = searchResponse.candidates[0].place_id;
      const details = await this.getPlaceDetails(placeId);
      
      return {
        platform: 'Google',
        companyName: details.name,
        address: details.formatted_address,
        phoneNumber: details.formatted_phone_number || '',
        website: details.website || '',
      };
    } catch (error) {
      logger.error('Error fetching company info:', error);
      throw error;
    }
  }

  private async searchPlace(input: CompanyInput): Promise<GooglePlacesResponse> {
    try {
      const query = `${input.name} ${input.address}`;
      const response = await axios.get<GooglePlacesResponse>(
        `${this.baseUrl}/findplacefromtext/json`,
        {
          params: {
            input: query,
            inputtype: 'textquery',
            fields: 'name,place_id',
            key: this.apiKey,
          },
          timeout: config.API_TIMEOUT,
        }
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.error_message || response.data.status}`);
      }

      return response.data;
    } catch (error) {
      logger.error('Error in Google Places API call:', error);
      throw error;
    }
  }

  private async getPlaceDetails(placeId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/details/json`,
        {
          params: {
            place_id: placeId,
            fields: 'name,formatted_address,formatted_phone_number,website',
            key: this.apiKey,
          },
          timeout: config.API_TIMEOUT,
        }
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.error_message || response.data.status}`);
      }

      return response.data.result;
    } catch (error) {
      logger.error('Error in Google Places Details API call:', error);
      throw error;
    }
  }
}
