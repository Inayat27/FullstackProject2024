import { Routes, Route } from 'react-router-dom'
import RootLayout from './Routes/_root/RootLayout'
import { Home } from './Routes/_root/pages'
import AuthLayout from './Routes/_auth/AuthLayout'
import { Signin,Signup } from './Routes/_auth/forms'
import { MessageView } from './Components'
import MessageBay from './Components/MessageBay'






const App = () => {
  return (
    <main>
    <Routes>
      {/* public ROutes */}
      <Route  element={<AuthLayout />}>
        <Route index  element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>

      {/* private Routes */}
      <Route element={<RootLayout />}>
        <Route path='/chat' element={<Home />}>
        <Route path="/chat" element={<MessageBay/>} />
        <Route path="/chat/:id" element={<MessageView/>} />
        </Route>
      </Route>
    </Routes>
  </main>
  )
}

export default App
