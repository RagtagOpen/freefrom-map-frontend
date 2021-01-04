import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SharedLayout from '../components/SharedLayout'
import UsMap from '../components/UsMap'

export default function Home() {
  return (
    <SharedLayout>
      <UsMap />
    </SharedLayout>
  )
}
