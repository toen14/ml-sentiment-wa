export const port = process.env.PORT || 1945;
export const secret = process.env.SECRET || "rahasia";
export const environment = process.env.ENVIRONMENT || "development";
export const allowUnregiterPhoneNumbers = (process.env.ALLOW_UNREGISTER_PHONE_NUMBERS == "true") ? true : false;