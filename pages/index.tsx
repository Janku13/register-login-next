import type { GetServerSideProps, NextPage } from 'next'
import useSwr from 'swr'
import fetcher from '../utils/fetcher'
import styles from '../styles/Home.module.css'
 

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  session: string;
  iat: number;
  exp: number;
}
const Home: NextPage = ({}) => {
  const { data,error } = useSwr<User>(`
      ${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/user
      `, fetcher)
  
  if (data) {
   return ( <div>
      <h2>Welcome! {data.name}</h2>
    </div>)
    }
  return (
    <div className={styles.container}>
      <h2>Please login</h2>
    </div>
   
  )
}

// export const getServerSideProps:GetServerSideProps = async (context)=> {
 
//   const data = await fetcher(`
//   ${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/user`,context.req.headers)
//   return {props:  {fallbackData:data}}
// }
export default Home
