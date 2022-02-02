import Banner from '../components/banner/Banner'
import Feed from '../components/feed/Feed'
import Trees from '../components/feed/Trees'
import Aside from '../components/profile/Aside'
import '../styles/App.css';


const Home = () => {
  return ( 
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <Trees />
        <Feed />
        <Aside className={"groupo_aside"}/>
      </div>
    </div>
)
}

export default Home;