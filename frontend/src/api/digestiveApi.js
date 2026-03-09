import axios from 'axios'

const ML_API = axios.create({
  baseURL: import.meta.env.VITE_ML_API_URL || 'http://localhost:5000',
})

export async function predictDigestive(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)

  const { data } = await ML_API.post('/digestive/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}

<<<<<<< HEAD
export async function getDigestiveHealth() {
  const { data } = await ML_API.get('/digestive/health')
  return data
}

=======
>>>>>>> f5b0f955c37f01e3e1e99a616408332d157a8f64
