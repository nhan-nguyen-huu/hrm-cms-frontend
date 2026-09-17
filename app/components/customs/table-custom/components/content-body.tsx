import clsx from 'clsx'

interface IContentBodyProps {
  content?: string | number
  className?: string
  onAction?: () => void
}
const ContentBody = ({ content, className, onAction }: IContentBodyProps) => {
  return (
    <p
      className={clsx('wrap-break-word whitespace-normal text-center text-xs', className)}
      onClick={() => onAction?.()}
    >
      {content || '-'}
    </p>
  )
}

export default ContentBody
