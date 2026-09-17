import { redirect } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'
import type { TProtected } from '~/shared/types/common.type'

import cookieHelper from './cookie.helper'

export const authHelper = {
  handleProtectedRoute: (type: TProtected) => {
    const token = cookieHelper.getAccessToken()
    switch (type) {
      case 'ROOT':
        return !token ? redirect(ROUTES.AUTH.LOGIN) : null
      case 'AUTH_ONLY':
        return token ? redirect(ROUTES.HOME) : null
      case 'PRIVATE':
        return !token ? redirect(`/${ROUTES.AUTH.LOGIN}`) : null
    }
  }
}
