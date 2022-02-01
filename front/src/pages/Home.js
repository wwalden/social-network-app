import Banner from '../components/banner/Banner'
import Feed from '../components/feed/Feed'
import Trees from '../components/feed/Trees'
import Aside from '../components/aside/Aside'
import '../styles/App.css';


const Home = () => {
  return ( 
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <Trees />
        <Feed />
        <Aside />
      </div>
    </div>
)
}

export default Home;