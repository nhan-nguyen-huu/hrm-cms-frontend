import { ELoginFormKey } from '~/shared/enums/form.enum'

export const formHelper = {
  getDefaultValuesLogin: () => {
    return {
      [ELoginFormKey.Username]: '',
      [ELoginFormKey.Password]: ''
    }
  }
}
