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
  name: data.name,
  image: data.image,
  createdAt: data.createdAt,
  wowoutsReceived: data.wowoutsReceived,
  wowoutsGiven: data.wowoutsGiven
}));

const wowout = serialize((data) => data);

const shameOnYou = serialize(data => data);

module.exports = {
  user,
  wowout,
  shameOnYou
};
