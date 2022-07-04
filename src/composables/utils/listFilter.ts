export function useListFilter<T>(list: T[], filterBy: keyof T, value?: T[keyof T]): T[] {
    if (!value) {
        return list;
    }

    if (typeof (value) === 'string' && value.length < 1) {
        return list;
    }

    return list.filter((i) => {
        if (typeof (i[filterBy]) === 'string' && typeof (value) === 'string') {
            return (i[filterBy] as unknown as string).toLowerCase().indexOf(value.toLowerCase()) > -1;
        } else {
            return i[filterBy] == value;
        }
    })
}

export function useListMutliFilter<T>(list: T[], filters: { filterBy: keyof T, value?: T[keyof T] }[]): T[] {
    // if no filters providers, return full list
    if (filters.length < 1) {
        return list;
    }

    const validFilters: { filterBy: keyof T, value: T[keyof T] }[] = [];
    for (let x = 0; x < filters.length; x++) {
        if (!filters[x].value && typeof (filters[x].value) !== 'number') {
            continue;
        }

        validFilters.push({
            filterBy: filters[x].filterBy,
            value: filters[x].value as unknown as T[keyof T],
        })
    }

    function checkFilters(i: T, f: { filterBy: keyof T, value: T[keyof T] }[]): boolean {
        let valid = false;
        let totalMatches = 0;
        for (let x = 0; x < f.length; x++) {
            if (typeof (i[f[x].filterBy]) === 'string' && typeof (f[x].value) === 'string') {
                if ((i[f[x].filterBy] as unknown as string).includes(f[x].value as unknown as string)) {
                    totalMatches++;
                    continue
                }
            } else if (typeof (i[f[x].filterBy]) === 'number' && typeof (f[x].value) === 'number') {
                if ((i[f[x].filterBy] as unknown as number) === f[x].value as unknown as number) {
                    totalMatches++;
                    continue
                }
            } else {
                if (i[f[x].filterBy] == f[x].value) {
                    totalMatches++;
                    continue;
                }
            }
        }

        if (totalMatches === validFilters.length) {
            valid = true;
        }

        return valid;
    }

    return list.filter((i) => {
        if (checkFilters(i, validFilters)) {
            return i;
        }
    })
}