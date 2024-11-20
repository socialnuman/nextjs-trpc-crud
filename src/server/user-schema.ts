import { TypeOf, number, object, string } from 'zod';

export const createUserSchema = object({
  name: string({ required_error: 'Name is required' }),
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
});

export const updateUserSchema = object({
  name: string({ required_error: 'Name is required' }),
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  id: number({ required_error: 'ID is required' }),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
  searchText: string().default(''),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type FilterQueryInput = TypeOf<typeof filterQuery>;
