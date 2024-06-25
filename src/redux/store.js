import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWeather = createAsyncThunk(
	'weather/fetchWeather',
	async (city) => {
		const apiKey = '0a652d83e343825f3c094000253c7c49'
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
		)
		return data
	}
)

const initialState = {
	weather: null,
	status: 'idle',
	error: null,
}

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.weather = action.payload
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const store = configureStore({
	reducer: {
		weather: weatherSlice.reducer,
	},
})
