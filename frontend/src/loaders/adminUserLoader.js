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
  const loggedInUser = getUserFromLocalStorage();
  if (!admin && !loggedInUser) {
    return redirect("/admin/signin");
  }
  const user = admin || loggedInUser;
  return { user };
};

export default adminUserLoader;