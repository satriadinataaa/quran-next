import type { NextPage } from 'next';
import Header from '../components/Header'
import React, {ChangeEvent, FormEvent, useState,useEffect } from "react";
import styles from '../styles/Home.module.css';
import Link from 'next/link';
  
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
        <h1 className={styles['title-homepage']}>Welcome Bro</h1>
        
        {Waiting ? <p>Bentar</p> : <ul className={`${styles.container} ${styles.listmaster}`}>{ListSurah.map(surah => {
           let id = surah.number;
          return(
          
          <li key={id} className={`${styles.list} ${styles.child}`}>
            
            <Link href={`/surah/${id}?imamId=4`} >
              <a className={styles.link}><span className={styles.ayah}>{surah.asma.ar.long}</span> - ({surah.asma.en.long}) - ({surah.ayahCount} Ayat) </a>
             
            </Link>
          </li>
          )})}</ul>}
      
        
      </div>
    </>
  )
}
;

export default Home;
