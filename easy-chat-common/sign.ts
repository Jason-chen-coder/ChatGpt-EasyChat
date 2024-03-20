export enum SignType {
    PassWord = 'password',
    MessageCode = 'messageCode',
  }

  export enum SignUpType {
    Email = 'email',
    PhoneNumber = 'phoneNumber',
  }

  export interface SingUpData {
    phoneNumber?: string;
    email?: string;
    userName?:string;
    password: string;
    confirmPassword: string;
    signUpType: SignUpType;
  }