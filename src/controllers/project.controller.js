import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandel.js";
import { uploadImage } from "../utils/cloudinary.util.js";
import { Projects } from "../model/project.model.js";

const addProject = AsyncHandler(async (req, res) => {
  const { technology, description, image, start, end, link } = req.body;
  if (!technology || !description || !image || !link) {
    return res.status(400).json(new ApiResponse(400, { message: "All fields are required" }, "Missing fields"));
  }
  
  const imageUrl = await uploadImage(image);
  console.log(imageUrl)
  if (!imageUrl) {
    return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload error"));
  }

  const response = await Projects.create({
    technology,
    description,
    image: [imageUrl.url],
    start,
    end,
    link,
  });

  if (!response) {
    return res.status(500).json(new ApiResponse(500, { message: "Failed to save project" }, "Database error"));
  }

  return res.status(200).json(new ApiResponse(200, response, "Project added successfully"));
});

const getProjects = AsyncHandler(async (req, res) => {
  const projects = await Projects.find();

  if (!projects || projects.length === 0) {
    return res.status(404).json(new ApiResponse(404, { message: "No projects found" }, "No projects available"));
  }

  return res.status(200).json(new ApiResponse(200, projects, "Fetched successfully"));
});

const addMoreImage = AsyncHandler(async (req, res) => {
  const { id, image } = req.body;

  if (!id || !image) {
    return res.status(400).json(new ApiResponse(400, { message: "Project ID and image are required" }, "Missing data"));
  }

  const upload = await uploadImage(image);
  if (!upload) {
    return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload error"));
  }

  const project = await Projects.findByIdAndUpdate(id, { $push: { image: upload.url } }, { new: true });

  if (!project) {
    return res.status(404).json(new ApiResponse(404, { message: "Project not found" }, "Project not found"));
  }

  return res.status(200).json(new ApiResponse(200, project, "Image added successfully"));
});

const deleteProject = AsyncHandler(async (req, res) => {
     const {id} = req.query
     
  if (!id) {
    return res.status(400).json(new ApiResponse(400, { message: "Project ID is required" }, "Missing project ID"));
  }

  const project = await Projects.findByIdAndDelete(id);

  if (!project) {
    return res.status(404).json(new ApiResponse(404, { message: "Project not found" }, "Project not found"));
  }

  return res.status(200).json(new ApiResponse(200, { message: "Project deleted successfully" }, "Project deleted"));
});

const updateProject = AsyncHandler(async (req, res) => {
  const { id, technology, description, start, end, link } = req.body;

  if (!id || !technology || !description || !link) {
    return res.status(400).json(new ApiResponse(400, { message: "Project ID and all required fields must be provided" }, "Missing fields"));
  }

  const project = await Projects.findByIdAndUpdate(id, { technology, description, start, end, link }, { new: true });

  if (!project) {
    return res.status(404).json(new ApiResponse(404, { message: "Project not found" }, "Project not found"));
  }

  return res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});

export { addProject, getProjects, addMoreImage, deleteProject, updateProject };
