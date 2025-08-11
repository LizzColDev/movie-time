import { getTrendingMovies } from '../../src/services/tmdb.service.js';

describe('TMDB Service', () => {
  it('should fetch trending movies', async () => {
    const data = await getTrendingMovies();

    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);
  });
});
