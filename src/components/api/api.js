import axios from 'axios';
const url = 'https://project-backend-liard.vercel.app';

export const LoginUser = async (data) => {
    try {
        const response = await axios.post(`${url}/user/login`, data, {
            timeout: 6000,
            credentials: 'include',
            headers: {     
                'Content-Type': 'application/json',
                uniid: localStorage.getItem("code")
            },
        });
        console.log(response.data.role);
        if (response.status === 200) {
            return {
                status: response.data.status,
                token: response.data.token,
                data: response.data.data
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            };
        }
        return {
            message: "Internet is slow, try again"
        };
    }
};


export const SignUpUser = async (data) => {
    try {
        const response = await axios.post(`${url}/user/signup`, data, {
            timeout: 6000,
            headers: {     
                'Content-Type': 'application/json',
                uniid: localStorage.getItem("code")

            },
        });
        if (response.status === 201) {
            return {
                status: response.data.status,
                message: response.data.message
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            };
        }
        return {
            message: "Internet is slow, try again"
        };
    }
};


export const verifyUser = async () => {
    try {
        const response = await axios.get(`${url}/user/verify`, {
            timeout: 6000,
            headers: {
                token:localStorage.getItem("token"),
                role: localStorage.getItem("role"), 
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const createClub = async (clubData) => {
    try {
        const response = await axios.post(`${url}/clubs`, clubData, {
            timeout: 6000,
            headers: {
                token:localStorage.getItem("token"),
                role: localStorage.getItem("role"), 
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const getAllClubs = async () => {
    try {
        const response = await axios.get(`${url}/clubs`,{
            headers: {
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
            timeout: 6000
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const deleteClub = async (clubId) => {
    try {
        const response = await axios.delete(`${url}/clubs/${clubId}`, {
            timeout: 6000
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const getClub = async (clubId) => {
    try {
        const response = await axios.get(`${url}/clubs/${clubId}`, {
            timeout: 6000,
            headers: {
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            }
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const getClubEvents = async (clubId) => {
    try {
        const response = await axios.get(`${url}/clubs/${clubId}/events`, {
            timeout: 6000,
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const updateClub = async (clubId, updatedData) => {
    try {
        const response = await axios.put(`${url}/clubs/${clubId}`, updatedData, {
            timeout: 6000
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${url}/event`, {
            headers: {     
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
            timeout: 6000,
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};


export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${url}/event/${id}`, {
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${url}/event`, eventData, {
            timeout: 6000,
            headers: {     
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
        });

        if (response.status === 201) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const updateEvent = async (id, updateData) => {
    try {
        const response = await axios.put(`${url}/events/${id}`, updateData, {
            timeout: 6000,
            headers: {     
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${url}/events/${id}`, {
            timeout: 6000,
            headers: {     
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};



export const enrollStudent = async (eventId, studentId) => {
    try {
        const response = await axios.post(
            `${url}/event/${eventId}/enroll`,
            { studentId }, // This is the payload
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token'),
                    role: localStorage.getItem('role'),
                },
                timeout: 6000,
            }
        );

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: 'Internet is slow. Try again.',
        };
    }
};




export const checkEnrollment = async (eventId, studentId) => {
    try {
        const response = await axios.get(`${url}/event/${eventId}/enroll`, {
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json',
                token:localStorage.getItem('token'),
                role: localStorage.getItem("role")
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                enrolled: response.data.enrolled,
                message: response.data.message,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${url}/student/${id}`, {
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
                role: localStorage.getItem('role')
            },
        });

        if (response.status === 200) {
            return {
                status: response.data.status,
                message: response.data.message,
                data: response.data.data,
            };
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message,
            };
        }
        return {
            message: "Internet is slow. Try again.",
        };
    }
};
