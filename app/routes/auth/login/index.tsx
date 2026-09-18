import { IllustrationDashboardImage } from '~/assets/images'
import SelectLanguage from '~/components/common/select-language'
import ImageCustom from '~/components/customs/image-custom'
import LoginForm from '~/components/forms/login-form'

const LoginPage = () => {
  return (
    <section className='grid grid-cols-12'>
      <section className='col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-4 hidden sm:flex flex-col items-center justify-center gap-4 bg-gray-100'>
        <p className='text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px] bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text font-black tracking-[0.12em] text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
          SPECOM INC
        </p>
        <ImageCustom className='w-75 lg:w-90 xl:w-108' src={IllustrationDashboardImage} />
      </section>
      <section className='col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-8'>
        <section className='absolute top-5 right-5'>
          <SelectLanguage />
        </section>
        <LoginForm />
      </section>
    </section>
  )
}

export default LoginPage
