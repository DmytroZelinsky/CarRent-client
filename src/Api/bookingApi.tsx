import api from './api'

export const createBooking = async (data:any) => {
    console.log(data)
    return await api.post(`Booking`, data)
}
