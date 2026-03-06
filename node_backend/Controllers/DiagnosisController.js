const Diagnosis = require('../Models/Diagnosis');



const getDiagnoses = async (req, res) => {
  try {
    const { patient, disease, status } = req.query;
    const query = {};

    if (patient) {
      query.patient = patient;
    }

    if (disease) {
      query.disease = disease;
    }

    if (status) {
      query.status = status;
    }

    const diagnoses = await Diagnosis.find(query)
      .populate('patient')
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json(diagnoses);
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    return res.status(500).json({ message: 'Error fetching diagnoses' });
  }
};



module.exports = {
getDiagnoses
};

