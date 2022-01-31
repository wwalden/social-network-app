import Banner from '../components/Banner'
import Feed from '../components/Feed'
import Aside from '../components/Aside'
import '../styles/App.css';


const Home = () => {
  return ( 
    <div>
      <Banner />
      <div id="main_page">
        <Feed />
        <Aside />
      </div>
    </div>
)
}

export default Home;