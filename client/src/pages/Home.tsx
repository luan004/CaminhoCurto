import { useState } from 'react'
import '../styles/Home.css'

const Home = () => {

    const [url, setUrl] = useState('')
    const [shorted, setShorted] = useState(false)

    const handle = (e: any) => {
        e.preventDefault()
        if (!shorted) {
            console.log(url)
            setShorted(true)
            setUrl(window.location.origin + "/adsfsadfsda")
        } else {
            navigator.clipboard.writeText(url)
            setUrl('')
            setShorted(false)
        }
    }

    return (
        <div className='box'>
            <h1>CaminhoCurto</h1>
            <form onSubmit={handle}>
                <input 
                    className=''
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    disabled={shorted}
                />
                <input
                    type="submit"
                    value={shorted ? 'Copiar' : 'Encurtar'}
                />
            </form>
        </div>
    )
}

export default Home