import { AsyncHandler } from "../utils/AsyncHandel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadImage } from "../utils/cloudinary.util.js";
import { Skills } from "../model/skills.model.js";

const addSkills = AsyncHandler(async (req, res) => {
  const { title, description, image } = req.body;
  console.log(title,"\n",description,"\n",image);
  if (!title || !description) {
    return res.status(400).json(new ApiResponse(400, { message: "All fields are required" }, "Missing fields"));
  }

  let imageUrl = "";
  if (image) {
    const upload = await uploadImage(image);
    if (!upload) {
      return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload error"));
    }
    imageUrl = upload.url;
  }

  const response = await Skills.create({ title, description, image: imageUrl });

  if (!response) {
    return res.status(500).json(new ApiResponse(500, { message: "Failed to save skill" }, "Database error"));
  }

  return res.status(200).json(new ApiResponse(200, response, "Added successfully"));
});

const getSkills = AsyncHandler(async (req, res) => {
  const skills = await Skills.find();

  if (!skills || skills.length === 0) {
    return res.status(404).json(new ApiResponse(404, { message: "No skills found" }, "No skills available"));
  }

  return res.status(200).json(new ApiResponse(200, skills, "Fetched successfully"));
});

const deleteSkills = AsyncHandler(async (req, res) => {
  const { id } = req.query;
  
  const skill = await Skills.findByIdAndDelete(id);

  if (!skill) {
    return res.status(404).json(new ApiResponse(404, { message: "Skill not found" }, "Skill not found"));
  }

  return res.status(200).json(new ApiResponse(200, { message: "Skill deleted successfully" }, "Skill deleted"));
});

const updateDescriptionAndTitle = AsyncHandler(async (req, res) => {
  
  const {id, title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json(new ApiResponse(400, { message: "All fields are required" }, "Missing fields"));
  }

  const skill = await Skills.findByIdAndUpdate(id, { title, description }, { new: true });

  if (!skill) {
    return res.status(404).json(new ApiResponse(404, { message: "Skill not found" }, "Skill not found"));
  }

  return res.status(200).json(new ApiResponse(200, skill, "Updated successfully"));
});

const updateImage = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!image) {
    return res.status(400).json(new ApiResponse(400, { message: "Image is required" }, "Missing image"));
  }

  const upload = await uploadImage(image);
  if (!upload) {
    return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload error"));
  }

  const skill = await Skills.findByIdAndUpdate(id, { image: upload.url }, { new: true });

  if (!skill) {
    return res.status(404).json(new ApiResponse(404, { message: "Skill not found" }, "Skill not found"));
  }

  return res.status(200).json(new ApiResponse(200, skill, "Image updated successfully"));
});

export { addSkills, getSkills, deleteSkills, updateDescriptionAndTitle, updateImage };
