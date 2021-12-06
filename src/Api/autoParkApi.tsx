import api from './api'

export const getAllAutoParks = async () => {
    return await api.get(`AutoPark`)
}

export const getAutoParkById = async (id: number) => {
    return await api.get(`AutoPark/${id}`, id)
}
