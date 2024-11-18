import 'dotenv/config';

interface GoogleConfigType {
  clientId: string;
  clientSecret: string;
}

export const GoogleConfig: GoogleConfigType = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
};
