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
    obj = decorate(obj, null, (res) => { afterCall = res; });
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
    obj = decorate(obj, null, null, null, (err) => {exceptionResult = err.error;});
    obj.print('hi');
    expect(exceptionResult.toString()).toEqual('error raised!');
  });

  it("should prevent send hi to print method", function() {
    let obj = {
      name: "foo",
      print(preText) {
        return preText + ' ' + this.name;
      }
    };
    obj = decorate(obj, (res) => { if(res.args[0].indexOf('hi') > -1) throw'you cant use `hi` here!' });
    let printedName = obj.print('hi');
    expect(printedName).toEqual(undefined);
  });

  it("should change the result of the method", function() {
    let obj = {
      name: "foo",
      print(preText) {
        return preText + ' ' + this.name;
      }
    };
    obj = decorate(obj, null, null, (mainFunc, args) => {
      return `--${mainFunc(args)}--`
    });
    let printedName = obj.print('hi');
    expect(printedName).toEqual('--hi foo--');
  });

});
