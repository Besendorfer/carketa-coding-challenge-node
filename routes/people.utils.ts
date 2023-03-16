import type { Person } from '../types/people';
import type { SortByComparator } from '../types/utils';

// A fun use of currying so we can use this map to store comparator functions.
// I might want to move this back to the People route, since this is specific for that.
const sortFunctionMap: Record<string, SortByComparator> = {
  // Just a basic ascending sort on strings
  'name': (sortBy: string) => (a: Person, b: Person) =>
    (a[sortBy as keyof Person] < b[sortBy as keyof Person]) ? -1
      : ((a[sortBy as keyof Person] > b[sortBy as keyof Person]) ? 1
      : 0),
  // An ascending sort on parsed integers, and accounts for "unknown"
  'height': (sortBy: string) => (a: Person, b: Person) => {
    const parsedA: number = parseInt(a[sortBy as keyof Person] as string, 10);
    const parsedB: number = parseInt(b[sortBy as keyof Person] as string, 10);
    if (parsedA === parsedB) return 0;
    if (isNaN(parsedA)) return 1;
    if (isNaN(parsedB)) return -1;
    return (parsedA < parsedB) ? -1 : ((parsedA > parsedB) ? 1 : 0);
  },
  // An ascending sort on parsed floats, and accounts for "unknown"
  'mass': (sortBy: string) => (a: Person, b: Person) => {
    const parsedA = parseFloat((a[sortBy as keyof Person] as string).replace(/,/g, ''));
    const parsedB = parseFloat((b[sortBy as keyof Person] as string).replace(/,/g, ''));
    if (parsedA === parsedB) return 0;
    if (isNaN(parsedA)) return 1;
    if (isNaN(parsedB)) return -1;
    return (parsedA < parsedB) ? -1 : ((parsedA > parsedB) ? 1 : 0);
  }
};

export {
  sortFunctionMap
};