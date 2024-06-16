import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScissors, faCopy } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';

const Home = () => {
    const [url, setUrl] = useState('');
    const [shorted, setShorted] = useState(false);
    const [error, setError] = useState(false);

    const handle = (e: any) => {
        e.preventDefault();
        if (!shorted) {
            fetch('http://' + location.hostname + ':3001/api/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: url
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    setShorted(true);
                    setUrl(location.origin + '/' + data.code); 
                    setError(false);
                } else {
                    console.error('error');
                    setError(true);
                }
            })
            .catch(error => console.error(error));
        } else {
            navigator.clipboard.writeText(url);
            setUrl('');
            setShorted(false);
        }
    }

    return (
        <div className='box'>
            <h1>CaminhoCurto</h1>
            <form onSubmit={handle}>
                <input 
                    className={(shorted ? 'disabled' : '') + (error ? 'invalid' : '')}
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    disabled={shorted}
                />
                <button type="submit">
                    {shorted ? <><FontAwesomeIcon icon={faCopy} /> Copiar</> : <><FontAwesomeIcon icon={faScissors} /> Encurtar</>}
                </button>
            </form>
        </div>
    );
};

export default Home;
