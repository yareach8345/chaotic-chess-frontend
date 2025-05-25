const convertSnakeCaseToCamelCase = (str: string): string => {
    const words = str.split('_');
    return words
        .map((word, index) => {
            if (index === 0) {
                return word;
            }
            const firstLetterCap = word.charAt(0).toUpperCase();
            const remainingLetters = word.slice(1);
            return firstLetterCap + remainingLetters;
        })
        .join('');
};

const convertObjectPropertiesSnakeCaseToCamelCase = (
    obj: Record<string, any>,
): Record<string, any> => {
    const convertedObject: Record<string, any> = {};
    for (let [key, value] of Object.entries(obj)) {
        const camelCaseKey = convertSnakeCaseToCamelCase(key);
        if (!Array.isArray(value) && typeof value === 'object' && value !== null && value !== undefined) {
            value = convertObjectPropertiesSnakeCaseToCamelCase(value);
        }
        convertedObject[camelCaseKey] = value;
    }
    return convertedObject;
};

export const transformPropertiesToCamelCase = <T>(obj: any) => {
    return convertObjectPropertiesSnakeCaseToCamelCase(obj) as T;
}

export function transformStringToCamelCase(str: string) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}