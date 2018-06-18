module.exports = (res, config) => {
  config.code = config.code || 500;

  return res.status(config.code).send({
    error: {
      ...config
    }
  });
};
