function checkAppEnv(env) {
  return (
    process.env.REACT_APP_ENV &&
    process.env.REACT_APP_ENV.toLowerCase().includes(env)
  );
}

module.exports = {
  checkAppEnv,
};
