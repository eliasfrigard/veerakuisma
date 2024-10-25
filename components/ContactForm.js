import React from 'react'
import axios from 'axios'

export default function ContactForm({ className }) {
  const messageRef = React.useRef(null)
  const emailRef = React.useRef(null)
  const nameRef = React.useRef(null)
  const phoneRef = React.useRef(null)
  const addressRef = React.useRef(null)

  const [formIsValid, setFormIsValid] = React.useState(true)
  const [emailIsValid, setEmailValid] = React.useState(true)
  const [nameIsValid, setNameIsValid] = React.useState(true)
  const [phoneIsValid, setPhoneIsValid] = React.useState(true)
  const [messageIsValid, setMessageIsValid] = React.useState(true)
  const [addressIsValid, setAddressIsValid] = React.useState(true)

  const [formSuccess, setFormSuccess] = React.useState(null)

  const validateEmail = (email) => {
    const value = email.toString()
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    setEmailValid(value.match(regex))
  }

  const validatePhone = (phone) => {
    const value = phone.toString()
    setPhoneIsValid(value.length < 25)
  }

  const validateAddress = (address) => {
    const value = address.toString()
    setAddressIsValid(value.length < 300)
  }

  const validateName = (name) => {
    const value = name.toString()
    setNameIsValid(value.length < 124 && value.length > 0)
  }

  const validateMessage = (message) => {
    const value = message.toString()
    setMessageIsValid(value.length < 4000 && value.length > 0)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormSuccess(null)

    const message = messageRef.current.value
    const email = emailRef.current.value
    const name = nameRef.current.value
    const phone = phoneRef.current.value
    const address = addressRef.current.value

    validateMessage(message)
    validateEmail(email)
    validateName(name)
    validatePhone(phone)
    validateAddress(address)

    if (
      !nameIsValid ||
      !emailIsValid ||
      !phoneIsValid ||
      !messageIsValid ||
      !addressIsValid ||
      message.length <= 0 ||
      email.length <= 0 ||
      name.length <= 0
    ) {
      setFormIsValid(false)
      return
    } else {
      setFormIsValid(true)
    }

    const formData = {
      message,
      email,
      phone,
      name,
      address,
    }

    try {
      await axios.post('/api/sendEmail', formData)

      setFormSuccess(true)

      messageRef.current.value = ''
      emailRef.current.value = ''
      nameRef.current.value = ''
      phoneRef.current.value = ''
    } catch (error) {
      setFormSuccess(false)
    }
  }

  return (
    <>
      <div className={`centerContent flex-col contactForm ${className}`}>
        <div className='flex-col mt-2 md:mt-0 container max-w-4xl roundedShadow h-full'>
          <form className='w-full'>
            <div className='flex flex-wrap -mx-3 md:mb-2'>
              <div className='w-full px-3 mb-2 md:mb-0'>
                <label className='formLabel text-xs md:text-base font-khorla tracking-wider' htmlFor='grid-first-name'>
                  Full Name *
                </label>
                <input
                  required
                  ref={nameRef}
                  className={`font-khorla tracking-wider appearance-none block w-full  p-4 mb-3 leading-tight rounded shadow focus:bg-accent-500 focus:text-primary-50 focus:shadow-xl focus:rounded-lg duration-150 selection:bg-primary-50 selection:text-accent-500 outline-none placeholder:text-primary-950 focus:placeholder:text-primary-100 placeholder:opacity-70`}
                  id='grid-first-name'
                  type='text'
                  placeholder='What is your name?'
                  onChange={(event) => validateName(event.target.value)}
                />
                {!nameIsValid && (
                  <p className='font-khorla tracking-wide text-accent-500 ml-1 mb-1 text-xs font-medium'>Name is not valid.</p>
                )}
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 md:mb-2'>
              <div className='w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                <label className='formLabel text-xs md:text-base font-khorla tracking-wider' htmlFor='grid-first-name'>
                  Email Address *
                </label>
                <input
                  required
                  ref={emailRef}
                  className={`font-khorla outline-none tracking-wider appearance-none block w-full p-4 mb-3 leading-tight rounded shadow focus:bg-accent-500 focus:text-primary-50 focus:shadow-xl focus:rounded-lg duration-150 selection:bg-primary-50 selection:text-accent-500 placeholder:text-primary-950 focus:placeholder:text-primary-100 placeholder:opacity-70`}
                  id='grid-first-name'
                  type='text'
                  placeholder='What is your email?'
                  onBlur={(event) => validateEmail(event.target.value)}
                />
                {!emailIsValid && (
                  <p className='font-khorla text-accent-500 tracking-wide ml-1 text-xs font-medium'>Please fill out your email address.</p>
                )}
              </div>
              <div className='w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                <label className='formLabel text-xs md:text-base font-khorla tracking-wider' htmlFor='grid-first-name'>
                  Phone Number
                </label>
                <input
                  ref={phoneRef}
                  className={`font-khorla tracking-wider appearance-none block w-full p-4 mb-3 leading-tight focus:outline-none rounded shadow focus:bg-accent-500 focus:text-primary-50 focus:shadow-xl focus:rounded-lg duration-150 selection:bg-primary-50 selection:text-accent-500 placeholder:text-primary-950 focus:placeholder:text-primary-100 placeholder:opacity-70`}
                  id='grid-first-name'
                  type='text'
                  placeholder='What is your number?'
                  onChange={(event) => validatePhone(event.target.value)}
                />
                {!phoneIsValid && (
                  <p className='font-khorla text-accent-500 tracking-wide ml-1 text-xs font-medium'>
                    Phone number cannot be more than 25 characters.
                  </p>
                )}
              </div>
              <div className='hidden w-full md:w-1/2 px-3 mb-2 md:mb-0'>
                <label className='formLabel text-xs md:text-base font-khorla tracking-wider' htmlFor='grid-first-name'>
                  Address
                </label>
                <input
                  required
                  ref={addressRef}
                  className={`font-khorla focus:text-accent-500 tracking-wider appearance-none block w-full rounded p-4 mb-3 leading-tight focus:outline-none focus:bg-primary-100 placeholder:text-primary-950 focus:placeholder:text-primary-100 placeholder:opacity-70'
                    }`}
                  id='grid-first-name'
                  type='text'
                  placeholder='So we can call you back!'
                  onChange={(event) => validateAddress(event.target.value)}
                />
                {!addressIsValid && (
                  <p className='font-khorla tracking-wide text-accent-500 ml-1 text-xs font-medium'>Address cannot be outside Europe.</p>
                )}
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full px-3 mb-2 md:mb-0'>
                <label className='formLabel text-xs md:text-base font-khorla tracking-wider' htmlFor='grid-first-name'>
                  Message *
                </label>
                <textarea
                  required
                  ref={messageRef}
                  rows='8'
                  className={`font-khorla tracking-wider resize-none md:resize-y appearance-none block w-full p-4 mb-3 leading-relaxed rounded shadow focus:bg-accent-500 focus:text-primary-50 focus:shadow-xl focus:rounded-lg duration-150 selection:bg-primary-50 selection:text-accent-500 outline-none placeholder:text-primary-950 focus:placeholder:text-primary-100 placeholder:opacity-70`}
                  id='grid-first-name'
                  type='text'
                  placeholder='What is on your mind?'
                  onChange={(event) => validateMessage(event.target.value)}
                />
                {!messageIsValid && (
                  <p className='font-khorla tracking-wide text-accent-500 ml-1 text-xs font-medium'>
                    Message cannot be empty or exceed 4000 characters.
                  </p>
                )}
              </div>
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className='roundedShadow w-full h-14 md:mt-2 bg-accent-500 text-primary-100 hover:bg-accent-500 font-bold tracking-wider uppercase duration-150 active:scale-[0.98] select-none font-khorla'
          >
            Send message
          </button>
          <div className='font-khorla tracking-wide flex justify-center items-center'>
            {!formIsValid && (
              <p className='text-accent-500 pt-4 ml-1 text-[14px] tracking-wider font-medium'>
                Please fill out all the required fields!
              </p>
            )}
            {formSuccess !== null &&
              (!formSuccess ? (
                <p className='text-accent-500 pt-4 ml-1 text-[14px] tracking-wider font-medium'>
                  The message could not be sent, please try again later!
                </p>
              ) : (
                <p className='text-green-800 pt-4 ml-1 text-[14px] tracking-wider font-medium'>
                  Your message has been successfully sent!
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
