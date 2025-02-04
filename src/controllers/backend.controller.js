import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandel.js";
import { Backend } from "../model/backend.model.js";
import { uploadImage } from "../utils/cloudinary.util.js";

const addBackend = AsyncHandler(async (req, res) => {
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

  const backendEntry = await Backend.create({ technology, description, image: imageUrl });

  if (!backendEntry) {
    return res.status(500).json(new ApiResponse(500, { message: "Failed to add backend entry" }, "Database error"));
  }

  return res.status(200).json(new ApiResponse(200, backendEntry, "Backend entry added successfully"));
});

const getBackends = AsyncHandler(async (req, res) => {
  const backends = await Backend.find();

  if (!backends || backends.length === 0) {
    return res.status(404).json(new ApiResponse(404, { message: "No backend entries found" }, "No data available"));
  }

  return res.status(200).json(new ApiResponse(200, backends, "Fetched successfully"));
});

const updateBackend = AsyncHandler(async (req, res) => {
  const { id, technology, description, image } = req.body;

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

  const updatedBackend = await Backend.findByIdAndUpdate(
    id,
    { technology, description, image: imageUrl || undefined },
    { new: true }
  );

  if (!updatedBackend) {
    return res.status(404).json(new ApiResponse(404, { message: "Backend entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, updatedBackend, "Backend entry updated successfully"));
});

const deleteBackend = AsyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, { message: "ID is required" }, "Missing ID"));
  }

  const deletedBackend = await Backend.findByIdAndDelete(id);

  if (!deletedBackend) {
    return res.status(404).json(new ApiResponse(404, { message: "Backend entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, {_id:deleteBackend._id, message: "Backend entry deleted successfully" }, "Deleted successfully"));
});

export { addBackend, getBackends, updateBackend, deleteBackend };
