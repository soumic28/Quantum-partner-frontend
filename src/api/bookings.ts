import axios from 'axios'
import { BACKEND_URL } from '../../config'

export async function getTodayBookings() {
    try {
        const response = await axios.get(`${BACKEND_URL}/booking/today`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}


export async function getWeeklyBookings() {
    try {
        const response = await axios.get(`${BACKEND_URL}/booking/this-week`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}


export async function getUpcomingBookings() {
    try {
        const response = await axios.get(`${BACKEND_URL}/booking/upcoming`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}


export async function getPreviousBookings() {
    try {
        const response = await axios.get(`${BACKEND_URL}/booking/previous`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data.data;

    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}