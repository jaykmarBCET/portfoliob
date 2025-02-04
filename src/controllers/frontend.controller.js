import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandel.js";
import { Frontend } from "../model/frontend.model.js";
import { uploadImage } from "../utils/cloudinary.util.js";

const addFrontend = AsyncHandler(async (req, res) => {
  const { technology, description, image } = req.body;

  if (!technology || !description) {
    return res.status(400).json(new ApiResponse(400, { message: "Technology and description are required" }, "Missing fields"));
  }

  let imageUrl = "";
  if (image) {
    const upload = await uploadImage(image);
    if (!upload) {
      return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload failed"));
    }
    imageUrl = upload.url;
  }

  const frontendEntry = await Frontend.create({ technology, description, image: imageUrl });

  if (!frontendEntry) {
    return res.status(500).json(new ApiResponse(500, { message: "Failed to add frontend entry" }, "Database error"));
  }

  return res.status(200).json(new ApiResponse(200, frontendEntry, "Frontend entry added successfully"));
});

const getFrontends = AsyncHandler(async (req, res) => {
  const frontends = await Frontend.find();

  if (!frontends || frontends.length === 0) {
    return res.status(404).json(new ApiResponse(404, { message: "No frontend entries found" }, "No data available"));
  }

  return res.status(200).json(new ApiResponse(200, frontends, "Fetched successfully"));
});

const updateFrontend = AsyncHandler(async (req, res) => {
  const {id} = req.query
  const { technology, description, image } = req.body;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, { message: "ID is required" }, "Missing ID"));
  }

  let imageUrl = "";
  if (image) {
    const upload = await uploadImage(image);
    if (!upload) {
      return res.status(500).json(new ApiResponse(500, { message: "Image upload failed" }, "Upload failed"));
    }
    imageUrl = upload.url;
  }

  const updatedFrontend = await Frontend.findByIdAndUpdate(
    id,
    { technology, description, image: imageUrl || undefined },
    { new: true }
  );

  if (!updatedFrontend) {
    return res.status(404).json(new ApiResponse(404, { message: "Frontend entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, updatedFrontend, "Frontend entry updated successfully"));
});

const deleteFrontend = AsyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, { message: "ID is required" }, "Missing ID"));
  }

  const deletedFrontend = await Frontend.findByIdAndDelete(id);

  if (!deletedFrontend) {
    return res.status(404).json(new ApiResponse(404, { message: "Frontend entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, { message: "Frontend entry deleted successfully" }, "Deleted successfully"));
});

export { addFrontend, getFrontends, updateFrontend, deleteFrontend };
