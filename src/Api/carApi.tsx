import api from './api'

export const deleteCar = async (data:any) => {
    console.log(data)
    return await api.remove(`Car/${data}`, data)
}
