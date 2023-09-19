import Navigation from '../header.js'

export default function Layout({ children }) {
  return (
    <div>
      <Navigation></Navigation>
      <main className='bg-[#F2EEEB]'>{children}</main>
    </div>
  )
}
