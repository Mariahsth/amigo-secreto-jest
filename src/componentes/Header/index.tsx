import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.cabecalho}>
            <div className={styles.imagem_logo} role="img" aria-label='Logo do Sorteador'></div>
            <img className={styles.cabecalho__imagem_participante} src="imagens/participante.png" alt="Participante"/>
        </header>
    )

}


export default Header;