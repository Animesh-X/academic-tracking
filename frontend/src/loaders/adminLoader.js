import { redirect } from "react-router-dom";

const getAdminFromLocalStorage = () => {
  const loggedAdminJSON = window.localStorage.getItem("loggedAcademicTrackingAdmin");
  if (loggedAdminJSON) {
    return JSON.parse(loggedAdminJSON);
  }
  return null;
};

const adminLoader = async () => {
  const admin = getAdminFromLocalStorage();
  if (!admin) {
    return redirect("/admin/signin");
  }
  return { admin };
};

export default adminLoader;