import { kelvinToCelsius } from "../../helpers";
import type { Weather } from "../../types";
import styles from './WeatherDetail.module.css'
import WeatherLoading from "./WeatherLoading";
import WeatherState from "./WeatherState";

type WeatherDetailProps = {
    weather: Weather
    loading: boolean
}

export default function WeatherDetail({ weather, loading = false }: WeatherDetailProps) {
    if (loading) {
        return (
            <WeatherLoading />
        )
    }
    if (!weather.name) {
        return (
            <WeatherState />
        )
    }
    return (
        <div className={styles.weatherDetail}>
            <h2 className={styles.title}>{weather.name}</h2>
            <div className={styles.mainTemp}>
                <span className={styles.tempValue}>{kelvinToCelsius(weather.main.temp)}</span>
                <span className={styles.tempLabel}>Temperatura</span>
            </div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>Mínima</span>
                    <span className={styles.statValue}>{kelvinToCelsius(weather.main.temp_min)}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>Máxima</span>
                    <span className={styles.statValue}>{kelvinToCelsius(weather.main.temp_max)}</span>
                </div>
            </div>
        </div>
    )
}
