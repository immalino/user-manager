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

export const createUser = async (
  department: string,
  email: string,
  name: string,
  phone: string
) => {
  try {
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
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
};

export const getUsers = async (search?: string) => {
  try {
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
  } catch (error) {}
};

export const getUser = async (id: string) => {
  try {
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
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
};

export const updateUser = async (
  id: string,
  department: string,
  email: string,
  name: string,
  phone: string
) => {
  try {
    const res = await updateUserApi.$put({
      param: {
        id,
      },
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
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
};

export const deleteUser = async (id: string) => {
  try {
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
  } catch (error) {
    return {
      success: false,
      error: String(error),
      isFormError: false,
    } as ErrorResponse;
  }
};
