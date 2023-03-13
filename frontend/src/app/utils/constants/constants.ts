export const LOGIN_PATTERN = {
  digitsOnlyPattern: '[0-9]*',
};

export const Constants = {
  ADMIN: 'Admin',
};

export const itemsPerPage = {
  PageSize: [10, 25, 50, 100],
};

export class API_RESPONSE_COLUMNS {
  static USER_LIST: string[] = ['_id', 'firstName', 'lastName'];
}

export const USER_LIST_COLUMNS = [{ name: 'firstName', prop: 'name' }];

export const PATTERNS = {
  ADDRESS_PATTERN: '^(?! )[0-9A-Za-z,-_./@ ]*(?<! )$',
  ZIPCODE_PATTERN: '^[0-9]{5}$',
  CELLPHONE_PATTERN: '^[0-9]{10}$',
  OFFICE_PHONE_PATTERN: '^[0-9]{10}$',
  MFA:'^[0-9]{6}$',
};
