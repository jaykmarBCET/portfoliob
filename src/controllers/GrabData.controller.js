import { Backend } from '../model/backend.model.js';
import { Frontend } from '../model/frontend.model.js';
import { Programing } from '../model/programing.model.js';
import { Projects } from '../model/project.model.js';
import { Skills } from '../model/skills.model.js';
import { AsyncHandler } from '../utils/AsyncHandel.js';
import  ApiResponse  from '../utils/ApiResponse.js';

const fetchData = (model) => AsyncHandler(async (req, res) => {
    const data = await model.find();
    return res.status(200).json(new ApiResponse(200, data, "fetched successfully"));
});

const getBackend = fetchData(Backend);
const getFronted = fetchData(Frontend);
const getPrograming = fetchData(Programing);
const getProject = fetchData(Projects);
const getSkill = fetchData(Skills);

export { getFronted, getBackend, getPrograming, getProject, getSkill };
