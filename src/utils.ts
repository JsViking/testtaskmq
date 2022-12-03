/**
 * Request for data
 * @param url request
 * @returns data
 */
export async function getData<T>(url: string): Promise<T[]> {
    const res = await fetch(url);

    if (res.ok) {
        return await res.json();
    }

    throw new Error();
}

// Функция для получения ренджа из массива по заданным датам из объекта.
export function getDataFromList<T , A, >(array: T[], start: A, end: A, key: keyof T ) {
    if (!start || !end) throw new Error('Search start and end value not set!');
    // @ts-ignore
    const startIndex = array.findIndex((elem) => elem[key].includes(start))
    // @ts-ignore
    const endIndex = array.findLastIndex((elem) => elem[key].includes(end))
    return array.slice(startIndex, endIndex)
}

// Фуекция для прерывания тяжелых циклов на основе setTimeout
export function oneMoment() {
    return new Promise(resolve => setTimeout(resolve));
}