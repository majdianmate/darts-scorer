import { prisma } from "#/db";
import type { CreateClubInput } from "../types/club-types";
import { validateCreateClubInput } from "../server/validation";
import { ClubMemberRole } from "#/generated/prisma/enums";
import { addMembers } from "./add-members";

export const createClubAndAddAdmin = async (club: CreateClubInput) => {
    const validatedClub = await validateCreateClubInput(club);
    const newClub = await prisma.club.create({
        data: {
            name: validatedClub.name,
            description: validatedClub.description,
            createdById: validatedClub.createdById,
        },
    });
    await addMembers(newClub.id, [validatedClub.createdById], ClubMemberRole.ADMIN);
    return newClub;
};

export const createClubAndAddMembers = async (club: CreateClubInput, memberIds: string[]) => {
    const validatedClub = await validateCreateClubInput(club);
    const newClub = await prisma.club.create({
        data: {
            name: validatedClub.name,
            description: validatedClub.description,
            createdById: validatedClub.createdById,
        },
    });
    await addMembers(newClub.id, [validatedClub.createdById, ...memberIds], ClubMemberRole.MEMBER, validatedClub.createdById);
    return newClub;
};