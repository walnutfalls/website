import React from 'react';
import Section from './Section';
import classNames from 'classnames';


interface Props {
    
}

const TitleClasses = classNames([
    'text-9xl'
])

const SubtitleClasses = classNames([
    'text-xl'
])



const Hero: React.FC<Props> = ({ }) => {
    return <Section className='bg-slate-200 flex flex-col items-center'>
        <div className={TitleClasses}>SAVELIY BARANOV</div>
        <div className={SubtitleClasses}>GAMES | WEB | ANDROID</div>
    </Section>
};

export default Hero;