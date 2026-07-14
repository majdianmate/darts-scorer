import type { CreateClubInput } from "../types/club-types";
import { z } from "zod";

export const validateCreateClub = async (club: CreateClubInput) => {
  const schema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    createdById: z.string().min(1).max(255),
  });
  return schema.safeParse(club);
};

export const validateCreateClubInput = async (club: CreateClubInput) => {
  const { error, data } = await validateCreateClub(club);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};