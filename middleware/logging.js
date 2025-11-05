export const logging = async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(
    `${c.req.method} ${c.req.url} ${c.res.status} ${end - start}ms`
  );
};
