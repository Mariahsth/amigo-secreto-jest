import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante"
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro"
import styles from './Formulario.module.css';

const Formulario = () => {

    const [nome, setNome] = useState('')

    const inputRef=useRef<HTMLInputElement>(null)

    const adicionarNaLista=useAdicionarParticipante()
    const mensagemDeErro=useMensagemDeErro()

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()
    }

    return (
        <form onSubmit={adicionarParticipante} className={styles.formulario}>
            <input 
                className={styles.input__form}
                ref={inputRef}
                value={nome}
                onChange={evento => setNome(evento.target.value)}
                type="text" 
                placeholder="Insira os nomes dos participantes"
            />
            <button className={styles.botao__form} disabled={!nome}>Adicionar</button>
            {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
        </form>
    )

}

export default Formulario