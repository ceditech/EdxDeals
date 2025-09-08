export const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IN', name: 'India' },
  { code: 'MX', name: 'Mexico' },
  // Add more countries as needed
];

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming"
];

export const CANADIAN_PROVINCES = [
  "Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador",
  "Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan",
  "Northwest Territories","Nunavut","Yukon"
];

// Legacy exports for backward compatibility
export const usStates = US_STATES;
export const canadianProvinces = CANADIAN_PROVINCES;

export const getLocationFields = (countryCode: string) => {
  switch (countryCode) {
    case 'US':
      return {
        cityLabel: 'City',
        stateLabel: 'State',
        stateOptions: US_STATES,
        postalLabel: 'Zip Code',
        postalPlaceholder: '12345',
      };
    case 'CA':
      return {
        cityLabel: 'City',
        stateLabel: 'Province',
        stateOptions: CANADIAN_PROVINCES,
        postalLabel: 'Postal Code',
        postalPlaceholder: 'A1A 1A1',
      };
    default:
      return {
        cityLabel: 'City',
        stateLabel: 'Region/Province',
        stateOptions: null,
        postalLabel: 'Postal Code',
        postalPlaceholder: 'Enter postal code',
      };
  }
};