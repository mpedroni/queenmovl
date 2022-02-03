import { client } from './client';

interface SearchMovieParams {
  query: string;
  language?: string;
}

export type Movie = {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
};

interface SearchMovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  error: Error;
}

export async function searchMovie({
  query,
  language = 'pt-BR',
}: SearchMovieParams): Promise<SearchMovieResponse> {
  try {
    // const { data } = await client.get<SearchMovieResponse>('/search/movie', {
    //   params: {
    //     query,
    //     language,
    //   },
    // });

    // return data;

    /**
     *
     * temporary workaround because Axios requests don't work correctly along with the MirageJS
     *
     */

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&${language}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );

    const data: SearchMovieResponse = await res.json();

    return data;
  } catch (error) {
    return {
      error: new Error('Ops! Não foi possível carregar a lista de filmes'),
    } as SearchMovieResponse;
  }
}
