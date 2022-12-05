import { BaseModel } from 'models/base-model.class';

export class DBFile extends BaseModel {
  name = '';
  originalName = '';
  mimeType = '';
  path = '';
  size?: number;
  createdAt?: Date;
}
