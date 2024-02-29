export interface IEnv {
  APP_NAME?: string;
  APP_MODE?: string;
  DEBUG?: boolean;

  DB_HOST?: string;
  DB_PORT?: number;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;

  JWT_SECRET_KEY?: string;
}

export type TEnv = {
  id: string;
};
