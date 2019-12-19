function testDecorator(target: any, key: string) {
  console.log('------------testDecorator-------------');
  console.log('target', target);
  console.log('key', key);
  console.log('------------testDecorator-------------');
}

function paramDecorator(target: any, key: string, index: number) {
  console.log('------------paramDecorator-------------');
  console.log('target', target);
  console.log('key', key);
  console.log('index', index);
  console.log('------------paramDecorator-------------');
}

function classDecorator(constructor: any) {
  console.log('------------classDecorator-------------');
  console.log('constructor', constructor);
  console.log('------------classDecorator-------------');
}

function log() {
  console.log('------------log-------------');
  return (target: any, key: string, desc: PropertyDescriptor): void => {
    console.log('target', target);
    console.log('key', key);
    console.log('desc', desc);
    const method: Function = desc.value;
    desc.value = function(...args: any[]) {
      console.log('logger');
      method.apply(this, args);
    };
  };
  console.log('------------log-------------');
}

@classDecorator
class Boat {
  @testDecorator
  color = 'red';

  @testDecorator
  get FormatedColor(): string {
    return `formatedColor ${this.color}`;
  }

  @log()
  pilot(@paramDecorator speed: string, @paramDecorator weak: string): void {
    if (speed === 'fast') {
      console.log('fast');
    } else {
      console.log('slow');
    }
    console.log('this.color', this.color);
    console.log('weak', weak);
  }
}

console.log('Boat', new Boat().pilot('fast', 'weak'));
