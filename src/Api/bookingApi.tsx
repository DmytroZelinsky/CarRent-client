import api from './api'

export const createBooking = async (data:any) => {
    return await api.post(`Booking`, data)
}

export const getAllClientOptionsForBooking = async () => {
    return await api.get('Booking/ClientOptions')
}
