const env = process.env;

export default () => {
  const config = {
    port: Number.parseInt(env.PORT, 10) || 3000,
    database: {
      type: env.DATABABSE_TYPE,
      url: env.DATABASE_URL,
    },
    jwt: {
      secret: env.JWT_SECRET_KEY,
      expiresIn: Number.parseInt(env.JWT_EXPIRES_IN, 10) || 300,
    },
    jwtRefresh: {
      secret: env.JWT_REFRESH_SECRET_KEY,
      expiresIn: Number.parseInt(env.JWT_REFRESH_EXPIRES_IN, 10) || 300,
    },
  };

  return config;
};
