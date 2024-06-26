import { redirect } from "react-router-dom";

const getStudentFromLocalStorage = () => {
    const loggedStudentJSON = window.localStorage.getItem("loggedAcademicTrackingstudent");
    if (loggedStudentJSON) {
      return JSON.parse(loggedStudentJSON);
    }
    return null;
};

const studentLoginLoader = async () => {
    const student = getStudentFromLocalStorage();
    if (student) {
        return redirect("/student/dashboard");
    }
    return { student };
}

export default studentLoginLoader;