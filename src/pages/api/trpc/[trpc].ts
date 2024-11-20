/**
 * This is the API-handler of your pages that contains all your API routes.
 * On a bigger pages, you will probably want to split this file up into multiple files.
 */
import { tracked } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { mergedRouters, publicProcedure, router } from '@/server/trpc';
import { z } from 'zod';
import userRouter from '@/server/user-route';


const appRouter = router({
    greeting: publicProcedure
        // This is the input schema of your procedure
        // 💡 Tip: Try changing this and see type errors on the client straight away
        .input(
            z.object({
                name: z.string().nullish(),
            }),
        )
        .query(({ input }) => {
            // This is what you're returning to your client
            return {
                text: `hello ${input?.name ?? 'world'}`,
                // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
            };
        }),
    // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
    // getUser: publicProcedure.query(() => {
    //   return { id: '1', name: 'bob' };
    // }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
const mergedRouter = mergedRouters(userRouter, appRouter)

export type AppRouter = typeof mergedRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: mergedRouter,
    createContext: () => ({}),
});
