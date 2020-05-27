import  React,{useState} from 'react';
import  FormNew  from './form';
import  fetch from 'isomorphic-fetch';
import  Router from 'next/router';


const New = () =>{
    const [transaction,setTransaction] = useState([]);

    const handlerSubmit = (data) =>{
        fetch(`http://localhost:3000/api/transactions`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
           
            alert("Add transaction success");
            Router.push('/');
        })
        .catch(err=>{
            console.error('err', err)
        })    
        
    }

    return(
        <div style={{textAlign:"center"}}>
            <h4>NEW TRANSACTION</h4>
            <FormNew onSubmit={(data)=>{
                handlerSubmit(data)
            }}/>
        </div>
    )
}

export default New;