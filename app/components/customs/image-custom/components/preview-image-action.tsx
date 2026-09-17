import clsx from 'clsx'

const PreviewImageAction = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type='button'
      className={clsx(
        'rounded p-2 text-white',
        props?.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:bg-white/10',
        props?.className
      )}
    >
      {children}
    </button>
  )
}

export default PreviewImageAction
