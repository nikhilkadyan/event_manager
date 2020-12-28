import React, { useEffect, useState } from 'react';
import './style.scss';

import axios from 'axios';
import api_url from '../../Service/api';
import swal from 'sweetalert';

const Authors = () => {
    const [authors, setAuthors] = useState(null);
    const [filteredAuthors, setFilteredAuthors] = useState(null);
    const [modal, setModal] = useState(false);
    const [curAuthor, setCurAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthors = () => {
            axios.get(api_url + '/author').then(resp => {
                if (resp && resp.data) {
                    console.log(resp.data)
                    setAuthors(resp.data);
                    setFilteredAuthors(resp.data);
                }
            })
        }
        if (authors) {
            sessionStorage.setItem("authors", JSON.stringify(authors))
        } else {
            let cache = JSON.parse(sessionStorage.getItem("authors"));
            if (cache) {
                setAuthors(cache);
                setFilteredAuthors(cache);
            } else {
                fetchAuthors()
            }
        }
    }, [authors])

    const searchAuthors = (e) => {
        let term = e.target.value;
        if (term) {
            setFilteredAuthors(authors.filter(entry => {
                return entry.name.toLowerCase().includes(term.toLowerCase())
            }))
        } else {
            setFilteredAuthors(authors)
        }
    }

    const openModal = (id) => {
        setModal(true)
        axios.get(api_url + '/author/single/' + id).then((resp) => {
            if (resp && resp.data) {
                let author = resp.data
                setCurAuthor(author);
            }
        }).catch((err) => {
            setModal(false)
            swal("Error", err.message || "Could not fetch author details", "error")
        });
    }

    const closeModal = () => {
        setModal(false)
        setCurAuthor(null)
    }

    return (
        <div className="authors_container">
            <div className="search_container">
                <input type="search" name="search" id="search" placeholder="Search Author" onChange={searchAuthors} />
            </div>
            {modal && (
                <div className="author_detail">
                    <div className="box">
                        {curAuthor ? (
                            <>
                                <h3>{curAuthor.name}</h3>
                                {curAuthor.sessions.length > 0 ? curAuthor.sessions.map((session, key) => (
                                    <button className="session" onClick={() => swal(session.title, session.abstract)}  key={key}>
                                        {session.title.substring(0, 50)}...
                                    </button>
                                )) : "No sessions by this author."}
                                <button className="close" onClick={() => closeModal()}>Close</button>
                            </>
                        ) : "Fetching Details"}
                    </div>
                </div>
            )}
            <div className="authors">
                {filteredAuthors && filteredAuthors.map((author, key) => (
                    <div className="author" key={key} onClick={() => openModal(author.id)}>
                        {author.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Authors;
