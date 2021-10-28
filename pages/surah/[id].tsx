// @ts-nocheck

import Header from '../../components/Header'
import React, {ChangeEvent, FormEvent, useState,useEffect } from "react";
import styles from './DetailSurah.module.css'
import { useRouter } from "next/router"

export default function detail({postData,postDataImam}) {
 
  const [ListSurah, setListSurah] = useState<any[]>([])
  const [Waiting, setWaiting] = useState(true)
  const [idSurah, setidSurah] = useState("")
  const router = useRouter();
  const [selectedImam,setSelectedImam] = useState("");
  
  return (
    < >
        <Header />
        <div className={styles.p1}>
        <h3 className={styles.title}>{postData.asma.id.long} - {postData.asma.translation.id} - {postData.ayahCount} Ayat </h3>

        <h5 className={styles.tafsir}>{postData.tafsir.id}</h5>
        <audio className={styles.audioBar} src={postData.recitation.full} controls />
        <div className={styles.container}>
          <select  className={styles.child70} id="selectedImam" onChange={e => setSelectedImam(e.target.value)} >
          <option>Pilih Imam</option>
            {
              postDataImam.map(imam => {
                return(
                  <option value={imam.id}> {imam.name}</option>
                )
              })
            }
           
          </select>
          <button className={styles.child30} onClick={()=>{
          router.push(''+postData.number+'?imamId='+selectedImam)
          }}>Ganti Imam</button>
        </div>
        {postData.ayahs.map(ayat => {
          
          return(
            <div>
              <p className={styles.arab}>{ayat.text.ar}</p>
              <p className={styles.baca} >{ayat.number.insurah} . {ayat.text.read}</p>
            </div>
          )})}
          </div>
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
    const res =  await fetch('https://quran-endpoint.vercel.app/quran/'+query.id+'?imamId='+query.imamId);
    const posts = await res.json();
    const postData = posts.data;

    const resImam = await fetch('https://quran-endpoint.vercel.app/imam');
    const imams = await resImam.json();
    const postDataImam = imams.data;
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        postData,postDataImam
      },
    }
   
  }