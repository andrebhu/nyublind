// This page is meant for the user to view their current account
// information and change things if necessary

import Head from 'next/head'
import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Footer from '../components/Footer'


const Profile: NextPage = () => {
    const session = useSession()
    // const supabase = useSupabaseClient()

    // Despite middleware check, the `useSession()` function can
    // return `null` which raises in error with the `Account` component 
    // so still requires a session check for TS is happy
    if (!session) {
        // TODO?: Return a react component that redirects
        return <></>
    }

    return (
        <>
            <Head>
                <title>NYU Blind</title>
            </Head>
            <h3>Account</h3>
            <Account session={session} />
            <Footer />
        </>
    )
}

export default Profile
