import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

const Paragraph: React.FC<Props> = ({children}) => {
    return <p className='pb-4'>{children}</p>
}

export default Paragraph