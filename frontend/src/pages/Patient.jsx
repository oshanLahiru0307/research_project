import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
import { fetchPatientsThunk, createPatientThunk, updatePatientThunk } from '../state/patientsSlice'

function Patient() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: patients, status, error } = useSelector((state) => state.patients)
  const [showAddForm, setShowAddForm] = useState(false)
  const [activePanel, setActivePanel] = useState('list') // list | edit
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  const selectedPatient = patients.find((p) => p?._id === selectedPatientId) || null
  const [editPatient, setEditPatient] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
=======
import { fetchPatientsThunk, createPatientThunk } from '../state/patientsSlice'

function Patient() {
  const dispatch = useDispatch()
  const { items: patients, status, error } = useSelector((state) => state.patients)
  const [showAddForm, setShowAddForm] = useState(false)
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    condition: '',
    status: 'Active',
    dateOfBirth: '',
    lastVisit: '',
    nextAppointment: '',
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPatientsThunk())
    }
  }, [dispatch, status])

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreatePatient = async (e) => {
    e.preventDefault()

    const payload = {
      firstName: newPatient.firstName,
      lastName: newPatient.lastName,
      email: newPatient.email || undefined,
      phone: newPatient.phone || undefined,
      condition: newPatient.condition || undefined,
      status: newPatient.status || undefined,
      dateOfBirth: newPatient.dateOfBirth || undefined,
      lastVisit: newPatient.lastVisit || undefined,
      nextAppointment: newPatient.nextAppointment || undefined,
    }

    const resultAction = await dispatch(createPatientThunk(payload))
    if (createPatientThunk.rejected.match(resultAction)) {
      // error is handled in slice; optionally show toast here
      return
    }

    setShowAddForm(false)
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      condition: '',
      status: 'Active',
      dateOfBirth: '',
      lastVisit: '',
      nextAppointment: '',
    })
  }

<<<<<<< HEAD
  const formatDate = (d) => {
    if (!d) return 'N/A'
    try {
      return new Date(d).toISOString().split('T')[0]
    } catch {
      return 'N/A'
    }
  }

  const openEdit = (patient) => {
    setShowAddForm(false)
    setSelectedPatientId(patient?._id || null)
    setEditPatient({
      firstName: patient?.firstName || '',
      lastName: patient?.lastName || '',
      email: patient?.email || '',
      phone: patient?.phone || '',
      condition: patient?.condition || '',
      status: patient?.status || 'Active',
      dateOfBirth: patient?.dateOfBirth ? formatDate(patient.dateOfBirth) : '',
      lastVisit: patient?.lastVisit ? formatDate(patient.lastVisit) : '',
      nextAppointment: patient?.nextAppointment ? formatDate(patient.nextAppointment) : '',
    })
    setActivePanel('edit')
  }

  const closePanel = () => {
    setActivePanel('list')
    setSelectedPatientId(null)
    setEditPatient(null)
  }

  const handleEditPatientChange = (e) => {
    const { name, value } = e.target
    setEditPatient((prev) => ({ ...(prev || {}), [name]: value }))
  }

  const handleUpdatePatient = async (e) => {
    e.preventDefault()
    if (!selectedPatientId || !editPatient) return

    const payload = {
      firstName: editPatient.firstName,
      lastName: editPatient.lastName,
      email: editPatient.email || undefined,
      phone: editPatient.phone || undefined,
      condition: editPatient.condition || undefined,
      status: editPatient.status || undefined,
      dateOfBirth: editPatient.dateOfBirth || undefined,
      lastVisit: editPatient.lastVisit || undefined,
      nextAppointment: editPatient.nextAppointment || undefined,
    }

    const resultAction = await dispatch(updatePatientThunk({ id: selectedPatientId, updates: payload }))
    if (updatePatientThunk.rejected.match(resultAction)) return

    setActivePanel('view')
  }

  const filteredPatients = patients.filter((p) => {
    const name = `${p?.firstName || ''} ${p?.lastName || ''}`.trim()
    const q = searchQuery.trim().toLowerCase()
    const matchesQuery =
      !q ||
      name.toLowerCase().includes(q) ||
      (p?.email || '').toLowerCase().includes(q) ||
      (p?.phone || '').toLowerCase().includes(q)

    const matchesCondition = conditionFilter === 'All' || (p?.condition || '') === conditionFilter
    const matchesStatus = statusFilter === 'All' || (p?.status || '') === statusFilter
    return matchesQuery && matchesCondition && matchesStatus
  })

=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">View and manage all patient records</p>
        </div>
        <button
<<<<<<< HEAD
          onClick={() => {
            closePanel()
            setShowAddForm((prev) => !prev)
          }}
=======
          onClick={() => setShowAddForm((prev) => !prev)}
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          + Add New Patient
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Patient</h2>
          <form onSubmit={handleCreatePatient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={newPatient.firstName}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={newPatient.lastName}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newPatient.email}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={newPatient.phone}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                name="condition"
                value={newPatient.condition}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select condition</option>
                <option value="Digestive">Digestive</option>
                <option value="Spinal">Spinal</option>
                <option value="Liver">Liver</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={newPatient.status}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Active">Active</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={newPatient.dateOfBirth}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
              <input
                type="date"
                name="lastVisit"
                value={newPatient.lastVisit}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
              <input
                type="date"
                name="nextAppointment"
                value={newPatient.nextAppointment}
                onChange={handleNewPatientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Patient
              </button>
            </div>
          </form>
        </div>
      )}

