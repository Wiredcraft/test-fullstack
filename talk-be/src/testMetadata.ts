// function Type(): PropertyDecorator {
//   return (target, key: string) => {
//     const type = Reflect.getMetadata('design:type', target, key);
//     console.log(`${key} type: ${type.name}`);
//   };
// }
//
// function ParamTypes(): PropertyDecorator {
//   return (target, key: string) => {
//     const paramtypes = Reflect.getMetadata('design:paramtypes', target, key);
//     // tslint:disable-next-line:forin
//     for (let item in paramtypes) {
//       console.log(`${key} paramtype: ${item}`);
//     }
//   };
// }
//
//
// function ReturnType(): PropertyDecorator {
//   return (target, key: string) => {
//     const returnType = Reflect.getMetadata('design:returntype', target, key);
//     console.log(`${key} returnType: ${returnType.name}`);
//   };
// }
//
// class SomeClass {
//   @Type()
//   public prop!: string;
//
//   @ReturnType()
//   @ParamTypes()
//   pilot(arg1: number): Boolean {
//     console.log('arg1', arg1);
//     return true;
//   }
// }

/**************************** DI **********************/
type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => _target => {};

class Service1 {
  a = 1;
}

class Service2 {
  b = 2;
}

@Injectable()
class TestClass {
  constructor(
    //
    private service1: Service1,
    //
    private service2: Service2,
  ) {}

  testMethod() {
    console.log(this.service1.a);
    console.log(this.service2.b);
  }
}

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target);
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

Factory(TestClass).testMethod();
/**************************** DI **********************/
