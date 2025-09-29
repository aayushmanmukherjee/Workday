import { GithubIcon} from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='py-5 flex flex-col justify-center items-center'>
      <p className='font-extrabold'>developed by Aayushman Mukherjee</p>
      <Link to={'https://github.com/aayushmanmukherjee'}><p className='flex gap-1 text-sm cursor-pointer underline'>GitHub <GithubIcon size={20}/></p></Link>
    </div>
  )
}

export default Footer
