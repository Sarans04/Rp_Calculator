const { ResultModel } = require("../models/userModel");

const getMarksByPID = async (req, res) => {
    // const { PID } = req.params;

    try {
        const resultData = await ResultModel.find({  });

        if (resultData) {
            res.status(200).json({
                msg: "Marks Retrieved",
                data: resultData,
            });
        } else {
            res.status(404).json({ msg: "PID not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error retrieving data from DB", error });
    }
};

const addMarks = async (req, res) => {
    const { PID, marks, markPerson } = req.body;

    if (!PID || marks === undefined || !["admin", "user"].includes(markPerson)) {
        return res.status(400).json({ msg: "PID, marks, and markPerson are required" });
    }

    try {
        const resultUpdate = {
            $setOnInsert: { PID },
            $set: markPerson === "admin" ? { AdminMark: marks } : { UserMark: marks },
        };

        const resultData = await ResultModel.findOneAndUpdate(
            { PID },
            resultUpdate,
            { upsert: true, new: true }
        );

        if (resultData.AdminMark !== undefined && resultData.UserMark !== undefined) {
            resultData.Total = (resultData.AdminMark*2) + resultData.UserMark;
            await resultData.save();
        }

        res.status(200).json({ msg: "Marks Added/Updated", data: resultData });
    } catch (error) {
        res.status(500).json({ msg: "Error adding data to DB", error });
    }
};

const deleteMarks = async (req, res) => {
    const { PID, markPerson } = req.body;

    if (!PID || !["admin", "user"].includes(markPerson)) {
        return res.status(400).json({ msg: "PID and markPerson are required" });
    }

    try {
        const resultData = await ResultModel.findOne({ PID });

        if (resultData) {
            if (markPerson === "admin") resultData.AdminMark = undefined;
            if (markPerson === "user") resultData.UserMark = undefined;

            resultData.Total =
                resultData.AdminMark !== undefined && resultData.UserMark !== undefined
                    ? resultData.AdminMark + resultData.UserMark
                    : undefined;

            if (resultData.AdminMark === undefined && resultData.UserMark === undefined) {
                await ResultModel.deleteOne({ PID });
                res.status(200).json({ msg: "Marks Deleted", data: null });
            } else {
                await resultData.save();
                res.status(200).json({ msg: "Marks Deleted", data: resultData });
            }
        } else {
            res.status(404).json({ msg: "PID not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error deleting data from DB", error });
    }
};

const updateMarks = async (req, res) => {
    const { PID, marks, markPerson } = req.body;

    if (!PID || marks === undefined || !["admin", "user"].includes(markPerson)) {
        return res.status(400).json({ msg: "PID, marks, and markPerson are required" });
    }

    try {
        const resultData = await ResultModel.findOne({ PID });

        if (resultData) {
            if (markPerson === "admin") resultData.AdminMark = marks;
            if (markPerson === "user") resultData.UserMark = marks;

            resultData.Total =
                resultData.AdminMark !== undefined && resultData.UserMark !== undefined
                    ? resultData.AdminMark + resultData.UserMark
                    : undefined;

            await resultData.save();

            res.status(200).json({ msg: "Marks Updated", data: resultData });
        } else {
            res.status(404).json({ msg: "PID not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error updating data in DB", error });
    }
};

const getAllMarks = async (req, res) => {
    try {
        const allResults = await ResultModel.find();

        if (allResults.length > 0) {
            res.status(200).json({
                msg: "All Marks Retrieved",
                data: allResults,
            });
        } else {
            res.status(404).json({ msg: "No marks data found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving all data from DB", error });
    }
};

module.exports = {
    addMarks,
    updateMarks,
    deleteMarks,
    getMarksByPID,
    getAllMarks,
};
