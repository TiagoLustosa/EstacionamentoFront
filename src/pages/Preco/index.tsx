import { FiX } from "react-icons/fi"
import Button from "../../components/Button"
import Modal from "react-modal"
import { Container, ModalContainer, Wrapper } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

const customStyles = {
    content: {
        height: '26rem',
        width: '26rem',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#191920',
        color: '#FFF'
    },
};

interface Preco {
    id: string,
    valorHora: number,
    valorHoraAdicional: number,
    vigenciaInicio: Date,
    vigenciaFim: Date
}

interface PrecoAdicionar {
    valorHora: number,
    valorHoraAdicional: number,
    vigenciaInicio: Date,
    vigenciaFim: Date
}

const precoInicial: PrecoAdicionar = {
    valorHora: 0,
    valorHoraAdicional: 0,
    vigenciaInicio: new Date(),
    vigenciaFim: new Date()
}

export const Preco = (): JSX.Element => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [precos, setPrecos] = useState<Preco[]>([])
    const [precoAdicionar, setPrecoAdicionar] = useState<PrecoAdicionar>(precoInicial)
    const [inicioVigencia, inicioVigenciaOnChange] = useState(new Date())
    const [fimVigencia, fimVigenciaOnChange] = useState(new Date())
    useEffect(() => {
        obterTodos()
    }, [])

    const obterTodos = async () => {
        const response = await api.get('api/preco/obterprecos')
        setPrecos(response.data)
    }

    let precoAdicionarObjeto = {
        valorHora: precoAdicionar.valorHora,
        valorHoraAdicional: precoAdicionar.valorHoraAdicional,
        vigenciaInicio: inicioVigencia,
        vigenciaFim: fimVigencia
    }
    const handleChange = (e: any) => {
        const value = e.target.value
        setPrecoAdicionar({
            ...precoAdicionar,
            [e.target.name]: value
        })
    }
    
    const marcarPrecoVigencia = async () => {        
       console.log(precoAdicionarObjeto)
       await api.post('api/preco/adicionarpreco', precoAdicionarObjeto)
       console.log(precoAdicionarObjeto)
        obterTodos()
        setModalIsOpen(false)
    }
    return (
        <Container>
            <Modal
                isOpen={modalIsOpen}
                contentLabel="Adicionar Veiculo"
                style={customStyles}
                onRequestClose={() => setModalIsOpen(false)}
            >
                {console.log(precoAdicionar)}
                <ModalContainer>
                <FiX color="#FFF" className="direita" size={20} onClick={() => setModalIsOpen(false)} />
                    <label>Informe o valor hora </label>
                    <input type="text" name="valorHora" value={precoAdicionar.valorHora} onChange={handleChange} />
                    <label>Informe o valor hora adicional </label>
                    <input type="text" name="valorHoraAdicional" value={precoAdicionar.valorHoraAdicional} onChange={handleChange} />
                    <label>Informe o inicio da vigência </label>
                 
                    <Wrapper 
                    clearIcon={null} 
                    yearPlaceholder="" 
                    monthPlaceholder="" 
                    dayPlaceholder="" 
                    className="teste" 
                    format="dd/MM/yyyy" 
                    disableCalendar={true} 
                    value={inicioVigencia} 
                    onChange={inicioVigenciaOnChange}/>
                    <label>Informe o fim da vigência </label>
                    <Wrapper 
                    clearIcon={null} 
                    yearPlaceholder="" 
                    monthPlaceholder="" 
                    dayPlaceholder="" 
                    className="teste" 
                    format="dd/MM/yyyy" 
                    disableCalendar={true} 
                    value={fimVigencia} 
                    onChange={fimVigenciaOnChange}/>                    
                    <Button title="Marcar Entrada" onClick={marcarPrecoVigencia} />
                </ModalContainer>
            </Modal>
            <h3>Estacionamento</h3>
            <div className="header">
                <h1>Carro bem guardado</h1>
                <Button title="Adicionar Vigência" onClick={() => setModalIsOpen(true)} />
            </div>
            <table>
                <thead>
                    {console.log(precoAdicionar.valorHoraAdicional)}
                    <tr>
                        <th>Preço</th>
                        <th>Preço Adicional</th>
                        <th>Início da Vigência</th>
                        <th>Fim da Vigência</th>
                    </tr>
                </thead>
                <tbody>
                    {precos.map((preco) => 
                        <tr key={preco.id}>
                            <th>{preco.valorHora}</th>
                            <th>{preco.valorHoraAdicional}</th>
                            <th>{new Intl.DateTimeFormat('pt-BR', { dateStyle: "short" }).format(Date.parse(preco.vigenciaInicio.toString()))}</th>
                            <th>{new Intl.DateTimeFormat('pt-BR', { dateStyle: "short" }).format(Date.parse(preco.vigenciaFim.toString()))}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </Container>
    )
}