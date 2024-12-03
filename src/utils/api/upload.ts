import axios from "axios";
import { BackendURL } from "../constants/url";

export const handleSingleFileUpload = async (file) => {
  const token = localStorage.getItem("accessToken");

  if (!file) {
    alert("No image to submit!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file); 
    formData.append("ContentType", file.type); 

    const response = await axios.post(`${BackendURL}/storage`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

   
    const publicUrl = response.data?.data?.data?.PublicUrl;

    if (publicUrl) {
      console.log("Uploaded image URL:", publicUrl);
      alert("File successfully uploaded!");
      return publicUrl; 
    } else {
      throw new Error("Public URL not found in the response");
    }
  } catch (error) {
    console.error("Error submitting file:", error.response?.data || error);
    alert("Error occurred while uploading the file.");
    return null;
  }
};

// Helper function to convert Data URL to Blob
const dataURLToBlob = (dataUrl) => {
  const [metadata, base64Data] = dataUrl.split(",");
  const mimeType = metadata.match(/:(.*?);/)[1];
  const binaryData = atob(base64Data);
  const arrayBuffer = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    arrayBuffer[i] = binaryData.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeType });
};
