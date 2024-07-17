import { useEffect, useState } from "react";
import axios from "axios";

const Journal = () => {
    const [journals, setJournals] = useState([]);

    const getJournals = () => {
        axios.get('http://localhost:8000/api/surfjournals/')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setJournals(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useEffect(() => {
        getJournals();
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/api/surfjournals/' + id + '/')
            .then(function (response) {
                // handle success
                console.log(response);
                getJournals();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <div style={{ padding: "100px 200px 50px 200px" }}>
            <header><h1>Surf Journal</h1></header>
            <hr></hr>
            {journals.map((journal) => {
                return (
                    <div key={journal.pk}>
                        <div>
                            <h2>{journal.country} - {journal.region}</h2>
                            <h2>{journal.surfbreak}</h2>
                            <p><b>Break Description: </b>{journal.description}</p>
                            <p><b>Swell Notes: </b>{journal.notes}</p>
                            <p>Author: {journal.author}</p>
                            <button onClick={() => handleDelete(journal.pk)}>Delete</button>
                            <hr></hr>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Journal;
