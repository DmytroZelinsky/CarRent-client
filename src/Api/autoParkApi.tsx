import api from './api'

export const getAllAutoParks = async () => {
    return await api.get('AutoPark')
}