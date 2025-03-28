import Card from "../componentes/Card";
import Formulario from "../componentes/Formulario";
import ListaParticipantes from "../componentes/ListaParticipantes";
import Rodape from "../componentes/Rodape";
import Titulo from "../componentes/Titulo";

const Configuracao = () => {
    return (
        <Card>
            <section>
                <Titulo>Vamos começar!</Titulo>
                <Formulario/>
                <ListaParticipantes/>
                <Rodape/>

            </section>
        
        </Card>
    )
}

export default Configuracao;