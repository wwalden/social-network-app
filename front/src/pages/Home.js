import '../styles/App.css';
import Banner from '../components/banner/Banner'
import Feed from '../components/feed/Feed'
import Trees from '../components/feed/Trees'
import GetUser from '../components/profile/GetUser';


const Home = () => {
  return ( 
    <div>
      <Banner />
      <div id="transition"></div>
      <div id="main_page">
        <Trees />
        <Feed />
        <aside className="groupo_aside">
        <h2>mon Profil</h2>
        <form action="http://localhost:3000/profile">
          <input className="form_tool" type="submit" value="Modifier" />
        </form>
        <div className="flex_center_aside">
          <img className="prof_pic" src="https://picsum.photos/300/200/?random" alt="a random landscape" />
          <GetUser fullData= "Full"/>
        </div>
      </aside>
      </div>
    </div>
)
}

export default Home;