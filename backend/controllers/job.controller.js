import { Job } from "../models/job.model.js";
// job post admin kar skta h
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;
    // console.log(title, description, requirements, salary, experienceLevel, location, jobType, position, companyId);
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel:experience,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({ message: "Job created", job, success: true });
  } catch (error) {
    console.log(error);
  }
}
// job get student kar skta h
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
}
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:"applications"
    });
    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res
      .status(200)
      .json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
}
//job create recuiter ya admin hi kar skata h

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
}