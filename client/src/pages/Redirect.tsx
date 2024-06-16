import { useState } from 'react'
import '../styles/Redirect.css'

const Redirect = () => {
    const code = window.location.pathname.split('/')[1]
    const [valid, setValid] = useState(false)
    const [url, setUrl] = useState('')

    fetch('http://' + location.hostname + ':3001/api/link/' + code)
    .then(response => response.json())
    .then(data => {
        if (data.status == 'success') {
            setValid(true)
            setUrl(data.url)
            window.location.replace(url)
        } else {
            setValid(false)
            setTimeout(() => {
                window.location.replace('/')
            }, 1000)
        }
    })

    return (
        valid ? (
            <div>
                <h1>Redirecionando...</h1>
                <p>Se o redirecionamento não ocorrer, clique <a href={url}>aqui</a>!</p>
            </div>
        ) : (
            <div>
                <h1>Link inválido</h1>
            </div>
        )
    )
}

export default Redirect