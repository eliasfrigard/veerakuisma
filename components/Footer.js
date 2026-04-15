const Footer = ({ pageName, author }) => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-primary-50 absolute w-full flex justify-center py-5 px-8 md:px-0">
      <div className="container grid grid-flow-row rounded md:px-32 tracking-wide leading-loose">
        <div className="text-center">
          <p className="text-sm opacity-60">
            Copyright {currentYear} © {pageName}
          </p>
          <p className="text-xs mt-2 opacity-60">Website by {author}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
