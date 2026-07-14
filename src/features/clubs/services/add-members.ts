import { prisma } from "#/db";
import { ClubMemberRole } from "#/generated/prisma/enums";

/**
 * Adds members to a club.
 * @param clubId - The club's ID
 * @param memberIds - Array of user IDs to add
 * @param role - The role of the members
 * @param invitedById - The user ID of the user who invited the members
 * @returns Promise<ClubMember[]> - The created club members
 */
export const addMembers = async (clubId: string, memberIds: string[], role?: ClubMemberRole, invitedById?: string) => {
  const members = await prisma.clubMember.createMany({
    data: memberIds.map((memberId) => ({
      clubId,
      userId: memberId,
      role: role || ClubMemberRole.MEMBER,
      invitedById: invitedById,
    })),
  });
  return members;
};

/**
 * Filters out userIds that are already members of the given club.
 * @param clubId - The club's ID
 * @param memberIds - Array of user IDs to check/add
 * @returns Promise<string[]> - Only user IDs that are NOT already members of the club
 */
export async function filterExistingMembers(clubId: string, memberIds: string[]): Promise<string[]> {
  if (!memberIds.length) return [];

  const existingMembers = await prisma.clubMember.findMany({
    where: {
      clubId,
      userId: { in: memberIds },
    },
    select: { userId: true },
  });

  const existingIds = new Set(existingMembers.map(m => m.userId));
  return memberIds.filter(id => !existingIds.has(id));
}