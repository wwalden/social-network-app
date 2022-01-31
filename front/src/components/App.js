import Banner from './Banner'
import Feed from './Feed'
import Aside from './Aside'
import '../styles/App.css';


function App() {
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

export default App;
