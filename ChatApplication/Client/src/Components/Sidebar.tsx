import { UserButton } from "@clerk/clerk-react"



const Sidebar = () => {
  return (
    <div className='h-screen w-16 max-w-32 bg-[#f37c49] flex items-end justify-center py-2 '>
      
      <UserButton  appearance={{
        elements:{
            avatarBox :{
                height:'3em',
                width:'3em',
                border:"2px solid white"
            }
        },
      }}/>
      
    </div>
  )
}

export default Sidebar
