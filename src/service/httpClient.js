import axios from "axios";

export const HttpClient = () => {
  const timeOut = process.env.TIME_OUT || 3000;
  return axios.create({
    timeout: timeOut,
    headers: { Origin: "https://ix.fundsflow.digital" },
  });
};
