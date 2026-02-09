import styles from './App.module.css'
import Form from './components/Form/Form'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWather'

export default function App() {

  const { weather, loading, fetchWeather } = useWeather()

  return (
    <>
      <div className={styles.title}>Buscador de clima</div>
      <div className={styles.container}>
        <div className={styles.panel}>
          <Form fetchWeather={fetchWeather} />
        </div>
        <div className={styles.panel}>
          <WeatherDetail weather={weather} loading={loading} />
        </div>
      </div>
    </>
  )
}
