import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather } from './../redux/store'

const Home = () => {
	const [city, setCity] = useState('')
	const dispatch = useDispatch()
	const { weather, status, error } = useSelector((state) => state.weather)
	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(fetchWeather(city))
	}
	return (
		<>
			<div className="weather">
				<>
					<div className="weather__wrapper">
						<h1
							style={{
								textAlign: 'center',
								position: 'absolute',
								top: '20px',
								fontSize: '46px',
							}}
						>
							<a href="" className="weather__link">
								Прогноз погоды
							</a>
						</h1>
						{!weather && (
							<>
								<div className="wrapper__part">
									<form onSubmit={handleSubmit}>
										<div className="form">
											<input
												type="text"
												value={city}
												onChange={(e) => setCity(e.target.value)}
												placeholder="Введите город"
												required
											/>
											<button className="click__btn" type="submit">
												Узнать погоду
											</button>
										</div>
									</form>
								</div>
							</>
						)}
						{status === 'succeeded' && weather && (
							<div className="wrapper__part">
								{status === 'loading' && (
									<div style={{ textAlign: 'center' }}>Загрузка...</div>
								)}
								<div style={{ padding: '20px' }}>
									<div className="title">{weather.name}</div>
									<hr style={{ margin: '20px auto' }} />
									<div className="temp">
										Температура <span>{Math.round(weather.main.temp)}°C</span>
									</div>
									<div className="temp">
										Погодные условия
										<span>
											{weather.weather[0].description[0].toUpperCase() +
												weather.weather[0].description.substring(1)}
										</span>
									</div>
									<div className="temp">
										Влажность <span>{weather.main.humidity}%</span>
									</div>
									<div className="temp">
										Скорость ветра <span>{weather.wind.speed} м/с</span>
									</div>
								</div>
							</div>
						)}
						{status === 'failed' && <p>{error}</p>}
					</div>
				</>
			</div>
		</>
	)
}

export default Home
