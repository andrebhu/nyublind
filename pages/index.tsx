import type { NextPage } from 'next'
import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Footer from '../components/Footer'

// https://supabase.com/docs/guides/auth/auth-helpers
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs

// https://nextjs.org/docs/api-reference/next/head
// https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript

const Index: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  // TODO: Update Home landing page to show off NYU Blind
  if (!session) {
    return (
      <>
        <Head>
          <title>NYU Blind - For NYU by NYU</title>
        </Head>
        <div className="container p-5">
          <div className="row align-items-center">
            <div className="justify-content-center">
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
            </div></div>
        </div>

        {/* <div className="row">
          <div className="col-6">
            <h1 className="header">NYU Blind</h1>
            <p className="">
              A social media platform built for NYU students by NYU students
            </p>
          </div>
          <div className="col-6 auth-widget">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          </div>
        </div> */}
      </>
    )
  }

  // TODO: Redirect to `/home` or something?
  return (
    <>
      <h3>Account</h3>
      <Account session={session} />
      <Footer />
    </>
  )
}

export default Index
