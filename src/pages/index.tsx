import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDiceFive } from "react-icons/fa"
import { useQuery } from 'react-query'
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { toast, ToastContainer } from 'react-toastify';
import { BiSolidErrorCircle } from "react-icons/bi"
const Column = () => {
  return <div className='h-4 w-2 bg-light-cyan rounded-full'>
  </div>
}
const Line = () => {
  return <div className='w-full h-[1px] bg-grayish-blue'>
  </div>
}
const fetchAdvice = async () => {
  const res = await axios.get("https://api.adviceslip.com/advice");
  return res.data;
}
const Home = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery("advice", fetchAdvice, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: data => data?.slip.advice
  })
  const [adviceNumber, setAdviceNumber] = useState(1)
  const [isOnline, setIsOnline] = useState(true);
  useEffect(()=>{
    setIsOnline(navigator.onLine)
  },[])
  useEffect(() => {
    const handleIsOnline = () => {
      setIsOnline(true)
      toast.success("Connected")
    }
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Disconnected")
    }
    window.addEventListener("online", handleIsOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleIsOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [isOnline])
  const handleOnClick = () => {
    if (isOnline) {
      refetch()
        .then(() => setAdviceNumber(adviceNumber + 1))
    }
  }
  const buttonStyle = `h-16
  w-16
  md:w-12
  md:h-12
  rounded-full
  absolute 
  bottom-[-1.5rem]
  flex
  justify-center
  items-center
  cursor-pointer
  custom-shadow`
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
          <SkeletonTheme baseColor="gray" highlightColor="#fff">
            {isFetching && isOnline ? <Skeleton width={200} height={10} enableAnimation={true} duration={1} /> : data}
          </SkeletonTheme>
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
        <button className={isOnline?buttonStyle+" bg-neon-green":buttonStyle+" bg-red-500"}
          onClick={handleOnClick}
          disabled={!isOnline}
        >
          <ClipLoader
            loading={(isLoading || isFetching) && isOnline}
            color={"#000"}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {(!isLoading && !isFetching) && isOnline &&
            <FaDiceFive className={`w-8 h-8 md:h-6 md:w-6`} />
          }
          {!isOnline && <BiSolidErrorCircle className={`w-8 h-8 md:h-6 md:w-6`} />}
        </button>
      </div>
    </div>
  )
}

export default Home