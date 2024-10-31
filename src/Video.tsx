import React, { useEffect, useRef } from 'react'


interface Props {
    url: string;
}

const Video: React.FC<Props> = ({ url }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {

    }, [videoRef?.current])


    return <video ref={videoRef} src={url} id="video" controls width="600"></video>
};

export default Video;