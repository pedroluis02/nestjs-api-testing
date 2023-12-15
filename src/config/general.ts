const env = process.env;

export default () => {
  const config = {
    port: parseInt(env.PORT, 10) || 3000,
    database: {
      type: env.DATABABSE_TYPE,
      url: env.DATABASE_URL,
    },
  };

  return config;
};
