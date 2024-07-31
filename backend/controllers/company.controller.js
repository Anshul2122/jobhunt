import { Company } from "./../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    // console.log(companyName);
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "company name is required", success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(404)
        .json({ message: "compnay name already exists", success: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "registration error", success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);
    const companies = await Company.find({ userId });
    // console.log(userId, companies);
    if (!companies) {
      return res
        .status(404)
        .json({ message: "companies not found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error getting company", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    // console.log(company, companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "something  went wrong", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    // console.log(company, name, description, website, location);

    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }

    return res.status(200).json({ message: "company updated", success: true });
  } catch (error) {
    console.log(error);
  }
};
