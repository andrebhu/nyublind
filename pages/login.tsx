import Head from 'next/head'
import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Footer from '../components/Footer'


const Login: NextPage = () => {

    const supabase = useSupabaseClient()

    // TODO: Update Home landing page to show off NYU Blind
    // Currently just displays supabase login/authenticator component
    return (
        <>
            <Head>
                <title>NYU Blind - For NYU by NYU</title>
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
            </Head>
            <div className="container p-5">
                <div className="row align-items-center">
                    <div className="justify-content-center">
                        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
