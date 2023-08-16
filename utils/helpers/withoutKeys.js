const withoutKeys = (obj, keys) => {
  const res = { ...obj };
  keys.forEach((key) => {
    if (key in res) {
      delete res[key];
    }
  });
  return res;
};

module.exports = {
  withoutKeys,
};
