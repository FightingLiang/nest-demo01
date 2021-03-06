export function logger(req, res, next) {
  console.log(`logger 函数式中间件`);
  next();
};