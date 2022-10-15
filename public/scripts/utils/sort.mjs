var OrderEnum;
(function (OrderEnum) {
    OrderEnum["ASC"] = "asc";
    OrderEnum["DESC"] = "desc";
})(OrderEnum || (OrderEnum = {}));
export const sortEntitiesByDate = (array, order = OrderEnum.DESC // Default sort Descending
) => {
    return array.sort((a, b) => {
        const aTimestamp = new Date(a.created_at).getTime();
        const bTimestamp = new Date(b.created_at).getTime();
        if (aTimestamp > bTimestamp) {
            return order === OrderEnum.ASC ? 1 : -1;
        }
        else if (bTimestamp > aTimestamp) {
            return order === OrderEnum.ASC ? -1 : 1;
        }
        return 0;
    });
};
