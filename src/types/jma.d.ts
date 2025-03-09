declare namespace JMA {
  interface WeatherForecast {
    publishingOffice: string;
    reportDatetime: string;
    timeSeries: TimeSeries[];
  }

  interface TimeSeries {
    timeDefines: string[];
    areas: Area[];
  }

  interface Area {
    area: {
      name: string;
      code: string;
    };
    weatherCodes?: string[];
    weathers?: string[];
    winds?: string[];
    waves?: string[];
    pops?: string[];
    temps?: string[];
    reliabilities?: string[];
    tempsMin?: string[];
    tempsMinUpper?: string[];
    tempsMinLower?: string[];
    tempsMax?: string[];
    tempsMaxUpper?: string[];
    tempsMaxLower?: string[];
  }
}
