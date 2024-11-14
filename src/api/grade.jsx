import axios from "../configs/axios";

export const studentViewGrade = (token) =>
  axios.get("/grade/student/grade", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const studentGetAllGrade = (token) =>
  axios.get("/grade/student/all-grade", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const studentViewGradeBySemester = (token, body) =>
  axios.get("/grade/student/grade-semester", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const studentViewScorePerSub = (token, courseId) =>
  axios.get("/grade/student/score/" + courseId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const studentGetGPABySemester = (token) =>
  axios.get("/grade/student/GPA/semester", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const studentGetGPA = (token) =>
  axios.get("/grade/student/GPA/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const teacherAddScore = (token, courseId, body) =>
  axios.post("/grade/teacher/score/" + courseId, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const teacherEditScore = (token, componentId, body) =>
  axios.patch("/grade/teacher/edit-score/" + componentId, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
