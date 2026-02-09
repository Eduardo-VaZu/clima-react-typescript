export type Country = {
  code: string
  name: string
}

export type FormData = {
  city: string
  country: string
}

export type Weather = {
  name: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
}
