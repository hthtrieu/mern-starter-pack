export interface AppConfig {
  app: {
    port: string | number;
    name?: string;
    apiKey: string;
  };
  db: {
    host: string;
    port: string | number;
    database: string;
    username: string;
    password: string;
  };
  jwt: {
    secret: string;
    expireTime: string | number;
    refreshExpireTime: string | number;
  };
  client: {
    url: string;
  };
}
