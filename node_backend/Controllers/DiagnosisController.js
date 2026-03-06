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

const deleteDiagnosis = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findByIdAndDelete(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }

    return res.status(200).json({ message: 'Diagnosis deleted successfully' });
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    return res.status(500).json({ message: 'Error deleting diagnosis' });
  }
};

const updateDiagnosis = async (req, res) => {
  try {
    const updates = req.body;

    const diagnosis = await Diagnosis.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }

    return res.status(200).json(diagnosis);
  } catch (error) {
    console.error('Error updating diagnosis:', error);
    return res.status(500).json({ message: 'Error updating diagnosis' });
  }
};

const getDiagnosisById = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id)
      .populate('patient')
      .populate('createdBy', 'name email role');

    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found' });
    }

    return res.status(200).json(diagnosis);
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    return res.status(500).json({ message: 'Error fetching diagnosis' });
  }
};



module.exports = {
getDiagnoses,
deleteDiagnosis,
updateDiagnosis,
getDiagnosisById,
};

