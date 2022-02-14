import '../styles/App.css';
import Banner from '../components/banner/Banner'
import Feed from '../components/feed/Feed'
import Trees from '../components/feed/Trees'
import Aside from '../components/profile/Aside'


const Home = () => {
  return ( 
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <Trees />
        <Feed />
        <Aside className={"groupo_aside"} fullData={false}/>
      </div>
    </div>
)
}

export default Home;