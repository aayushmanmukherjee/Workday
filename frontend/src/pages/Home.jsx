import { Cross, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Footer from '../components/Footer'

const Home = () => {

    const {setToken,token, axios} = useAppContext()
    const [passkey, setPasskey] = useState("")
    const [date, setDate] = useState("")
    const [workdays, setWorkdays] = useState([])
    const [task, setTask] = useState(false)
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()

    const handleTask = () =>{
        if(!token) {
            return
        }
        setTask(!task)
    }
    const handleLogin = () =>{
        if(token) {
            setToken("")
            localStorage.removeItem("token");
        } else {
        setLogin(!login)
        }
    }
    const createTask = async(e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const {data} = await axios.post('/api/workday/create',{
                date
            })
            if(data.success) {
                setTask(!task)
                setDate("")
                fetchWorkdays()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const fetchWorkdays = async() => {
        try {
            const token = localStorage.getItem("token")
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            const {data} = await axios.get('/api/workday/show')
            if(data.success) {
                setWorkdays(data.workdays)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const log = async(e) => {
        try {
            e.preventDefault()
            setLogin(!login)
        const {data} = await axios.post('/api/user/login',{
            passkey
        })
        if(data.success) {
            setToken(data.token)
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = data.token;
            setPasskey("")
        }
        } catch (error) {
            console.log(error.message)
        }
    }
    const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
useEffect(()=>{
    fetchWorkdays()
},[])
    
  return (
    <div className='relative'>
      <h1 onClick={()=>navigate('/')} className='text-5xl max-sm:text-2xl font-extrabold p-5 cursor-pointer'>workday</h1>
    <div className='flex justify-center items-center gap-5 p-5 border-b'>
        <button onClick={handleTask} className='rounded-4xl p-3 max-sm:p-1 border-2 cursor-pointer hover:bg-gray-100 transition-all duration-200'>create a workday</button>
        <button onClick={handleLogin} className='rounded-4xl p-3 max-sm:p-1 border-2 cursor-pointer hover:bg-gray-100 transition-all duration-200'>{token ? "logout" : "login"}</button>
    </div>
    {task && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 z-50'>
            <div className='rounded-4xl shadow w-3/5 max-w-[600px] bg-white flex flex-col gap-2 pt-5 px-5 relative'>
            <div className='flex justify-between items-center border-b'>
                <h3></h3>
                <button onClick={handleTask} className='cursor-pointer'><X size={20} /></button>
            </div>
            <form onSubmit={createTask}>
                <div className='flex flex-col p-2 gap-2'>
                    <h4 className='font-bold'>date</h4>
                    <input type="text" className='rounded-4xl border p-2 max-sm:p-1 max-sm:text-sm' placeholder='month(00)/day(00)' value={date} onChange={(e)=>setDate(e.target.value)}/>
                    <button type='submit' className='rounded-4xl p-3 border-2 cursor-pointer hover:bg-gray-100 transition-all duration-200'>submit workday</button>
                </div>
            </form>
            </div>
        </div>
    )
    }
     {login && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 z-50'>
            <div className='rounded-4xl shadow w-3/5 max-w-[600px] bg-white flex flex-col gap-2 pt-5 px-5 relative'>
            <div className='flex justify-between items-center border-b'>
                <h3></h3>
                <button onClick={handleLogin} className='cursor-pointer'><X size={20} /></button>
            </div>
            <form onSubmit={log}>
                <div className='flex flex-col p-2 gap-2'>
                    <input type="text" className='rounded-4xl border p-2' placeholder='enter passkey' value={passkey} onChange={(e)=>setPasskey(e.target.value)}/>
                    <button type='submit' className='rounded-4xl p-3 border-2 cursor-pointer hover:bg-gray-100 transition-all duration-200'>login</button>
                </div>
            </form>
            </div>
        </div>
    )
    }
    {token ? (
    <div className='flex flex-col p-5 gap-2'>
  {Object.entries(
    workdays.reduce((acc, wd) => {
      const [monthNum, day] = wd.date.split("/"); // "MM/DD"
      const monthName = monthNames[parseInt(monthNum, 10) - 1]; // convert 08 -> August
      if (!acc[monthName]) acc[monthName] = [];
      acc[monthName].push({ id: wd._id, day });
      return acc;
    }, {})
  ).map(([month, days]) => (
    <div key={month} className='flex flex-col gap-1'>
      <h4 className='text-2xl max-sm:text-xl font-bold underline'>{month}</h4>
      <div className='flex items-center flex-wrap p-2 border rounded-4xl gap-2'>
        {days.map((d) => (
          <button
            key={d.id}
            onClick={() => navigate(`/day/${d.id}`)}
            className='rounded-4xl border p-2 max-sm:p-1 max-sm:text-sm hover:bg-gray-100 transition-all duration-200 cursor-pointer'
          >
            {d.day}
          </button>
        ))}
      </div>
    </div>
  ))}
</div>
    ):
    (
        <div className='flex justify-center items-center'>
            <h2 className='text-4xl font-bold'>please login</h2>
        </div>
    )}
    <div className='fixed bottom-0 w-full'>
    <Footer/>
    </div>
    </div>
  )
}

export default Home
