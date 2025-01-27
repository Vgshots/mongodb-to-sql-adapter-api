const apiKey = "s9KnNOC1bOl0vVlDXmbye1peMjfbdtH1TxlhIcQu5wKCftMhps9oavsltFZyNqHm";

const authenticate = (req, res, next) => {
  const requestApiKey = req.headers["api-key"];
  if (requestApiKey !== apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = { authenticate };
