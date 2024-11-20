import prisma from '../../prisma/prisma-client';
import { TRPCError } from '@trpc/server';
import { CreateUserInput, FilterQueryInput, UpdateUserInput } from './user-schema';

export const createUserHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const user = await prisma.user.create({
      data: input,
    });

    return {
      status: 'success',
      data: {
        user,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};

export const updateUserHandler = async ({
  input,
}: {
  input: UpdateUserInput;
}) => {
  try {
    const user = await prisma.user.update({
      where: { id: input.id },
    data: {
      name: input.name,
      email: input.email,
    }
    });

    return {
      status: 'success',
      data: {
        user,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};

export const getUsersHandler = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const { limit, page, searchText } = filterQuery;
    const take = limit || 10;
    const skip = (page - 1) * limit;
    let where = {};

    if (searchText) {
      where = {
        OR: [
          {
            name: {
              contains: searchText,
              mode: 'insensitive', // case-insensitive
            },
          },
          {
            email: {
              contains: searchText,
              mode: 'insensitive', // case-insensitive
            },
          },
        ],
      };
    }

    const users = await prisma.user.findMany({
      skip,
      take,
      where,
      orderBy: {
        id: 'desc', // or 'desc' depending on your requirements
      },
    });

    const countUsers = await prisma.user.count({
      where
    });

    return {
      status: 'success',
      results: countUsers,
      data: {
        users,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};

export const deleteUserHandler = async (id: number) => {
  try {
    await prisma.user.delete({
        where: {
          id
        },
    });

    return {
      status: 'success'
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
