// @ts-nocheck

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from '../../components/Header';
import styles from './DetailSurah.module.css';

export default function detail({query}) {
 
 
  const [Waiting, setWaiting] = useState(true)
  const router = useRouter();
  const [selectedImam,setSelectedImam] = useState(4);
  const [option,setOption] = useState("");
  const [ayat,setAyat] = useState<any[]>([]);
  const [listimam,setImam] = useState<any[]>([]);
  let params = query;
  
  async function fetchData(query){
    
    const res =  await fetch('https://quran-endpoint.vercel.app/quran/'+query.id+'?imamId='+selectedImam);
   
    const posts = await res.json();
    setAyat(posts.data);
    // console.log(posts)
    const resImam = await fetch('https://quran-endpoint.vercel.app/imam');
    const imams = await resImam.json();
    setImam(imams.data);
    setWaiting(false);
  }
  
  useEffect(() => {
    setWaiting(true)
    fetchData(params)
    
  }, [selectedImam])
  // let bismillah = (postData.preBismillah) ? postData.preBismillah.text.ar : '';
  return (
    < >
        <Header />
        {Waiting ? <p>Mengumpulkan Data .... </p> :
          <div className={styles.p1}> 
          <h3 className={styles.title}>{ayat.asma.id.long} - {ayat.asma.translation.id} - {ayat.ayahCount} Ayat - {ayat.type.id} </h3>
  
          <h5 className={styles.tafsir}>{ayat.tafsir.id}</h5>
          <audio className={styles.audioBar} src={ayat.recitation.full} controls />
          <div className={styles.container}>
            <div className={styles.child70}>
              <select  className={` ${styles.select}`} id="selectedImam" onChange={e => setOption(e.target.value)} defaultValue={selectedImam} >
              <option >Pilih Imam</option>
                {
                  listimam.map(imam => {
  
                    return(
                      <option value={imam.id} key={imam.id}> {imam.name}</option>
                    )
                  })
                }
              
              </select>
            </div>
            <div className={styles.child30}>
              <button className={styles.button} onClick={()=>{
              setSelectedImam(option)
              router.push(''+ayat.number+'?imamId='+selectedImam)
              }}>Ganti Imam</button>
            </div>
          </div>
            <h2 className={`${styles.bismillah} my-5`}>{(ayat.preBismillah)? ayat.preBismillah.text.ar : ''}</h2>
            <div className="mt-20">
            {ayat.ayahs.map(ayat => {
              
              return(
                <div key={ayat.number.insurah}>
                  <p className={`${styles.arab} mt-10`}>{ayat.text.ar}</p>
                  <p className={`${styles.baca} mt-5 leading-loose`} >{ayat.number.insurah} . {ayat.text.read}</p>
                </div>
              )})}
            </div> 
          </div>
        }
       
    </>
     )
}

// export async function getStaticPaths() {
//   const res = await fetch('https://quran-endpoint.vercel.app/quran/')
//   const posts = await res.json()
  
//   // Get the paths we want to pre-render based on posts
//   const paths = posts.data.map((post : string)  => ({
//     params: { id: String(post.number) },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// export async function getStaticProps({params}) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const { query } = useRouter();
//   const res =  await fetch('https://quran-endpoint.vercel.app/quran/'+params.id);
//   const posts = await res.json()
//   const postData = posts.data;
//   console.log(query);
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       postData,
//     },
//   }
// }

export async function getServerSideProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const { query } = useRouter();
    let query = context.query;
    // const res =  await fetch('https://quran-endpoint.vercel.app/quran/'+query.id+'?imamId='+query.imamId);
    // const posts = await res.json();
    // const postData = posts.data;

    // const resImam = await fetch('https://quran-endpoint.vercel.app/imam');
    // const imams = await resImam.json();
    // const postDataImam = imams.data;
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        // postData,postDataImam
        query
      },
    }
   
  }