import Banner from '../components/banner/Banner'
import Feed from '../components/feed/Feed'
import Aside from '../components/aside/Aside'
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