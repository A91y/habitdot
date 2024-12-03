import axios from "axios";

import { BackendURL } from "../constants/url.ts";
import { Challenge } from "../../types/types.ts";

const getToken = () => {
  return (
    localStorage.getItem("authToken") || localStorage.getItem("accessToken")
  );
};

// Existing API functions

const getShareableLink = async (slug: string) => {
  try {
    const response = await axios.get(`${BackendURL}/challenge/share/${slug}`, {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
const getOngoingChallenges = async (body: {
  status: string;
  limit: number;
  offset: number;
}) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  body.status = "UPCOMING";
  try {
    const response = await axios.post(`${BackendURL}/challenge/filter`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const createChallengeAPI = async (challengeDetails: Challenge) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  console.log("request for create api authcode", getToken());

  try {
    const response = await axios.post(
      `${BackendURL}/challenge`,
      challengeDetails,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getChallengeDetails = async (status: number) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  try {
    const response = await axios.get(`${BackendURL}/challenge/${status}`, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export {
  getOngoingChallenges,
  getChallengeDetails,
  createChallengeAPI,
  getShareableLink,
};
