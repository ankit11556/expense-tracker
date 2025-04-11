import AppRoutes from './routes/AppRoute'
import './App.css'
import { AuthProvider } from './context/AuthContext'
function App() {
  
  return (
    <>
    <AuthProvider>
      <AppRoutes></AppRoutes>
      </AuthProvider>
    </>
  )
}

export default App
