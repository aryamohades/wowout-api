const serialize = (convert) => (data) => {
  if (!data) {
    return;
  }

  if (Array.isArray(data)) {
    return data.map((d) => (
      convert(d)
    ));
  }

  return convert(data);
};

const user = serialize((data) => ({
  id: data.id,
  email: data.email,
  username: data.username,
  createdAt: data.createdAt,
  wowoutsReceived: data.wowoutsReceived,
  wowoutsGiven: data.wowoutsGiven
}));

const wowout = serialize((data) => ({
  data: data
}));

module.exports = {
  user,
  wowout
};
