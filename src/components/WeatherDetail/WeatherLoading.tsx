import styles from './WeatherLoading.module.css'

export default function WeatherLoading() {
    return (
        <div className={`${styles.weatherDetail} ${styles.loading}`}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>Buscando clima...</div>
        </div>
    )
}
