import type { WorldBankOptions, WorldBankResponse } from '../types.ts';

export async function getWorldBankData(
  indicator: string, 
  options: WorldBankOptions = {}
): Promise<WorldBankResponse[]> {
  const { country = "all", date = "2020:2023", format = "json" } = options;
  
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?date=${date}&format=${format}&per_page=1000`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`World Bank API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // World Bank API returns an array where [0] is metadata and [1] is data
    if (Array.isArray(data) && data.length > 1 && data[1]) {
      return data[1].filter((item: any) => item.value !== null);
    }
    
    return [];
  } catch (error) {
    console.error("World Bank API Error:", error);
    throw new Error("Failed to fetch World Bank data");
  }
}

export async function getGDPData(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("NY.GDP.MKTP.CD", { country });
}

export async function getPopulationData(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("SP.POP.TOTL", { country });
}

export async function getInflationData(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("FP.CPI.TOTL.ZG", { country });
}

export async function getUnemploymentData(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("SL.UEM.TOTL.ZS", { country });
}

export async function getFDIData(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("BX.KLT.DINV.CD.WD", { country });
}

export async function getEaseOfDoingBusinessRank(country?: string): Promise<WorldBankResponse[]> {
  return getWorldBankData("IC.BUS.EASE.XQ", { country });
}

export async function getRegionalEconomicData(region: string): Promise<any> {
  // Aggregate economic data for a region
  const countries = getCountriesInRegion(region);
  const economicData: any = {};

  for (const country of countries) {
    try {
      const gdp = await getGDPData(country);
      const population = await getPopulationData(country);
      const inflation = await getInflationData(country);

      economicData[country] = {
        gdp: gdp[0]?.value || null,
        population: population[0]?.value || null,
        inflation: inflation[0]?.value || null,
      };
    } catch (error) {
      console.warn(`Failed to fetch data for ${country}:`, error);
    }
  }

  return economicData;
}

function getCountriesInRegion(region: string): string[] {
  const regions: { [key: string]: string[] } = {
    'East Asia & Pacific': ['CHN', 'JPN', 'KOR', 'THA', 'VNM', 'PHL', 'IDN', 'MYS'],
    'Europe & Central Asia': ['DEU', 'FRA', 'GBR', 'ITA', 'RUS', 'POL', 'TUR'],
    'Latin America & Caribbean': ['BRA', 'MEX', 'ARG', 'COL', 'CHL', 'PER'],
    'Middle East & North Africa': ['SAU', 'ARE', 'ISR', 'EGY', 'MAR', 'JOR'],
    'North America': ['USA', 'CAN', 'MEX'],
    'South Asia': ['IND', 'PAK', 'BGD', 'LKA', 'NPL'],
    'Sub-Saharan Africa': ['ZAF', 'NGA', 'KEN', 'GHA', 'TZA', 'UGA'],
  };

  return regions[region] || [];
}
