import { Outlet } from 'react-router-dom'
import { AllChats, Sidebar } from '../../../Components'



function Home() {
  return (
    <main className="flex h-screen">
    {/* Sidebar with max-width of 32em */}
      <Sidebar />
  
    {/* Main content area with grid layout */}
    <div className="flex-grow grid grid-cols-[30%_1fr]">
      <div className="border border-gray-300">
        <AllChats/>
      </div>
      <div className="">
        {/* <MessageBay/> */}
        <Outlet/>
      </div>
    </div>
  </main>
  )
}

export default Home