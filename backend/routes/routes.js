const express = require('express');
const router = express.Router();
const { 
    addMarks, 
    updateMarks, 
    deleteMarks, 
    getMarksByPID, 
    getAllMarks 
} = require('../controls/control');

// Route to add marks
router.post('/marks', addMarks);

// Route to update marks
router.put('/marks', updateMarks);

// Route to delete marks
router.delete('/marks', deleteMarks);

// Route to get marks by PID
router.get('/get-marks', getMarksByPID);

// Route to get all marks
router.get('/marks', getAllMarks);

module.exports = router;
