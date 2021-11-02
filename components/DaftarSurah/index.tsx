// @ts-nocheck
import React from 'react'
import styles from './Home.module.css';
import Link from 'next/link';
export default function DaftarSurah({Surahs}) {
  return (
    <ul className={` ${styles.listmaster}  bg-green-50 rounded-3xl p-5 grid grid-flow-row grid-cols-1  grid-rows-3 gap-4 md:grid-cols-2 lg:grid-cols-3` }>{Surahs.map(surah => {
      let id = surah.number;
     return(
    
       <li key={id} className={`${styles.list } px-5 md:py-2 text-center md:text-left   hover:text-blue-800 `}>
         
         <Link href={`/surah/${id}?imamId=4`} >
           <a className={`${styles.link} `}><span className={styles.ayah}>{surah.asma.ar.long}</span> - ({surah.asma.en.long}) - ({surah.ayahCount} Ayat) </a>
         
         </Link>
       </li>
    
     )})}</ul>
  )
}
