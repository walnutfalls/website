import React from 'react';
import Section from './Section';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {}

const Border = 'border-solid border-2 border-slate-800 rounded-lg w-96 m-2 p-4'
const Logo = 'px-2'

const Demos: React.FC<Props> = ({ }) => {
    return <Section className='bg-stone-300 p-16 snap-center'>
        <h1 className='text-5xl block mb-8'>Demos</h1>

        <h2 className={Border}><FontAwesomeIcon className={Logo} icon={faGithub} /> This Site </h2>
        <h2 className={Border}><FontAwesomeIcon className={Logo} icon={faGithub} /> Multiplayer Snake </h2>
        <h2 className={Border}><FontAwesomeIcon className={Logo} icon={faGithub} /> Boomtown Showdown </h2>
        <h2 className={Border}><FontAwesomeIcon className={Logo} icon={faGithub} /> Warigami </h2>
    </Section>
};

export default Demos;