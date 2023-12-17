const env = process.env;

export default () => {
  const config = {
    port: parseInt(env.PORT, 10) || 3000,
    database: {
      type: env.DATABABSE_TYPE,
      url: env.DATABASE_URL,
    },
    jwt: {
      secret: env.JWT_SECRET_KEY,
      expiresIn: parseInt(env.JWT_EXPIRES_IN, 10) || 300,
    },
  };

  return config;
};
