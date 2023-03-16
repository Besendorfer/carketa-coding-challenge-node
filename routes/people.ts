import axios from 'axios';
import express, { Request, Response } from 'express';
import { sortFunctionMap } from './people.utils';

import type { Router } from 'express';
import type { Person } from '../types/people';

// an extremely simple cache that speeds up subsequent calls (not a good caching system by any means)
// We wouldn't want to implement it this way unless we absolutely know that the data won't change
const starWarsPeople: Person[] = [];

const people: Router = express.Router();
people.get('/', async (req: Request, res: Response) => {
  let next: string = `${process.env.SWAPI_BASE_URL}/people`;

  if (!starWarsPeople.length) {
    // pull all data (pagination)
    while (next) {
      try {
        let peopleResults = await axios(next);
        let resultsJson = peopleResults.data;
        next = resultsJson.next;

        starWarsPeople.push(...resultsJson.results);
      } catch (error) {
        console.log('Could not retrieve the list of people', error);
      }
    }
  }

  // This allows us to keep the original, unsorted, list of people untouched
  const results = structuredClone(starWarsPeople);

  // sort by 'sortBy' query param
  // Currently this doesn't account for the query param's casing, so we need to use `sortBy`,
  // This is something we could account for in the future
  if (req.query.sortBy) {
    const sortBy: string = req.query.sortBy as string;
    results.sort(sortFunctionMap[sortBy]?.(sortBy));
  }

  res.send(results);
});

export {
  people
};