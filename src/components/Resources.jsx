import React, {useState, useEffect} from 'react';
import Home from './Home';

const Resources = ({tech}) => {
    const [ what, setWhat ] = useState('');
    const [ how, setHow ] = useState('');
    const [video, setVideo] = useState('');
    
    useEffect(() => {
        const fetchResources = async () => {
            try{
                const fetch = await fetch('/resources',{body: {tech: tech}})
                const response = fetch.json();
                setWhat(response.what);
                setHow(response.how);
                setVideo(response.video);
            }
            catch(error){
                console.error('Error fetching resources:', error);
            }
            

        }

    }, [])

    return (
        <div>
        <div>
            <p>What Is It?</p>
            <link href={what}></link>
        </div>
        <div>
            <p>How Do I Use It?</p>
            <link href={how}></link>
        </div>
        <div>
            <p>Useful Video!</p>
            <link href={video}></link>
        </div>
        </div>
    )
}

export default Resources;