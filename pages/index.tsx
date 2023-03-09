import type { NextPage } from 'next'
import Link from 'next/link'
// import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Footer from '../components/Footer'


// https://supabase.com/docs/guides/auth/auth-helpers
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs

// https://nextjs.org/docs/api-reference/next/head
// https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript

const Index: NextPage = () => {

  const supabase = useSupabaseClient()

  // TODO: Create landing page to show off NYU Blind
  // Current has hardcoded template of what UI can look like,
  // still needs discussion
  return (
    <>
      <div className="d-flex p-3">
        <div className="container-fluid p-3">

          {/* https://getbootstrap.com/docs/5.0/components/navs-tabs/ */}
          <ul className="nav">
            <li className="nav-item pe-3">
              <h3>NYU Blind</h3>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link className="nav-link" href="#">Popular</Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link className="nav-link" href="#">Recent</Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link className="nav-link" href="#">Comments</Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link className="nav-link" href="#">Search</Link>
              </div>
            </li>
            <li className="nav-item ms-auto">
              <div className="nav-link">
                <Link className="nav-link" href="#">Log In</Link>
              </div>
            </li>
            <li className="nav-item ml-auto">
              <div className="nav-link">
                <Link href="#">Register</Link>
              </div>
            </li>
          </ul>

          {/* Content */}
          <div className="box mt-5">
            <div className="row my-3">
              <div className="col">
                <Link href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Link><br />
                <div id="description">by <Link href="#">admin</Link> 3 hours ago | 1 comment</div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <Link href="#">MIDTERM ANSWERS LEAKED LMAO</Link><br />
                <div id="description">by <Link href="#">cheater1</Link> 2 hours ago | 3000 comments</div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <Link href="#">How to Get Free Food at Jasper Kane</Link><br />
                <div id="description">by <Link href="#">user1</Link> 2 days ago | 0 comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
