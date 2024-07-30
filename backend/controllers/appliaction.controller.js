import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    //check if the user already has a applied for job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "User has already applied for this job",
        success: false,
      });
    }
    // check if job does not exist anymore
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "post job failed" });
  }
};

// fetch the applied jobs by user

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "companyId",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "get applied jobs failed", success: false });
  }
};

// admin ko dhekga ki kitne application aaye h
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application fetched successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "get application failed", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application: application,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "get application failed", success: false });
  }
};
