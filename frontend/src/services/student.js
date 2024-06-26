import axios from "axios";

const baseUrl = "http://localhost:3653/api/";

let token = null;
let config = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
    config = {
        headers: {
            Authorization: token,
        },
    };
};

const handleJWTExpiry = () => {
    localStorage.removeItem("loggedAcademicTrackingstudent");
    window.location.reload();
};

const axiosGET = async (endpoint) => {
    try {
        const response = await axios.get(baseUrl + endpoint, config);
        return response.data;
    } catch (error) {
        if (error.response.status == 401) {
            handleJWTExpiry();
        } else {
            throw Error(error.response.data.error);
        }
    }
};

const getStudentDetail = async() => {
    return axiosGET(`student`);
};

const getSemesters = async () => {
    return axiosGET(`student/semesters`);
};

const getCPI = async () => {
    return axiosGET(`student/cpi`);
};

const getSPI = async (semesterNumber) => {
    return axiosGET(`student/spi/${semesterNumber}`);
};

const getCourses = async() => {
    return axiosGET(`student/courses`);
}

export default {
    setToken,
    getStudentDetail,
    getSemesters,
    getCPI,
    getSPI,
    getCourses
}