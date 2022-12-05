import { BaseModel } from 'models/base-model.class';

export class RequestAccountForm {
  firstName = '';
  lastName = '';
  email = '';
  language = '';
  companyName = '';
  vatNo = '';
  street = '';
  houseNumber = '';
  box = '';
  city = '';
  postalCode = '';
  country = '';
  remarks = '';
}

export class AccountRequest extends BaseModel {
  firstName = '';
  lastName = '';
  email = '';
  language = '';
  companyName = '';
  vatNo = '';
  street = '';
  houseNumber = '';
  box?: string;
  city = '';
  postalCode = '';
  country = '';
  remarks?: string;
}
