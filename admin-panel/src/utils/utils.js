const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Replace with your Cloudinary upload preset
const CLOUDINARY_UPLOAD_URL =
  "cloudinary://249952746339958:Fs4-PPD0oFlL61jIaOA2IuJbGsQ@diunslxah";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
