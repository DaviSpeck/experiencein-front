import React, {useState} from "react";
import { useHistory } from "react-router";
import {api} from "../../Services/api";

export default function Register() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [companyName, setCompanyName] = useState();
  //const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function submit(e) {
    
    e.preventDefault();

    api.post('/perfis/', {
      nome: name, 
      email: email, 
      senha: password, 
      nome_empresa: companyName
    })
      .then(resp => {
        console.log(resp);
        history.push("/");
      })
      .catch(error => console.log(error));

  }

  return (
    <div style={{ backgroundColor: '#1E1E1E' }}> 
      <div className="form">
        <form onSubmit={submit}>

          <h2>Novo usuário</h2>

          <label>
            Name
          </label>
          <input type="text" onChange={(e) => setName(e.target.value)}/>

          <label>
            Email
          </label>
          <input type="text" onChange={(e) => setEmail(e.target.value)}/>

          <label>
            Company Name
          </label>
          <input type="text" onChange={(e) => setCompanyName(e.target.value)}/>

          <label>
            Password
          </label>
          <input type="password" onChange={(e) => setPassword(e.target.value)}/>

          <button>Register</button>

        </form>
      </div>
    </div>
  );
}
