import React from 'react'

type Props = {
    img: string
    title: string
    content: string
}

const ProjectCard: React.FC<Props> = ({img, title, content}) => {
  return (
    <div className='flex flex-col'>
        <img className='w-full object-cover' src={img} />
        <article>
            <h1 className='text-5xl block mb-8'>{title}</h1>
            <p>{content}</p>
        </article>
    </div>
  )
}

export default ProjectCard