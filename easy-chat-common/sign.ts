export enum SignInType {
  PassWord = 'password',
  MessageCode = 'messageCode',
}

export enum SignType {
  Email = 'email',
  PhoneNumber = 'phoneNumber',
}

export interface SingUpData {
  phoneNumber?: string;
  email?: string;
  userName?: string;
  password: string;
  signUpType: SignType;
}

export interface PhoneMessageCodeData {
  phoneNumber: string;
  type: SignType;
}