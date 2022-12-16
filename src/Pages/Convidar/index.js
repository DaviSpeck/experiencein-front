import React, { useEffect, useState } from "react";
import { api } from "../../Services/api";
import  "./Convidar.css";

export default function Convidar() {

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
              return {...profile, inviteId: invite.id}
          });
        setInvites(invitesInfo);
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

  console.log(invites);

  return (
    <>
    <h1 style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>Convide alguém para ser seu amigo!</h1>
    <div className="wrapperConvidar">
      <div className="profilesConvidar">
        <div className="inviteConvidar"> 
          {profiles?.map((profile) => (
            profile.id === currentProfile?.id || !profile.pode_convidar ? (
              null 
            ) : ( 
              <div className="wrapperCardConvidar" key={profile.id}>
                <div className="cardConvidar">
                  <div className="cardInitialConvidar">
                    <h3 style={{ marginRight: '5px' }}>{profile.nome}</h3>
                    { profile.pode_convidar ? 
                      <button 
                        className="iconConvidar" 
                        title="Convidar" 
                        onClick={() => invite(profile.id)}
                      ></button> 
                    : null}
                  </div> 
                  <div>
                    <span>{profile.email}</span>
                    { profile.id === currentInvitedProfile ? <span className="messageConvidar">{ message }</span> : null }
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
