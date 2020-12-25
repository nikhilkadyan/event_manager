import React, { useEffect, useState } from 'react';
import './style.scss';

import axios from 'axios';
import api_url from '../../Service/api';

const Authors = () => {
    const [ authors, setAuthors ] = useState([]);
    useEffect(() => {
        axios.get(api_url + '/author').then(resp => {
            if(resp && resp.data){
                console.log(resp.data)
                setAuthors(resp.data);
            }
        }
    )}, [])

    return (
        <div>
            {authors.map((author, key) => (
                <h4 key={key}>{author.name}</h4>
            ))}
        </div>
    )
}

export default Authors;
