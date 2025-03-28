import { useState } from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hook/useResultadoDoSorteio";
import Card from "../componentes/Card";
import Titulo from "../componentes/Titulo";
import styles from './Sorteio.module.css'

const Sorteio = () => {
  const participantes = useListaDeParticipantes();

  const [participanteDaVez, setParticipanteDaVez]=useState('')
  const [amigoSecreto, setAmigoSecreto]=useState('')

  const resultado= useResultadoDoSorteio()

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (resultado.has(participanteDaVez)){
        setAmigoSecreto(resultado.get(participanteDaVez)!)
        setTimeout(() => {
          setAmigoSecreto('')
      }, 5000)
    }
  };
  return (
    <Card>
      <section className={styles.sorteio}>
        <Titulo>Quem vai tirar o papelzinho?</Titulo>
        <form onSubmit={sortear} >
          <select
            required
            name="participanteDaVez"
            id="participanteDaVez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          > 
              <option>Selecione o seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <h6>Clique em em sortear para ver quem é seu amigo secreto!</h6>
          <button className={styles.botao_sortear} >Sortear!</button>
        </form>
        {amigoSecreto && <p role='alert' className={styles.resultado}  >{amigoSecreto}</p>}
        <footer>
          <img src='/imagens/aviao.png' alt="avião de papel" />
        </footer>
      </section>

    </Card>
  );
};

export default Sorteio;
