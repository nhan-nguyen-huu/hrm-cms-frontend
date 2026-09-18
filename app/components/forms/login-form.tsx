import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { EmployeeIcon } from '~/assets/svgs'
import FormField from '~/components/forms/form-field'
import FormPasswordField from '~/components/forms/form-password-field'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import cookieHelper from '~/helpers/cookie.helper'
import { formHelper } from '~/helpers/form.helper'
import { type LoginFormSchema, getLoginSchema } from '~/helpers/schema.helper'
import useMutationApi from '~/hooks/use-mutation-api'
import { AuthService } from '~/services/auth.service'
import { ROUTES } from '~/shared/constants/routes.constant'
import { ELoginFormKey } from '~/shared/enums/form.enum'

const LoginForm = () => {
  const { t } = useTranslation()
  const navi = useNavigate()

  // Form
  const formSchema = getLoginSchema()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formHelper.getDefaultValuesLogin(),
    mode: 'all'
  })
  const username = form.watch(ELoginFormKey.Username)
  const password = form.watch(ELoginFormKey.Password)

  // Login action
  const loginMutation = useMutationApi({
    mutationFn: AuthService.Login,
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken
      const refreshToken = res?.data?.refreshToken
      if (accessToken && refreshToken) {
        cookieHelper.setAccessToken(accessToken)
        cookieHelper.setRefreshToken(refreshToken)
        toast.success(t('msg.loginSuccess'))
        navi(`/${ROUTES.DASHBOARD.BASE}`)
      }
    }
  })

  const onSubmit = (data: LoginFormSchema) => {
    loginMutation.mutate(data)
  }

  return (
    <>
      <section className='flex flex-col p-4 sm:p-6 w-full gap-4 sm:gap-6 max-w-120 mx-auto min-h-dvh justify-center items-center'>
        {/* Logo */}
        <p className='block sm:hidden text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px] bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text font-black tracking-[0.12em] text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.2)]'>
          SPECOM INC
        </p>
        <p className='hidden sm:block font-bold text-[30px] text-center'>{t('action.login')}</p>
        <section className='w-full'>
          {/* Form */}
          <form id='login-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 sm:gap-6'>
            {/* Login with email and admin id */}
            <FieldGroup className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name={ELoginFormKey.Username}
                label={t('inputLabel.username')}
                render={(f, fs) => (
                  <InputGroup>
                    <InputGroupInput
                      {...f}
                      id={f.name}
                      aria-invalid={fs.invalid}
                      placeholder={t('inputPlaceholder.logInWithEmailOrAdminID')}
                      autoComplete='off'
                    />
                    <InputGroupAddon>
                      <EmployeeIcon className='size-6 text-gray-500' />
                    </InputGroupAddon>
                  </InputGroup>
                )}
              />
              <FormField
                control={form.control}
                name={ELoginFormKey.Password}
                label={t('inputLabel.password')}
                render={(f, fs) => <FormPasswordField field={f} fieldState={fs} placeholder='••••••••' />}
              />
            </FieldGroup>
            <Field orientation='horizontal'>
              <Button type='submit' className='w-full cursor-pointer' disabled={!username || !password}>
                {t('action.login')}
              </Button>
            </Field>
          </form>
        </section>
      </section>
    </>
  )
}

export default LoginForm
