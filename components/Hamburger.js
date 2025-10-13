const Hamburger = ({ active, handleClick }) => {
  return (
    <div className='cursor-pointer' onClick={handleClick}>
      <div className={`burgerLine duration-300 ${active && 'transform rotate-45 translate-y-[4px]'}`}></div>
      <div className={`burgerLine duration-300 ${active && 'hidden'}`}></div>
      <div className={`burgerLine duration-300 ${active && 'transform -rotate-45 -translate-y-[5px]'}`}></div>
    </div>
  )
}

export default Hamburger
