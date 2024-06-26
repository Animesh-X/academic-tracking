import { redirect } from "react-router-dom";

const getAdminFromLocalStorage = () => {
    const loggedAdminJSON = window.localStorage.getItem("loggedAcademicTrackingAdmin");
    if (loggedAdminJSON) {
      return JSON.parse(loggedAdminJSON);
    }
    return null;
};

const adminLoginLoader = async () => {
    const admin = getAdminFromLocalStorage();
    if (admin) {
        return redirect("/admin/dashboard");
    }
    return { admin };
}

export default adminLoginLoader;