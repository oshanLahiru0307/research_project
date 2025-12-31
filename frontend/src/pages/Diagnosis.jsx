import { Routes, Route, Link } from 'react-router-dom'
import DiabeticRetinopathy from './diagnosis/DiabeticRetinopathy'
import Glaucoma from './diagnosis/Glaucoma'
import Cataract from './diagnosis/Cataract'
import AMD from './diagnosis/AMD'

function Diagnosis() {
  return (
    <Routes>
      <Route path="/diabetic-retinopathy" element={<DiabeticRetinopathy />} />
      <Route path="/glaucoma" element={<Glaucoma />} />
      <Route path="/cataract" element={<Cataract />} />
      <Route path="/amd" element={<AMD />} />
      <Route path="/" element={<DiagnosisOverview />} />
    </Routes>
  )
}

function DiagnosisOverview() {
  const diseases = [
    {
      name: 'Diabetic Retinopathy',
      path: '/diagnosis/diabetic-retinopathy',
      description: 'Diabetes-related eye condition affecting the retina',
      count: 45,
      severity: 'moderate',
      icon: '🩺',
    },
    {
      name: 'Glaucoma',
      path: '/diagnosis/glaucoma',
      description: 'Increased pressure in the eye damaging the optic nerve',
      count: 32,
      severity: 'high',
      icon: '👁️',
    },
    {
      name: 'Cataract',
      path: '/diagnosis/cataract',
      description: 'Clouding of the eye\'s natural lens',
      count: 67,
      severity: 'low',
      icon: '🔍',
    },
    {
      name: 'Age-related Macular Degeneration',
      path: '/diagnosis/amd',
      description: 'Deterioration of the central portion of the retina',
      count: 28,
      severity: 'moderate',
      icon: '👁️‍🗨️',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Disease Diagnosis & Monitoring</h1>
        <p className="text-gray-600 mt-1">Monitor and manage patient diagnoses across different eye conditions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diseases.map((disease) => (
          <Link
            key={disease.name}
            to={disease.path}
            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{disease.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{disease.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{disease.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Cases</p>
                    <p className="text-2xl font-bold text-gray-900">{disease.count}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    disease.severity === 'low' ? 'bg-green-100 text-green-800' :
                    disease.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Diagnosis

