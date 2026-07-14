import type { ClubMember as PrismaClubMember } from "#/generated/prisma/client";
import { type Club as PrismaClub } from "#/generated/prisma/client";
import type { UserType } from "#/features/auth/types/auth-types";

export type ClubType = PrismaClub & {
  members: ClubMemberType[];
  createdBy: UserType;
};

export type ClubMemberType = PrismaClubMember & {
  user: UserType;
  invitedBy: UserType;
};

export type CreateClubInput = {
  name: string;
  description: string;
  createdById: string;
};