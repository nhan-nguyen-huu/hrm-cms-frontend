import { type UseMutationOptions, type UseMutationResult, useMutation } from '@tanstack/react-query'
import useGlobalLoaderStore from '~/stores/global-loader'

const useMutationApi = <TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  return useMutation({
    ...options,
    mutationFn: async (variables, context) => {
      startLoading()
      return await options.mutationFn!(variables, context)
    },
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      stopLoading()
      options.onSuccess?.(data, variables, onMutateResult, mutationContext)
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      stopLoading()
      options.onError?.(error, variables, onMutateResult, mutationContext)
    }
  })
}

export default useMutationApi
