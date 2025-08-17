'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { generateCSV } from '@/app/src/shared/utils/helpers';
import { getSingleHero } from '@/app/src/shared/api/searchRequest';
import type { FavouriteHero } from '@/app/src/features/controlFavoriteMovies/types/favoriteTypes';

export async function downloadHeroesCsv(ids: number[]) {
  const heroesData = await Promise.all(
    ids.map(id => getSingleHero(String(id)))
  );

  const plain: FavouriteHero[] = heroesData
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map(h => ({
      id: h.id,
      name: h.name,
      status: h.status,
      species: h.species,
      gender: h.gender,
      location: { name: h.origin?.name ?? '' },
      image: h.image,
    }));

  const csv = generateCSV(plain);

  const filename = `${plain.length}_heroes_${Date.now()}.csv`;
  const tmpDir = path.join(process.cwd(), 'public', 'tmp');

  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(path.join(tmpDir, filename), csv, 'utf8');

  return `/tmp/${filename}`;
}
