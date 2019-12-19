import { Logger } from '@nestjs/common';

export function LogMethodArgs() {
  return (target: any, _key: string, desc: PropertyDescriptor): void => {
    const logger = new Logger(target.constructor.name);
    const method: Function = desc.value;
    desc.value = async function(...args: any[]) {
      // todo remove password
      logger.debug(`Method name: ${method.name}, call with args: ${JSON.stringify(args)}`);
      return await method.apply(this, args);
    };
  };
}
