import { EntityType, UserType } from "types/index.mjs";

export const filterEntitiesById = <T extends EntityType>(
  array: T[],
  id: string | number
) => array.filter(({ id: entityId }) => entityId === parseInt(id as string));

export const filterEntitiesByListOfIds = <T extends EntityType>(
  array: T[],
  ids: string[] | number[]
) => array.filter(({ id: entityId }) => ids.some(id => entityId === parseInt(id as string)));

export const filterEntitiesByUserId = <
  T extends EntityType & { user_id: UserType["id"] }
>(
  array: T[],
  userId: string | number
) =>
  array.filter(
    ({ user_id: entityUserId }) => entityUserId === parseInt(userId as string)
  );

