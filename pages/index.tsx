// @ts-nocheck
import type { NextPage } from 'next';
import React, { useEffect, useState } from "react";
import DaftarSurah from '../components/DaftarSurah';
import Footer from '../components/Footer';
import Header from '../components/Header';
  
const Home: NextPage = () => {
  const [ListSurah, setListSurah] = useState<any[]>([])
  const [Waiting, setWaiting] = useState(true)
  async function fetchAPI(){
    const surah = await fetch("https://quran-endpoint.vercel.app/quran");
    const data = await surah.json();
    setListSurah(data.data)
    setWaiting(false);
   
  }
  useEffect(() => {
    fetchAPI();
    
  }, [])
  return(
    <>
      <Header />
     
      <div>
      <h1 className="px-7 my-5 font-bold text-blue-400 text-md md:text-3xl lg:text-3xl"  >Daftar Surah</h1>
        {Waiting ? <p>Mengumpulkan Data .... </p> : <DaftarSurah Surahs={ListSurah}/>}
      </div>
      <Footer/>
    </>
  )
}
;

export default Home;
