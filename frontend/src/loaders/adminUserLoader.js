import { redirect } from "react-router-dom";

const getAdminFromLocalStorage = () => {
  const loggedAdminJSON = window.localStorage.getItem("loggedAcademicTrackingAdmin");
  if (loggedAdminJSON) {
    return JSON.parse(loggedAdminJSON);
  }
  return null;
};

const getUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedAcademicTrackingUser");
    if (loggedUserJSON) {
        return JSON.parse(loggedUserJSON);
    }
    return null;
};


const adminUserLoader = async () => {
  const admin = getAdminFromLocalStorage();
  const user = getUserFromLocalStorage();
  if (!admin && !user) {
    return redirect("/admin/signin");
  }
  return { admin, user };
};

export default adminUserLoader;