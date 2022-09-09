import { LL } from "constants/DateConstant";
import { IMPERIAL, KATHMANDU, METRIC } from "constants/variablesConstant";
import { cast, Instance, types, flow } from "mobx-state-tree";
import moment from "moment";
import { getWeatherforecasts } from "services/weatherService";
import { convertUnixToDate } from "utils/dateUtils";

export enum Pod {
  D = "d",
  N = "n",
}

export enum Description {
  BrokenClouds = "broken clouds",
  FewClouds = "few clouds",
  LightRain = "light rain",
  ModerateRain = "moderate rain",
  ScatteredClouds = "scattered clouds",
}

export enum Icon {
  The02D = "02d",
  The02N = "02n",
  The03D = "03d",
  The04D = "04d",
  The10D = "10d",
  The10N = "10n",
}

export enum MainEnum {
  Clouds = "Clouds",
  Rain = "Rain",
}

export enum TempType {
  metric = "c",
  imperial = "f",
}

export interface IWeatherModel extends Instance<typeof WeatherModel> {}

export const WeatherModel = types.model({
  dt: types.number, // datetime in unix
  main: types.model({
    temp: types.number,
    feels_like: types.number,
    temp_min: types.number, // min temperature of day
    temp_max: types.number, // max temperature of day
    pressure: types.number,
    sea_level: types.number,
    grnd_level: types.number,
    humidity: types.number,
    temp_kf: types.number,
  }),
  weather: types.array(
    types.model({
      id: types.number,
      main: types.string,
      description: types.string,
      icon: types.string,
    })
  ),
  clouds: types.model({
    all: types.number,
  }),
  wind: types.model({
    speed: types.number,
    deg: types.number,
    gust: types.number,
  }),
  visibility: types.number,
  pop: types.number,
  rain: types.maybeNull(
    types.model({
      "3h": types.number,
    })
  ),
  sys: types.model({
    pod: types.string,
  }),
  dt_txt: types.string,
});

export const CityModel = types.model({
  id: types.number,
  name: types.string,
  coord: types.model({
    lat: types.number,
    lon: types.number,
  }),
  country: types.string,
  population: types.number,
  timezone: types.number,
  sunrise: types.number,
  sunset: types.number,
});

export interface IWeatherModel extends Instance<typeof WeatherModel> {}
export interface IForecastStore extends Instance<typeof ForecastStore> {}

export interface WeatherListGroupByDate {
  [key: string]: IWeatherModel[];
}

export const ForecastModel = types.model({
  cod: types.string,
  message: types.number,
  cnt: types.number,
  list: types.array(WeatherModel),
  city: types.model({
    id: types.number,
    name: types.string,
    coord: types.model({
      lat: types.number,
      lon: types.number,
    }),
    country: types.string,
    population: types.number,
    timezone: types.number,
    sunrise: types.number,
    sunset: types.number,
  }),
});

export const ForecastStore = types
  .model({
    data: types.maybeNull(ForecastModel),
    error: types.maybeNull(types.string),
    isLoading: types.boolean,
    selectedDate: types.maybeNull(types.number), // active weather date
  })
  .actions((self) => ({
    fetchWeathers: flow(function* fetchWeathers(
      tempType: string | null,
      selectedDate: number | null
    ) {
      if (!self.isLoading) {
        self.isLoading = true;
      }
      const temperatureType = getTempType(tempType);

      const [error, data] = yield getWeatherforecasts<any>({
        q: KATHMANDU,
        units: temperatureType,
      });

      if (data?.list && data?.city) {
        self.data = cast(data);
        self.selectedDate = selectedDate || moment().unix();
        self.error = null;
      } else {
        self.data = null;
        self.error = error.errorMessage;
      }
      self.isLoading = false;
    }),
    setSelectedDate(date: number) {
      self.selectedDate = date;
    },
  }))
  .views((self) => ({
    /*
     * groupbydate List to show the temperature chart of day
     * [{'June 9 2014': [{dt, main, list, weather ....}]}]
     */
    get weatherListGroupByDate() {
      return (
        self.data?.list.reduce(
          (acc: WeatherListGroupByDate[], item: IWeatherModel) => {
            // formattedDate = "June 9 2014"
            const formattedDate = convertUnixToDate(item.dt).format(LL);

            const index = acc.findIndex(
              (oldItem: WeatherListGroupByDate) =>
                Object.keys(oldItem)[0] === formattedDate
            );
            // check if formattedDate key exists
            if (index > -1) {
              const indexObject = acc[index];
              indexObject[formattedDate].push(item);
            } else {
              acc.push({ [formattedDate]: [item] });
            }
            return acc;
          },
          [] as WeatherListGroupByDate[]
        ) || []
      );
    },
    // selected weather for weather details content
    get selectedWeathers() {
      let dateString: string;
      if (self.selectedDate && moment(self.selectedDate, true).isValid()) {
        dateString = convertUnixToDate(self.selectedDate).format(LL);
      } else {
        dateString = moment().format(LL);
      }

      return (
        self.data?.list.filter(
          (weather) => convertUnixToDate(weather.dt).format(LL) === dateString
        ) || []
      );
    },
  }));

const getTempType = (type: string | null) => {
  return isImperialUnits(type) ? IMPERIAL : METRIC;
};

export const isImperialUnits = (type: string | null) => {
  return type === TempType.imperial;
};
