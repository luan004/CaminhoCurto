import '../styles/Home.css'

const Home = () => {
    return (
        <div className='box'>
            <h1>CaminhoCurto</h1>
            <form>
                <input type="text" name="url" placeholder="URL" />
                <input type="submit" value="Encurtar" />
            </form>
        </div>
    )
}

export default Home