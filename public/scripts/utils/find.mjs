export const filterEntitiesById = (array, id) => array.filter(({ id: entityId }) => entityId === parseInt(id));
export const filterEntitiesByListOfIds = (array, ids) => array.filter(({ id: entityId }) => ids.some(id => entityId === parseInt(id)));
export const filterEntitiesByUserId = (array, userId) => array.filter(({ user_id: entityUserId }) => entityUserId === parseInt(userId));
