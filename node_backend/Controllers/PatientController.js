const Patient = require('../Models/Patient');

const createPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      condition,
      status,
      lastVisit,
      nextAppointment,
      insuranceProvider,
      insurancePolicyNumber,
    } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      condition,
      status,
      lastVisit,
      nextAppointment,
      insuranceProvider,
      insurancePolicyNumber,
      createdBy: req.user?.id,
    });

    return res.status(201).json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    return res.status(500).json({ message: 'Error creating patient' });
  }
};

const getPatients = async (req, res) => {
  try {
    const { status, condition, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (condition) {
      query.condition = condition;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
      ];
    }

    const patients = await Patient.find(query).sort({ createdAt: -1 });
    return res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ message: 'Error fetching patients' });
  }
};

module.exports = {
  createPatient,
  //getPatients,
  //getPatientById,
  //updatePatient,
  //deletePatient,
  //getPatientsByCreatedUserId,
};

