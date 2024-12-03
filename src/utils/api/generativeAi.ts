import axios from "axios";
const BackendURLAi = "https://ai-api.catoff.xyz";

const getToken = () => {
  return (
    localStorage.getItem("authToken") || localStorage.getItem("accessToken")
  );
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiNjNFdGlXTEdGUkJhQW8zRXNyRWVhVVNuRGJWRXVYcllyMTQ3N2lrTEJ1ZjEiLCJpYXQiOjE3MjUzMDc3NDMsImV4cCI6MTcyNTMxMDc0M30.KVVrcoXNzR7VY55q29l7eGayNi2aIwAC9pkhrR7FSg0";
};

interface DescriptionRequestBody {
  prompt: string;
  participation_type: "0v1" | "1v1" | "NvN" | null;
  result_type: "steps" | "calories" | "validator" | "voting" | "reclaim" | null;
  additional_info: string | null;
}

interface ImageRequestBody {
  prompt: string;
}

const generateDescription = async (body: DescriptionRequestBody) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.post(
      `${BackendURLAi}/generate-description/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0OTUsImlhdCI6MTcyMzU2MTEwOCwiZXhwIjoxNzIzNTY0MTA4fQ.9iGT4FsWLCpyeW7S3lCo7_efc-Mwxl57JmOjL42VgbQ`, //testing
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.challenge_description;
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

const generateImage = async (body: ImageRequestBody) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    console.log(body);
    const response = await axios.post(`${BackendURLAi}/generate-image/`, body, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0OTUsImlhdCI6MTcyMzU2MTEwOCwiZXhwIjoxNzIzNTY0MTA4fQ.9iGT4FsWLCpyeW7S3lCo7_efc-Mwxl57JmOjL42VgbQ`, //testing
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.image_url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export { generateDescription, generateImage };
