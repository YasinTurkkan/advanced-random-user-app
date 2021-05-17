import cw from "./components/cw.svg"
import man from "./components/man.svg"
import woman from "./components/woman.svg"
import growingMan from "./components/growing-up-man.svg"
import growingWoman from "./components/growing-up-woman.svg"
import mail from "./components/mail.svg"
import map from "./components/map.svg"
import padlock from "./components/padlock.svg"
import phone from "./components/phone.svg"
import design from "./components/design.svg"
import loadingGif from "./components/loading.gif"
import { useEffect, useState } from "react"
import './App.css';
import axios from "axios"

function App() {

  // APIDEN ILK BASTA GETIRECEGIMIZ DEGERLER ICIN BOS ARRAY KOYUYORUZ CUNKU ILERIDE ICI ARRAY OLACAK
  const [info, setInfo] = useState([])

  // Bu table icindeki ekleyecegimiz satirlar icin koyduk
  // Bu ne olacak artik table'in icine koydugumuz api'den aldigimiz seyler olacak
  const [ userList, setUserList ] = useState( [] )

  // reactte dinamik seyleri state'lere atamamiz lazim bu dinamikligi sagliyor
  // personal bilginin icerisine bunun ilk degerinin name olmasini istiyoruz My name olarak

  const [personal, setPersonal] = useState("name")

  // bu yukleme sirasinda gozukecek loading gif
  const [ loading, setLoading ] = useState(false)

  // burasi bos bir array ben gelen informationi api'da gelen ve bunun icinde bir array olusturayim
  // neden array olusturuyoruz ? Ayrica alttaki 6 icon'daki bilgi yazacak bu yere email phone vs. 
  // bilgileri arrayin icine doldurup onu map ile dokecegiz. her ne bilgi ise
  // cunku isim yazmak icin api'dan title first name and last name ayri geliyor 
  // 3'u bir olsun Mr. FirstName ve Last Name onu burada yapiyoruz 
  const [ information, setInformation ] = useState([])
  
  // AXIOSU BASTA BIR FUNCTION OLARAK YAZALIM O ZAMAN HERM USE EFFECT HEM NEW USER ICINDE CAGIRABILIRIZ
  const fetchData = () => {
    // fetch datayi her calistirdiginda setLoading'i true yap. Bu loading gifi icin 
    setLoading(true)
    axios.get("https://randomuser.me/api/")
    .then((res) => {
      // infonun icerisine setInfo ile gelen responsu koyuyoruz. burada obje geliyor
      // neresi bizim icimize yarayacak bakiyoruz data icinde results icerisinde ve birinci elemani yani 0 index
      // bilgiler burada geliyor. 
      // normalde apilerden gelen iseklerin karsiligi olarak birden fazla eleman gelir. Direk resultu esitleyip sonra
      // map olarak doneriz. Bu normal hayatta olani
      // result ile alirsak 0 koymaz isek array geliyor 0 olursa object olarak donuyor.
      // setInfo'da bilgilerimiz var artik
      setInfo(res.data.results[0])
      // set informationu sunun icin yazdik. Apida isim soyisim ve title geliyor 3 sekilde 
      // butona tikladigimizda degistirelim biz bunu burada bu sekilde alip birlestiriyoruz. 
      setInformation([res.data.results[0].name.title, res.data.results[0].name.first, res.data.results[0].name.last] )
      setPersonal("name")
    }
      )
    .then(() => setLoading(false))

    
  }

  // USE EFFECT ILK BASTA CALISACAK SAYFA ILK YUKLENDIGINDE ASIL KULLANIM MOUNT'TA OLAN
  // VEYA EGER BELIRLI BIR SPECIFIC SEY OLUNCA CALISTIRMAK ISTERSEK DEPENDECY ARRAY OLARAK DA VEREBILIRIZ
  useEffect(() => {
    fetchData()
  }, [])


  // bunu tablein icine user eklemek icin 
  // ilk userListin icerisi bostu biz bunun icerisini doldurmak istiyoruz
  // bunun icine ne koyacagiz. Bos arraydi her user ayri bir array olacka
  // 
  const addUser = () => {
      
    // userlistin icindekileri filtrele. Neyi filtreleyeceim diyor. istersek hepsini andler ile birden fazla yapabiliriz
    // filter bir array dondurur. filter kosulu saglayanlarin hepsini dondurur
    // biz diyoruzki bu sifirdan buyukse bir alert ver eger varsa o kisi bize alert ver
    // degilse setUser List'i yapistir buraya 

    // filter kosula gore yeni bir array olustur benim icinde abc elemani var ve a'yi alabiliyoruz
    // bunun degeri a'ya esit olanlari al bir tane varsa bir tane dondur a'nin kacindi deger oldugunu bilmiyoruz
    // ekledigim userin emaili yeni ekliyecegim kisinin emaili esit ise bana bunu dondur. Ayni kisi ise alert ver
    // TAM ANLASILMADI bu. Includes da kullanilabilir. 
    if(userList.filter(user => user.email === info?.email).length > 0){
      alert("You already added this user")
    }else{
      // object tanimlayip iceride disarida arrayin icine koyup onu donduruyoruz 
      setUserList( 
        [
          // bu tusa add user'e bastigimda ... yazmaz isek onun uzerine yazdiracak. 
          // bu zamana kadar aldigim userListin hepsini al. Bu spread operator ... onceki verilerin hepsini getirir
          // oncekiler olacak ve yeni bir sey object koymak istiyoruz. Bu gelen objenin icerisine tanimliyoruz
          // name, email phone ve age olacak

          // summary userlistin degerleri ne ise getir ve ustune su asagidakiler ekle demek kisaca
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
  
  // burada hem personeli hem information icini degistirmek istiyoruz
  // functionu bir yerde yazip iki parametre ile  information ve personal
  // buraya gel setPersonalin icerisine personali koy 
  // tek function ile birden cok is yapmak 6 tane function yazmak yerine bir tane ile 
  // halledecegiz. Bir tane olsun kendisine gore ozgu olmasini cagrildigi yerden yapalim
  // bu onclick ile gelecek asagidan 
  const handleClick = (information, personal) => {
    setInformation(information)
    setPersonal(personal)
  }
  

  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        {/* infronun icinde apiden gelen resultlar var biz resmi getirmek istiyoruz  */}
        {/* buna nasil ulasabiliriz info'ya gir pictura gir icinden de large olarak gelsin */}
        {/* ? yapmaz isek undefined geliyor sayfayi ilk baslattigimizda. ? isareti ne yapiyordu */}
        {/* ? mantigi su bu diyorki info diye birsey varmi bak ? varsa ikinci asamaya gel daha sonra largeda varsa */}
        {/* info? ile varsa o elemani al yoksa hata verme problem cikartma. cunku ilk infonun degeri bos bir array */}
        {/* bunu maptade heryerde kullanabiliyoruz bos arraylari kontrol etmek icin */}
        {/* info && info.picture && info.large dan geliyor */}
        <img alt="img" src={info?.picture?.large} className="image" />

        <div className="personal-info">

        {/* bir bak loading true mi ? o yukleme gifi icin  */}
        {/* loading true ise bana bu gifi goster yoksa asagidaki sunu goster */}
        {loading ? <img className="loading" src={loadingGif} alt="load"/> : <div><p>My {personal} is</p> 
        
        {/* baska bir icona tiklayinca oranin bilgisi gelecen bu information icinden email oldugunda email */}
        {/* biz onu yaparken o bilgileri koyacagiz information icine  */}
        <p>{information?.map((info,index) => (
          // title first name and last namei map ile burada birlestiriyoruz 
          // sonra baska bir icona tiklayinca o zaman my email is email adresi olacak
          // baskas bir icona tiklayinca my phone is phone number olacak
          <span key={index}>{info + " "} </span>
        ))}</p>

         </div>}  
        </div> 
        <div className="icons">
        {/* Acronym tooltip gibi birsey uzerine gelince gender email phone vs. seklinde cikiyor */}
        {/* buna title giriyoruz title girdigimiz ne ise uzerine hover ettigimizde o cikiyor  */}
        {/* ilk arguman bir array ikincisi bir string  */}
        <acronym title="gender"><img alt="man-woman" src={info?.gender === "female" ? woman : man} onClick={() => handleClick([info?.name?.title, info?.name?.first, info?.name?.last], "name")} /></acronym>
        <acronym title="email"><img alt="email" src={mail} onClick={() => handleClick([info?.email],"email")} /></acronym>
        <acronym title="age"><img alt="growingman-woman" src={info?.gender === "female" ? growingWoman : growingMan} onClick={() => handleClick([info?.dob?.age],"age")} /></acronym>
        <acronym title="street"><img alt="street" src={map} onClick={() => handleClick([info?.location?.street?.number, info?.location?.street?.name],"street")} /></acronym>
        <acronym title="phone"><img alt="phone" src={phone} onClick={() => handleClick([info?.phone],"phone")} /></acronym>
        {/* handle click icinde () => yapinca icinde parametre gonderebiliyoruz  */}
        <acronym title="password"><img alt="password" src={padlock} onClick={() => handleClick([info?.login?.password],"password")} /></acronym>
        
          
        </div>
        <div className="buttons">
          <button onClick = {fetchData }> NEW USER </button>
          <button onClick={addUser} >ADD USER</button>
        </div>
        <div className="list">
           {/* elimizde bir userlist var biz diyoruz ki eger bunun lengt'i 0'dan buyukse listeyi tabolyu goster */}
           {/* bunu demez isek tablo basliklarini hep gosteriyor. */}
          { 
          // bu add usera tiklayinca userList'in icinde bir eleman oldu. oyle olunca lengt'i 0'dan buyuk oldu 
          // bu ternary olarak da yapabiliriz ? ve yapilacak sey degilse null
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
              // icerisine ekledigimiz userlara tbody icindeki td ler icinde gostermek istiyoruz 
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