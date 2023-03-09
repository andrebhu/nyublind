import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

// https://blog.logrocket.com/handling-bootstrap-integration-next-js/
// Potentially fix bootstrap path imports, but should be fine for now

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js")
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp