import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandel.js";
import { Programing } from "../model/programing.model.js";

const addPrograming = AsyncHandler(async (req, res) => {
  const { language, start, end } = req.body;

  if (!language) {
    return res.status(400).json(new ApiResponse(400, { message: "Language is required" }, "Missing field"));
  }

  const programing = await Programing.create({ language, start, end });

  if (!programing) {
    return res.status(500).json(new ApiResponse(500, { message: "Failed to add programming entry" }, "Database error"));
  }

  return res.status(200).json(new ApiResponse(200, programing, "Programming entry added successfully"));
});

const getProgramings = AsyncHandler(async (req, res) => {
  const programings = await Programing.find();

  if (!programings || programings.length === 0) {
    return res.status(404).json(new ApiResponse(404, { message: "No programming entries found" }, "No data available"));
  }

  return res.status(200).json(new ApiResponse(200, programings, "Fetched successfully"));
});

const updatePrograming = AsyncHandler(async (req, res) => {
  const {id} = req.query
  const { language, start, end } = req.body;
  

  if (!id || !language) {
    return res.status(400).json(new ApiResponse(400, { message: "ID and Language are required" }, "Missing fields"));
  }

  const updatedPrograming = await Programing.findByIdAndUpdate(id, { language, start, end }, { new: true });

  if (!updatedPrograming) {
    return res.status(404).json(new ApiResponse(404, { message: "Programming entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, updatedPrograming, "Programming entry updated successfully"));
});

const deletePrograming = AsyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, { message: "ID is required" }, "Missing ID"));
  }

  const deletedPrograming = await Programing.findByIdAndDelete(id);

  if (!deletedPrograming) {
    return res.status(404).json(new ApiResponse(404, { message: "Programming entry not found" }, "Not found"));
  }

  return res.status(200).json(new ApiResponse(200, { message: "Programming entry deleted successfully" }, "Deleted successfully"));
});

export { addPrograming, getProgramings, updatePrograming, deletePrograming };
