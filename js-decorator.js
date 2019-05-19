/**
 * It takes an object and decorates over all its functions
 * @param obj An object that you want to decorate all its methods
 * @param beforeCall Function that calling 'before' each obj's functions
 * @param afterCall Function that calling 'after' each obj's functions
 * @param onCall Function that takes main func and its args as arguments
 * @param onException Function that calling when each obj's functions raise any error
 */
function decorate(obj, beforeCall, afterCall, onCall, onException) {
  if (beforeCall && typeof beforeCall != "function")
    throw "beforeCall is not a function";
  if (afterCall && typeof afterCall != "function")
    throw "afterCall is not a function";
  if (onCall && typeof onCall != "function")
    throw "onCall is not a function";
  if (onException && typeof onException != "function")
    throw "onException is not a function";
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      if (typeof obj[x] == "function") {
        const innerMethod = obj[x].bind(obj);
        obj[x] = function(...args) {
          let result = null;
          try {
            beforeCall && beforeCall({ method: x, args, object: this });
            result = onCall ? onCall(innerMethod, args) : innerMethod(args);
            return result;
          } catch (error) {
            onException && onException({ method: x, error, object: this });
          } finally {
            afterCall && afterCall({ method: x, args, result, object: this });
          }
        };
      }
    }
  }
  return obj;
}
module.exports = decorate;

let product = {
  name: "tv",
  price: 600,
  printInfo() {
    console.log(`${this.name}-${this.price}$`);
  },
  logToDb() {
    //send this object to db
  }
};
