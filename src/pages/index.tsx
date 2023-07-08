import axios from 'axios'
import React, { useState } from 'react'
import { FaDiceFive } from "react-icons/fa"
import { useQuery } from 'react-query'
import ClipLoader from "react-spinners/ClipLoader";
const Column = () => {
  return <div className='h-4 w-2 bg-light-cyan rounded-full'>
  </div>
}
const Line = () => {
  return <div className='w-full h-[1px] bg-grayish-blue'>
  </div>
}
const fetchAdvice = async () => {
  const { data } = await axios.get("https://api.adviceslip.com/advice");
  return data;
}
const Home = () => {
  const { data, isLoading, isError, isFetching,refetch } = useQuery("advice", fetchAdvice, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select:data=>data?.slip.advice
  })
  const [adviceNumber, setAdviceNumber] = useState(1)
  const handleOnClick = () => {
    refetch()
    .then(() => setAdviceNumber(adviceNumber + 1))
  }
  return (
    <div className={`
    flex
    flex-col
    gap-16
    justify-center
    items-center
    w-full
    h-screen
    px-6
    bg-dark-blue
    `}>
     
      <div className={`
      flex
      flex-col
      items-center
      gap-8
      w-full
      md:w-[550px]
      bg-dark-grayish-blue
      rounded-xl
      py-10
      px-10
      relative
      `}>
        <h1 className={`
        text-xs
        text-neon-green
        tracking-[0.3rem]
        uppercase
        `}
        >
          Advice #{adviceNumber}
        </h1>
        <q className={`
        font-extrabold
        text-light-cyan
        text-2xl
        text-center
        `}
        >
          <ClipLoader 
          loading={isLoading||isFetching}
          color={"#fff"}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
          {(!isFetching &&!isLoading) && data}
        </q>
        <div className={`
        flex
        w-full
        items-center
        gap-2
        mb-8
        `}>
          <Line />
          <Column />
          <Column />
          <Line />
        </div>
        <div className='
        h-16
        w-16
        md:w-12
        md:h-12
        rounded-full
      bg-neon-green 
        absolute 
        bottom-[-1.5rem]
        flex
        justify-center
        items-center
        cursor-pointer
        custom-shadow
        '
          onClick={handleOnClick}
        >
          <FaDiceFive className='w-8 h-8 md:h-6 md:w-6' />
        </div>
      </div>
    </div>
  )
}

export default Home