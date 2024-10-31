import React from 'react';
import Section from './Section';

interface Props {
    
}

const Contact: React.FC<Props> = ({ }) => {
    return <Section className='bg-stone-200 p-16 snap-center'>
        <h1 className='text-5xl block mb-8'>Contact</h1>
    </Section>
};

export default Contact;