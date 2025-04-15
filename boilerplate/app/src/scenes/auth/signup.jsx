import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import LoadingButton from '../../components/loadingButton.jsx'

import store from '@/services/store'

import api from '../../services/api.js'

export default () => {
  const [values, setValues] = useState({ name: '', email: '', organisation_name: '', password: '' })

  const { user } = store()

  const { EP_Group_ensTrainNet3 } = require('../../utils/constants.js')

  const navigate = useNavigate()

  const send = async () => {
    try {
      const { user, token } = await api.post(`/user/signup`, values)
      if (token) api.setToken(token)
      if (user) setUser(user)
    } catch (e) {
      console.log('e', e)
      toast.error(e.code)
    }
  }

  if (user) navigate('/')

  return (
    // Auth Wrapper
    <div className='authWrapper'>
      <div className='text-center text-3xl font-semibold	mb-4'>Sign up</div>
      <div>
        <div className='mb-[25px]'>
          <div className='flex flex-col-reverse'>
            <input className='peer signInInputs' type='text' id='name' value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
            <label className='peer-focus:text-[#116eee]' htmlFor='name'>
              Name
            </label>
          </div>
        </div>
        <div className='mb-[25px]'>
          <div className='flex flex-col-reverse'>
            <input className='peer signInInputs ' name='email' type='email' id='email' value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} />
            <label className='peer-focus:text-[#116eee]' htmlFor='email'>
              E-mail address
            </label>
          </div>
        </div>
        <div className='mb-[25px]'>
          <div className='flex flex-col-reverse'>
            <select
              className='input'
              value={values.organisation_name || ''}
              onChange={e => {
                const selectedOption = EP_Group_ensTrainNet3.find(option => option.value === e.target.value)

                setValues({
                  ...values,
                  organisation_name: e.target.value,
                  organisation_email: selectedOption ? selectedOption.email : ''
                })
              }}
            >
              {EP_Group_ensTrainNet3.map(option => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            {/* <input className="peer signInInputs " name="email" type="email" id="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /> */}
            <label className='peer-focus:text-[#116eee]' htmlFor='email'>
              Intermediary organisation
            </label>
          </div>
        </div>
        <div className='mb-[25px]'>
          <div className='flex flex-col-reverse'>
            <input
              className='peer signInInputs'
              name='password'
              type='password'
              id='password'
              value={values.password}
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
            <label className='peer-focus:text-[#116eee]' htmlFor='password'>
              Password
            </label>
          </div>
        </div>
        {/* Forget Password */}
        <div className='text-right mb-[20px] mt-[-20px] text-[12px]'>
          <Link to='/auth/forgot'>Forgot password ?</Link>
        </div>
        {/* SignIn Button */}
        <LoadingButton
          className='font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] '
          onClick={send}
          color='primary'
        >
          Signup
        </LoadingButton>
      </div>
      <div className='mt-10 text-center text-sm'>
        Already have account ?{' '}
        <Link className='text-primary' to='/auth'>
          Signin
        </Link>
      </div>
    </div>
  )
}
