import type {
  CreateUser,
  GetUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
  ErrorResponse,
} from "@shared/types";
import { hc } from "hono/client";

const createUserApi = hc<CreateUser>("/api/v1/users").index;
const getUsersApi = hc<GetUsers>("/api/v1/users").index;
const getUserApi = hc<GetUser>("/api/v1/users")[":id"];
const updateUserApi = hc<UpdateUser>("/api/v1/users")[":id"];
const deleteUserApi = hc<DeleteUser>("/api/v1/users")[":id"];

export const createUser = async ({
  department,
  email,
  name,
  phone,
}: {
  department: string;
  email: string;
  name: string;
  phone: string;
}) => {
  const res = await createUserApi.$post({
    json: {
      department,
      email,
      name,
      phone,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};

export const getUsers = async (search?: string) => {
  const res = await getUsersApi.$get({
    query: {
      search,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};

export const getUser = async (id: string) => {
  const res = await getUserApi.$get({
    param: {
      id,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};

export const updateUser = async ({
  id,
  department,
  email,
  name,
  phone,
  isActive,
}: {
  id: string;
  department?: string;
  email?: string;
  name?: string;
  phone?: string;
  isActive?: boolean;
}) => {
  const res = await updateUserApi.$put({
    param: {
      id,
    },
    json: {
      department,
      email,
      name,
      phone,
      isActive,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};

export const deleteUser = async (id: string) => {
  const res = await deleteUserApi.$delete({
    param: {
      id,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;
    throw new Error(data.error);
  }
  const data = await res.json();
  return data;
};
