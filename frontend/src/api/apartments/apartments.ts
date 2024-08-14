import { Apartment } from "../../types/apartment";
import axios from "axios";

export const getApartments = async () => {
  const result = await axios.get<Partial<Apartment>[]>("apartments");
  return result.data;
};

export const getApartmentDetails = async (id: string) => {
  const result = await axios.get<Apartment>(`apartments/${id}`);
  return result.data;
};
