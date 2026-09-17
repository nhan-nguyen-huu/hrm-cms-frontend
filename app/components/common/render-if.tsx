import React from 'react'

interface IRenderIfProps {
  condition: boolean
  whenTrue: React.ReactNode
  whenFalse?: React.ReactNode
}

const RenderIf = ({ condition, whenTrue, whenFalse }: IRenderIfProps) => {
  return <>{condition ? whenTrue : whenFalse}</>
}

export default RenderIf
