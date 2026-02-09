import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import type { FormData } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (formData: FormData) => Promise<void>
}

export default function Form({ fetchWeather }: FormProps) {

  const [formData, setFormData] = useState<FormData>({
    city: '',
    country: ''
  })

  const [alert, setAlert] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(formData).includes('')) {
      setAlert('Por favor, complete todos los campos')
      return
    }
    setAlert('')
    await fetchWeather(formData)
  }

  return (
    <form className={styles.form}
      onSubmit={handleSubmit}>
      {alert && <Alert message={alert} />}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Buscar por ciudad"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">---Selecciona un país---</option>
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Consultar el clima" />
    </form>
  )
}
