import clsx from 'clsx'

interface ITitleHeadProps {
  title?: string
  className?: string
}
const TitleHead = ({ title, className }: ITitleHeadProps) => {
  return (
    <p
      className={clsx(
        'text-app-primay font-semibold text-center wrap-break-word whitespace-normal text-xs uppercase',
        className
      )}
    >
      {title}
    </p>
  )
}

export default TitleHead
