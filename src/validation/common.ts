import joi from 'joi';

export const idSchema = joi.string().min(0);
export const nameSchema = joi.string().min(3);

export function getOrThrow<T>(value: any, schema: joi.SchemaLike): T {
    const {error, value: v} = joi.validate(value, schema);
    if (error) throw error;
    return v;
  }
