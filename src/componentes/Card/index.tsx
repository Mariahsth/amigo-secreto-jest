import Formulario from '../Formulario'
import Titulo from '../Titulo'
import styles from './Card.module.css'

const Card: React.FC = () => {
    return (
        <div className={styles.card}>
            <Titulo>Vamos começar!</Titulo>
            <Formulario/>
        </div>
    )
}

export default Card