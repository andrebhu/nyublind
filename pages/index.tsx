import Head from 'next/head'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Footer from '../components/Footer'

// https://supabase.com/docs/guides/auth/auth-helpers
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs

// https://nextjs.org/docs/api-reference/next/head
// https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript

const Index: NextPage = () => {

  const supabase = useSupabaseClient()

  // TODO: Create landing page to show off NYU Blind
  return (
    <>
      <Head>
        <title>NYU Blind - For NYU by NYU</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <div className="container p-5">
        <div className="row align-items-center">
          <div className="justify-content-center">
            <h1>NYU Blind</h1>
            <ul>
              <li>
                <Link href="/login">Log In</Link>
              </li>
              <li>
                <Link href="/">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Index
