import { GooglePlacesService } from './services/googlePlaces';
import { logger } from './services/logger';
import { CompanyInput } from './types';

export class RetailInfoExtractor {
  private googlePlacesService: GooglePlacesService;

  constructor() {
    this.googlePlacesService = new GooglePlacesService();
  }

  async extractCompanyInfo(input: CompanyInput) {
    try {
      this.validateInput(input);
      logger.info('Extracting company information', { input });
      
      const companyInfo = await this.googlePlacesService.getCompanyInfo(input);
      logger.info('Successfully extracted company information', { companyInfo });
      
      return companyInfo;
    } catch (error) {
      logger.error('Error extracting company information:', error);
      throw error;
    }
  }

  private validateInput(input: CompanyInput): void {
    if (!input.name || !input.name.trim()) {
      throw new Error('Company name is required');
    }
    if (!input.address || !input.address.trim()) {
      throw new Error('Company address is required');
    }
  }
}

// Example usage
if (require.main === module) {
  const extractor = new RetailInfoExtractor();
  const input: CompanyInput = {
    name: 'Tana Thai',
    address: '10700 N May Ave, Oklahoma City, OK 73120'
  };

  extractor.extractCompanyInfo(input)
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(error => console.error('Error:', error.message));
}
