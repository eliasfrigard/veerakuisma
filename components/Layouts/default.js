import Navigation from '../header.js'

export default function Layout({ children }) {
  return (
    <div>
      {/* <Navigation></Navigation> */}
      <main className='bg-matcha-200'>{children}</main>
    </div>
  )
}
