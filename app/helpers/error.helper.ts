import i18n from '~/lib/i18n'
import { EErrorCode } from '~/shared/enums/common.enum'

const errorHelper = {
  getErrorExpect: () => {
    return [EErrorCode.Test]
  },
  getDefaultErrorMessage(code: number = 500): string {
    const errorKeys: Record<number, string> = {
      400: 'error.badRequest',
      401: 'error.unauthorized',
      403: 'error.forbidden',
      404: 'error.notFound',
      500: 'error.internalServerError',
      502: 'error.badGateway',
      503: 'error.serviceUnavailable'
    }
    return i18n.t(errorKeys[code] ?? 'error.unknown')
  }
}

export default errorHelper
