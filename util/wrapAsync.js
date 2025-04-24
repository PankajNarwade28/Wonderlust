// function wrapAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch(next);
//   };
// }

// module.exports = wrapAsync;

// 2) Shorter way to write a wrapAsync function

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
