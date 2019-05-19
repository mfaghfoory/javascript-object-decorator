const decorate = require('../js-decorator')

describe("decorator-basics", function() {
  it("should decorate method", function() {
    let obj = {
      name: "foo",
      print() {
        return this.name;
      }
    };
    let afterCall = null;
    obj = decorate(obj, (res) => { }, (res) => { afterCall = res; });
    obj.print();
    expect(obj.name).toEqual(afterCall.result);
  });

  it("should return args", function() {
    let obj = {
      name: "foo",
      print(preText) {
        return preText + ' ' + this.name;
      }
    };
    let beforeCall = null;
    let afterCall = null;
    obj = decorate(obj, (res) => { beforeCall = res; }, (res) => { afterCall = res; });
    obj.print('hi');
    expect('hi').toEqual(beforeCall.args[0]);
  });

  it("should grab error", function() {
    let obj = {
      name: "foo",
      print(preText) {
        throw 'error raised!'
      }
    };
    let exceptionResult = null;
    obj = decorate(obj, (res) => { }, (res) => { }, (err) => {exceptionResult = err.error;});
    obj.print('hi');
    expect(exceptionResult.toString()).toEqual('error raised!');
  });

  it("should prevent send hi to print method", function() {
    let obj = {
      name: "foo",
      print(preText) {
        return this.name;
      }
    };
    let afterCall = null;
    obj = decorate(obj, (res) => { if(res.args[0].indexOf('hi') > -1) throw'you cant use `hi` here!' }, (res) => { afterCall = res; });
    obj.print('hi');
    expect(afterCall.result).toEqual(null);
  });
});
