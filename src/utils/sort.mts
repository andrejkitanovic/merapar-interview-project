import { EntityType } from "types/index.mjs";

enum OrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export const sortEntitiesByDate = <T extends EntityType>(
  array: T[],
  order: OrderEnum = OrderEnum.DESC
) => {
  return array.sort((a, b) => {
    const aTimestamp = new Date(a.created_at).getTime();
    const bTimestamp = new Date(b.created_at).getTime();

    if (aTimestamp > bTimestamp) {
      return order === OrderEnum.ASC ? 1 : -1;
    } else if (bTimestamp > aTimestamp) {
      return order === OrderEnum.ASC ? -1 : 1;
    }
    return 0;
  });
};
