import 'dotenv/config';

export interface AppConfig {
  app: {
    port: string | number;
    name?: string;
    apiKey: string;
  };
  // jwt: {
  //   secret: string;
  //   expireTime: string | number;
  //   refreshExpireTime: string | number;
  // };
  client: {
    url: string;
  };
}

export const AppConfig: AppConfig = {
  app: {
    port: process.env.PORT || 3000,
    // name: process.env.APP_NAME || 'DefaultApp',
    apiKey: process.env.API_KEY || 'default_api_key',
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET || 'default_secret',
  //   expireTime: process.env.TOKEN_EXPIRE_TIME || '3600',
  //   refreshExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME || '86400',
  // },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
  },
};
