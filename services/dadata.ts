const DADATA_API_KEY = process.env.NEXT_PUBLIC_DADATA_API_KEY;
const DADATA_SUGGEST_URL =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const DADATA_GEOCODE_URL =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";

export interface DadataAddress {
  value: string;
  unrestricted_value: string;
  data: {
    geo_lat: string;
    geo_lon: string;
    [key: string]: any;
  };
}

export interface DadataResponse {
  suggestions: DadataAddress[];
}

export async function searchAddress(query: string): Promise<DadataAddress[]> {
  try {
    const response = await fetch(DADATA_SUGGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${DADATA_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        count: 5,
        locations: [{ region: "Москва" }],
        from_bound: { value: "street" },
        to_bound: { value: "flat" },
      }),
    });

    const data: DadataResponse = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    return [];
  }
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<string> {
  try {
    const response = await fetch(DADATA_GEOCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${DADATA_API_KEY}`,
      },
      body: JSON.stringify({
        lat,
        lon,
        count: 1,
      }),
    });

    const data: DadataResponse = await response.json();

    if (data.suggestions && data.suggestions.length > 0) {
      return data.suggestions[0].value;
    }

    return "Адрес не найден";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "Адрес не найден";
  }
}
