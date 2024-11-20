import { createUserSchema, filterQuery, updateUserSchema } from './user-schema';
import { createUserHandler, deleteUserHandler, getUsersHandler, updateUserHandler } from './user-controller';
import { publicProcedure, router } from '@/server/trpc';
import { number, object } from 'zod';

const userRouter = router({
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => createUserHandler({ input })),
   updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input }) => updateUserHandler({ input })),
  getUsers: publicProcedure
    .input(filterQuery)
    .query(({ input }) => getUsersHandler({ filterQuery: input })),
  deleteUser: publicProcedure
      .input(object({id:number()}))
      .mutation(({ input }) => deleteUserHandler(input.id))
});

export default userRouter;
