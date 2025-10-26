import Problem from "../models/problemModel.js";

// GET problems with pagination
export const getProblems = async (req, res) => {
  try {
    let { page = 1, size = 20, searchTerm = "" } = req.query;
    page = parseInt(page);
    size = parseInt(size);

    let filter = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");

      // Check if searchTerm is a number
      const numSearch = Number(searchTerm);

      filter = {
        $or: [
          { title: regex },
          { pattern: regex },
          // only add numeric filter if it's actually a number
          // ...(isNaN(numSearch) ? [] : [{ leetCodeNo: numSearch }]),
        ],
      };
    }

    const total = await Problem.countDocuments(filter);
    const problems = await Problem.find(filter)
      .select("title createdAt leetCodeNo pattern _id")
      .skip((page - 1) * size)
      .limit(size)
      .sort({ createdAt: -1 });

    res.json({
      page,
      size,
      totalPages: Math.ceil(total / size),
      total,
      data: problems,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single problem by ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE problem
export const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE problem
export const updateProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // ensures all required fields are validated
    });
    if (!updated) return res.status(404).json({ error: "Problem not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE problem
export const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Problem not found" });
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};
