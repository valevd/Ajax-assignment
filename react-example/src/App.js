import axios from 'axios';
import './App.css'
import { useEffect, useState } from "react"

//npm run start

function Task({sections, courseName}) {
    const[courseSec, setCourseSec] = useState([]);
    
    const handleAdd = e => {
        console.log(e);
        setCourseSec([...courseSec,parseInt(e.target.value)]);
    }
    const handleDelete = (e, del) => {
        let hanDel = courseSec.filter((element, index) => index !== del)
        console.log(hanDel)
        setCourseSec(hanDel);
    }
    const handleChange = (e, id) => {
    setCourseSec(courseSec.map((inew, oldid)=> oldid === id ? parseInt(e.target.value) : inew)); 
    }

    return(
        <tr>
            <th scope= "row">{courseName}</th>
            <td>
                <div className="row g-2">
                    {courseSec.map((idd, i) => <Section key={i} indexid={i} sections={sections} idd ={idd}
                     lname={sections.find(sections => sections.id === idd).name}handleChange={handleChange} handleDelete= {handleDelete}/>)}
                    <div className="col-auto" >
                        <select className="form-select" onChange={handleAdd} value= "-1">
                        <option disabled value="-1" >Add Section...</option>
                            {sections.map((inow, i)=> <option key={i} value={inow.id}>{inow.name}</option>)}
                        </select>
                    </div>
                </div>
            </td>
        </tr>
    );
}


function App() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Rerendering App");

    useEffect(() => {
        const fetch = async () => {
        try{
        console.log("...sending ajax call");
        setLoading(true);
        const result = await axios('http://localhost:8080/data');
        console.log("...data has returned");
        setLoading(false);
        setData(result.data);
        }catch(error) {
            setLoading(false);
            setError("Unable to retreive data from server try again");
          }
        };
        fetch();
    }, []);
    

    

    
   console.log("rendering...");     

    

    const[courseName, setCourseName] = useState([]);
    const sections = [
         {id: 12, name: 'Ayati'},
         {id: 7, name: 'Gao'},
         {id: 2, name: 'Kim'},
         {id: 23, name: 'Schweller'},
         {id: 31, name: 'Tomai'},
         {id: 3, name: 'Wylie'}                 
    ];

        const handleCourse = e => 
    {   e.preventDefault();
        console.log("submit " + e.target.addCourse.value);
        setCourseName([...courseName, parseInt(e.target.addCourse.value)]);
    }

//added loading and stuff for 12
return(
   <div className="container">

 {loading
 ?
 <h2>Loading...</h2>
 : 

 error ?
 <div>
 <h2>Error</h2>
 <pre>{error}</pre>
 </div>
 :
 <div>
    <h1>Build-A-Schedule</h1>

    <table className="table">
        <thead>
            <tr>
                <th scope="col">Course</th>
                <th scope="col">Sections</th>
            </tr>
        </thead>
        <tbody>

                    {courseName.map((coid, i) => <Task click={i} sections={sections} courseName={coid}/>
                    )}

                                

               
            
        </tbody>
    </table>
     </div>
 }
  
  <div className="row">
        <div className="col-auto">
        <form onSubmit ={handleCourse}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Course Number" name="addCourse" />
                <button type="submit" className="btn btn-primary" id="button-addon2">Add Course</button>
            </div>
              </form>
        </div>
    </div>
    </div>
    );
    }


function Section({sections , name ,indexid, idd, lname, handleChange, handleDelete })
{    const handleEdit = e =>
    {
        handleChange(e, indexid);
    }
    const handleout = e =>
    {
        handleDelete(e, indexid);
    }
    return(
        <div className="col-auto">
            <div className="input-group">
            <select className="form-select" value= {idd} onChange={handleEdit}>
                            {sections.map((ithis, i)=> <option key={i} value={ithis.id}>{ithis.name}</option>)}
                        </select>
                <button className="btn btn-danger" onClick={handleout}>-</button>
            </div>
        </div>
     
    )
}

export default App;
