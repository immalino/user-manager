import type { CreateUser, GetUsers, GetUser, UpdateUser, DeleteUser, ErrorResponse, SuccessResponse } from "@shared/types"
import { hc } from "hono/client";

const createUserApi = hc<CreateUser>("http://localhost:8787/").index;
const getUsersApi = hc<GetUsers>("http://localhost:8787/").index;
const getUserApi = hc<GetUser>("http://localhost:8787/")[":id"];
const updateUserApi = hc<UpdateUser>("http://localhost:8787/")[":id"];
const deleteUserApi = hc<DeleteUser>("http://localhost:8787/")[":id"];

export const createUser = async (department: string, email: string, name: string, phone: string) => {
  try {
    const res = await createUserApi.$post({
      json: {
        department,
        email,
        name,
        phone,
      },
    });

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;
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
        search
      }
    })

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;
    return data;
  } catch (error) {
    
  }
}

export const getUser = async (id: string) => {
 try {
  const res = await getUserApi.$get({
    param: {
      id
    }
  })

  if (res.ok) {
    const data = (await res.json()) as SuccessResponse;
    return data;
  }

  const data = (await res.json()) as unknown as ErrorResponse;
  return data;
 } catch (error) {
  return {
    success: false,
    error: String(error),
    isFormError: false,
  } as ErrorResponse;
 } 
}

export const updateUser = async (id: string, department: string, email: string, name: string, phone: string) => {
 try {
  const res = await updateUserApi.$put({
    param: {
      id
    },
    json: {
      department,
      email,
      name,
      phone,
    }
  })

  if (res.ok) {
    const data = (await res.json()) as SuccessResponse;
    return data;
  }

  const data = (await res.json()) as unknown as ErrorResponse;
  return data;
 } catch (error) {
  return {
    success: false,
    error: String(error),
    isFormError: false,
  } as ErrorResponse;
 } 
}

export const deleteUser = async (id: string) => {
 try {
  const res = await deleteUserApi.$delete({
    param: {
      id
    }
  })

  if (res.ok) {
    const data = (await res.json()) as SuccessResponse;
    return data;
  }

  const data = (await res.json()) as unknown as ErrorResponse;
  return data;
 } catch (error) {
  return {
    success: false,
    error: String(error),
    isFormError: false,
  } as ErrorResponse;
 } 
}
