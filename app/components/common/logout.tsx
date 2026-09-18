import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { LogoutIcon } from '~/assets/svgs'
import AlertDialogCustom from '~/components/customs/alert-dialog-custom'
import cookieHelper from '~/helpers/cookie.helper'
import useMutationApi from '~/hooks/use-mutation-api'
import { AuthService } from '~/services/auth.service'
import { ROUTES } from '~/shared/constants/routes.constant'

const Logout = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { t } = useTranslation()
  const navi = useNavigate()

  const logoutMutation = useMutationApi({
    mutationFn: (getRefreshToken?: string) => {
      return AuthService.Logout(getRefreshToken)
    },
    onSuccess: (res) => {
      const isSuccess = res?.result
      if (isSuccess) {
        cookieHelper.removeAccessToken()
        cookieHelper.removeRefreshToken()
        toast.success(t('msg.logOutSuccess'))
        navi(`/${ROUTES.AUTH.LOGIN}`)
      }
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate(cookieHelper.getRefreshToken())
  }
  return (
    <>
      <button
        className='bg-red-200 text-white rounded-full size-8 flex items-center justify-center cursor-pointer ripple'
        onClick={() => setOpenDeleteDialog(true)}
      >
        <LogoutIcon className='size-5 text-red-700' />
      </button>
      <AlertDialogCustom
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={t('confirm.confirmLogoutTitle')}
        description={t('confirm.confirmLogoutDescription')}
        isWarning
        okText={t('action.logout')}
        onOkAction={handleLogout}
      />
    </>
  )
}

export default Logout
