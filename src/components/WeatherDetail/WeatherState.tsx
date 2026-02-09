import styles from './WeatherState.module.css'

export default function WeatherState() {
    return (
        <div className={`${styles.weatherDetail} ${styles.empty}`}>
            <div className={styles.emptyIcon}>🔎</div>
            <div className={styles.emptyTitle}>Sin resultados</div>
            <p className={styles.emptyText}>Intenta otra ciudad o país</p>
        </div>
    )
}
