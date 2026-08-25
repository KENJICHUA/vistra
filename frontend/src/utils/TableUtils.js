export function getTableColumns(data, excludedKeys = ["id"]) {
    return Object.keys(data[0] || {}).filter(
        (key) => !excludedKeys.includes(key)
    );
}