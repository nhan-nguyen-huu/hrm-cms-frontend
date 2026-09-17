import type { PropsWithChildren } from 'react'

import { ThemeProvider } from 'next-themes'
import { useRippleEffect } from '~/hooks/use-ripple-effect'
import I18nProvider from '~/providers/i18n-provider'
import { QueryProvider } from '~/providers/query-provider'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'

export const Provider = ({ children }: PropsWithChildren) => {
  useRippleEffect()

  return (
    <QueryProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme={COMMON_CONSTANT.THEMES.LIGHT}
        value={{ light: COMMON_CONSTANT.THEMES.LIGHT }}
        enableSystem
        disableTransitionOnChange
      >
        <I18nProvider>{children}</I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
