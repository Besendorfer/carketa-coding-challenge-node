import express, { Request, Response } from 'express';
import axios from 'axios';

import type { Router } from 'express';
import type { Planet } from '../types/planets';

// an extremely simple cache that speeds up subsequent calls (not a good caching system by any means)
// We wouldn't want to implement it this way unless we absolutely know that the data won't change
const starWarsPlanets: Planet[] = [];

const planets: Router = express.Router();
planets.get('/', async (_req: Request, res: Response) => {
  let next: string = `${process.env.SWAPI_BASE_URL}/planets`;

  if (!starWarsPlanets.length) {
    // pull all data (pagination)
    while (next) {
      try {
        let planetResults = await axios(next);
        let resultsJson = planetResults.data;
        const mappedResults: Planet[] = [];

        // Grab each resident's names and replace the URLs with their names
        for (let planet of resultsJson.results) {
          const planetResidents: string[] = [];

          for (let residentUrl of planet.residents) {
            try {
              let residentResult = await axios(residentUrl);
              let residentJson = residentResult.data;

              planetResidents.push(residentJson?.name ?? '');
            } catch (residentError) {
              console.log('Could not retrieve resident\'s name: ', residentError);
            }
          }

          planet.residents = planetResidents;
          mappedResults.push(planet);
        }

        next = resultsJson.next;

        starWarsPlanets.push(...mappedResults);
      } catch (planetError) {
        console.log('Could not retrieve paginated list of planets: ', planetError);
      }
    }
  }

  res.send(starWarsPlanets);
});

export {
  planets
};