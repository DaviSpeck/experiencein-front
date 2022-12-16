import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import  "./Profiles.css";

export default function Profiles() {

  const [profiles, setProfiles] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [message, setMessage] = useState();
  const [currentInvitedProfile, setCurrentInvitedProfile] = useState();
  const [invites, setInvites] = useState();
  //const [contacts, setContacts] = useState();

  useEffect(() => {

    // retorna todos os perfis presentes no banco
    api.get("/perfis/")
      .then(resp => setProfiles(resp.data))
      .catch(error => console.error(error));

    // retorna o usuário logado atualmente
    api.get(`/perfil/`)
      .then(resp => setCurrentProfile(resp.data))
      .catch(error => console.log(error));

    //console.log(currentProfile);

    // retorna todos os convites
    api.get("/convites/")
      .then((resp) => {
          const invitesInfo = resp.data.map((invite) => {
              const profile = profiles?.find((invite) => invite.solicitante === profile.id)
              return {...profile, inviteId: invite.id, nome: invite.nome}
          });
        setInvites(resp.data);
      })
      .catch(error => console.log(error))

  }, [profiles])

  function invite(id) {

    api.post(`/convites/convidar/${id}`)
      .then(resp => setMessage(resp.data.mensagem))
      .catch(error => console.log(error));

    setCurrentInvitedProfile(id);

  }

  function accept(id) {
    api.post(`/convites/aceitar/${id}`)
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error))
  }

  return (
    <>
    <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>Seja bem vindo, {currentProfile?.nome}!</h1>
    <div className="wrapper">
      <div className="profiles">
        <div className="contacts">
          <h2>Contatos</h2>
          <div className="contact">
          {currentProfile?.contatos.map((contact) => (
            <div className="cardContact" key={contact.id}> 
              <h3>{ contact.nome }</h3> 
              <span>{ contact.email }</span>
            </div>
          ))}
          </div>
        </div>
        <div className="invitations">
          <h2>Convites</h2>
          {invites?.map(item => (
              profiles?.map((profile) => (
                  profile.id === item.solicitante ? (
                    <div className="cardInvitations" key={item.id}>
                        <h3>{profile.nome}</h3>
                        <button style={{ paddingRight: '3px', paddingLeft: '3px' }} onClick={() => accept(item.id)}>Aceitar</button>
                    </div>   
                  ) : (
                    null
                  )
              ))
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