<<<<<<< HEAD
      {/* Patient Details / Edit Panels */}
      {activePanel !== 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Patient
              </h2>
              {selectedPatient && (
                <p className="text-gray-600 mt-1 text-sm">
                  {`${selectedPatient.firstName || ''} ${selectedPatient.lastName || ''}`.trim() || 'Unnamed Patient'}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closePanel}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to list
              </button>
            </div>
          </div>
          {editPatient && (
            <form onSubmit={handleUpdatePatient} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={editPatient.firstName}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={editPatient.lastName}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editPatient.email}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editPatient.phone}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  name="condition"
                  value={editPatient.condition}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select condition</option>
                  <option value="Digestive">Digestive</option>
                  <option value="Spinal">Spinal</option>
                  <option value="Liver">Liver</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editPatient.status}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editPatient.dateOfBirth}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                <input
                  type="date"
                  name="lastVisit"
                  value={editPatient.lastVisit}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
                <input
                  type="date"
                  name="nextAppointment"
                  value={editPatient.nextAppointment}
                  onChange={handleEditPatientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={closePanel}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      )}

=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
<<<<<<< HEAD
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
              placeholder="Search patients by name, email, or phone..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
<<<<<<< HEAD
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="All">All Conditions</option>
            <option value="Digestive">Digestive</option>
            <option value="Spinal">Spinal</option>
            <option value="Liver">Liver</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Critical">Critical</option>
=======
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Conditions</option>
            <option>Digestive</option>
            <option>Spinal</option>
            <option>Liver</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Monitoring</option>
            <option>Scheduled</option>
            <option>Critical</option>
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
          </select>
        </div>
      </div>

<<<<<<< HEAD
      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Name</th>
                <th className="text-left font-semibold px-5 py-3">Email</th>
                <th className="text-left font-semibold px-5 py-3">Phone</th>
                <th className="text-left font-semibold px-5 py-3">Condition</th>
                <th className="text-left font-semibold px-5 py-3">Status</th>
                <th className="text-left font-semibold px-5 py-3">Last Visit</th>
                <th className="text-left font-semibold px-5 py-3">Next Appt.</th>
                <th className="text-right font-semibold px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {status === 'loading' && patients.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-6 text-gray-500">
                    Loading patients...
                  </td>
                </tr>
              )}

              {status === 'succeeded' && filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-6 text-gray-500">
                    No patients found.
                  </td>
                </tr>
              )}

              {filteredPatients.map((patient) => {
                const name =
                  `${patient?.firstName || ''} ${patient?.lastName || ''}`.trim() || 'Unnamed Patient'

                return (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">{name}</td>
                    <td className="px-5 py-4 text-gray-700">{patient.email || '—'}</td>
                    <td className="px-5 py-4 text-gray-700">{patient.phone || '—'}</td>
                    <td className="px-5 py-4 text-gray-700">{patient.condition || '—'}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          patient.status === 'Active'
                            ? 'bg-blue-100 text-blue-800'
                            : patient.status === 'Monitoring'
                              ? 'bg-yellow-100 text-yellow-800'
                              : patient.status === 'Scheduled'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {patient.status || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{formatDate(patient.lastVisit)}</td>
                    <td className="px-5 py-4 text-gray-700">{formatDate(patient.nextAppointment)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/patient/${patient._id}`)}
                          className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(patient)}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
=======
      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {status === 'loading' && patients.length === 0 && (
          <p className="text-gray-500 text-sm">Loading patients...</p>
        )}
        {status === 'succeeded' && patients.length === 0 && (
          <p className="text-gray-500 text-sm">No patients found. Add a new patient to get started.</p>
        )}
        {patients.map((patient) => {
          const name = `${patient.firstName || ''} ${patient.lastName || ''}`.trim() || 'Unnamed Patient'
          const initials = name
            .split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .join('')
          const lastVisit = patient.lastVisit
            ? new Date(patient.lastVisit).toISOString().split('T')[0]
            : 'N/A'
          const nextAppointment = patient.nextAppointment
            ? new Date(patient.nextAppointment).toISOString().split('T')[0]
            : 'N/A'

          return (
          <div key={patient._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {initials || '?'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                  {patient.dateOfBirth && (
                    <p className="text-sm text-gray-500">
                      DOB: {new Date(patient.dateOfBirth).toISOString().split('T')[0]}
                    </p>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                patient.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                patient.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' :
                patient.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                'bg-red-100 text-red-800'
              }`}>
                {patient.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {patient.email || 'No email'}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {patient.phone || 'No phone'}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {patient.condition || 'No condition'}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Last Visit:</span>
                <span className="font-medium text-gray-900">{lastVisit}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Next Appointment:</span>
                <span className="font-medium text-blue-600">{nextAppointment}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )})}
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
      </div>
    </div>
  )
}

export default Patient

