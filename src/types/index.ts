export interface CompanyInfo {
  platform: string;
  companyName: string;
  address: string;
  phoneNumber: string;
  website: string;
}

export interface CompanyInput {
  name: string;
  address: string;
}

export interface GooglePlacesResponse {
  candidates: Array<{
    name: string;
    place_id: string;
  }>;
  status: string;
  error_message?: string;
}

export interface GooglePlaceDetails {
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
}
