import cw from "./components/cw.svg"
import man from "./components/man.svg"
import woman from "./components/woman.svg"
import growingMan from "./components/growing-up-man.svg"
import growingWoman from "./components/growing-up-woman.svg"
import mail from "./components/mail.svg"
import map from "./components/map.svg"
import padlock from "./components/padlock.svg"
import phone from "./components/phone.svg"
import loadingGif from "./components/loading.gif"
import { useEffect, useState } from "react"
import './App.css';
import axios from "axios"

function App() {

  const [info, setInfo] = useState([])

  const [ userList, setUserList ] = useState( [] )

  const [personal, setPersonal] = useState("name")

  const [ loading, setLoading ] = useState(false)

  const [ information, setInformation ] = useState([])
  
  const fetchData = () => {
    setLoading(true)
    axios.get("https://randomuser.me/api/")
    .then((res) => {

      setInfo(res.data.results[0])
      setInformation([res.data.results[0].name.title, res.data.results[0].name.first, res.data.results[0].name.last] )
      setPersonal("name")
    }
      )
    .then(() => setLoading(false))

    
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addUser = () => {
      
    if(userList.filter(user => user.email === info?.email).length > 0){
      alert("You already added this user")
    }else{

      setUserList( 
        [

        ...userList,
        {
          name : info?.name?.first,
          email : info?.email,
          phone : info?.phone,
          age : info?.dob?.age
        }
      ] )
    }
  }
  
  const handleClick = (information, personal) => {
    setInformation(information)
    setPersonal(personal)
  }
  

  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        <img alt="img" src={info?.picture?.large} className="image" />

        <div className="personal-info">

        {loading ? <img className="loading" src={loadingGif} alt="load"/> : <div><p>My {personal} is</p> 
        
        <p>{information?.map((info,index) => (
          <span key={index}>{info + " "} </span>
        ))}</p>

         </div>}  
        </div> 
        <div className="icons">

        <acronym title="gender"><img alt="man-woman" src={info?.gender === "female" ? woman : man} onClick={() => handleClick([info?.name?.title, info?.name?.first, info?.name?.last], "name")} /></acronym>
        <acronym title="email"><img alt="email" src={mail} onClick={() => handleClick([info?.email],"email")} /></acronym>
        <acronym title="age"><img alt="growingman-woman" src={info?.gender === "female" ? growingWoman : growingMan} onClick={() => handleClick([info?.dob?.age],"age")} /></acronym>
        <acronym title="street"><img alt="street" src={map} onClick={() => handleClick([info?.location?.street?.number, info?.location?.street?.name],"street")} /></acronym>
        <acronym title="phone"><img alt="phone" src={phone} onClick={() => handleClick([info?.phone],"phone")} /></acronym>
        <acronym title="password"><img alt="password" src={padlock} onClick={() => handleClick([info?.login?.password],"password")} /></acronym>
        
        </div>
        <div className="buttons">
          <button onClick = {fetchData }> NEW USER </button>
          <button onClick={addUser} >ADD USER</button>
        </div>
        <div className="list">
          { 
          userList.length > 0 && 
            <table>
            <thead>
            <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            </tr>
            </thead>
           <tbody>
            {
              userList?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.age}</td>
               </tr>
            ))
          }
          </tbody>
            </table>
        }
        </div>
      </div>
    </div>
  );
}

export default App;