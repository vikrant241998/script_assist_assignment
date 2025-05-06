import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ✅ Ghibli API se films fetch karne wala function
const fetchGhibliFilms = async (): Promise<any[]> => {
  const url = 'https://ghibliapi.vercel.app/films';
  const response = await axios.get(url);
  return response.data; // ye API directly array return karti hai
};

// ✅ React Query hook for fetching Ghibli films
export const useRickAndMortyData = () => {
  return useQuery(['ghibliFilms'], fetchGhibliFilms);
};
