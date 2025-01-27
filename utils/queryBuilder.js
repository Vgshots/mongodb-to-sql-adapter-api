const buildWhereClause = (filter) => {
  return Object.keys(filter)
    .map((key, i) => `${key} = ?${i + 1}`)
    .join(" AND ");
};

const buildSetClause = (update) => {
  return Object.keys(update)
    .map((key, i) => `${key} = ?${i + 1}`)
    .join(", ");
};

const extractValues = (obj) => Object.values(obj);

export { buildSetClause, buildWhereClause, extractValues };
