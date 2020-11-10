import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isValidObjectId } from "mongoose";
import { ObjectID } from "mongodb";

export function IsValidMongoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidMongoId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value instanceof ObjectID || typeof value === 'string' && isValidObjectId(value);
        },
      },
    });
  };
}
