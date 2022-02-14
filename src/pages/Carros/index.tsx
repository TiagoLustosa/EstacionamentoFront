import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { api } from "../../services/api"
import { Container, ModalContainer } from "./styles"
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'

interface Veiculo {
    id: string,
    placa: string,
    dataHoraChegada: Date,
    dataHoraSaida: Date,
    duracao: string,
    valorTotal: number,
    precoId: string
}

interface PlacaIdPreco {
    id: string,
    placa: string    
}

interface Preco {
    id: string,
    valorHora: number,
    valorHoraAdicional: number,
    vigenciaInicio: Date,
    vigenciaFim: Date
}
const customStyles = {
    content: {
        height: '15rem',
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

const placaIdPrecoInicial: PlacaIdPreco = {
    id: '',
    placa: ''
}

let placaIdPrecoPost = {
    precoId: '',
    placa: ''
}

export const Carros = (): JSX.Element => {

    const [veiculos, setVeiculos] = useState<Veiculo[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [precos, setPrecos] = useState<Preco[]>([])
    const [placaIdPreco, setPlacaIdPreco] = useState<PlacaIdPreco>(placaIdPrecoInicial)

    useEffect(() => {
        obterVeiculos()
        obterPrecos()
    }, [])

    const obterVeiculos = async () => {
        const response = await api.get('api/veiculo/obtertodos')
        setVeiculos(response.data)
    }

    const marcarSaida = async (placa: string) => {
        const response = await api.put(`api/veiculo/datasaida/${placa}`)
        obterVeiculos()
    }

    const marcarEntrada = async () => {
        placaIdPrecoPost.precoId = placaIdPreco.id
        placaIdPrecoPost.placa = placaIdPreco.placa
        console.table(placaIdPrecoPost)
        await api.post(`api/veiculo/adicionarveiculo/`, placaIdPrecoPost)
        setModalIsOpen(false)
        obterVeiculos()
    }

    const tempoCobrado = (duracao: string) => {
        const diaHoraMinutos = duracao.split(':')
        const dia = Number(diaHoraMinutos[0]) * 24
        const hora = Number(diaHoraMinutos[1])
        if (Number(diaHoraMinutos[2]) > 10) {
            return `${dia + hora}(adicional)`
        } else if (Number(diaHoraMinutos[2]) < 10) {
            return dia + hora
        }
        return dia + hora
    }
const abrirModal = async () => {
    setModalIsOpen(true)
}

const obterPrecos = async () => {
    const response = await api.get('api/preco/obterprecos')
    setPrecos(response.data)
}

const handleChange = (e: any) => {
    setPlacaIdPreco({
        ...placaIdPreco,
        [e.target.name]: e.target.value
    })
}

const fecharModal = () => {
    setPlacaIdPreco(placaIdPrecoInicial)
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
                <ModalContainer>
                    <FiX color="#FFF" className="direita" size={20} onClick={fecharModal} />
                    <label>Informe a Placa </label>
                    <input type="text" placeholder="ABC-1234" name="placa" value={placaIdPreco.placa} onChange={handleChange} />
                    <label>Selecione a vigência</label>
                    <select name="id" onChange={handleChange}>
                        {precos.map((preco) =>                         
                        <option value={preco.id}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: "short" }).format(Date.parse(preco.vigenciaInicio.toString()))}</option>                        
                        )}                        
                        </select>
                    <Button title="Marcar Entrada" onClick={marcarEntrada} />
                </ModalContainer>
            </Modal>
            <h3>Estacionamento</h3>
            <div className="header">
                <h1>Carro bem guardado</h1>
                <Button title="Marcar Entrada" onClick={abrirModal} />
            </div>
            <table>           
                <thead>                    
                    <tr>
                        <th>Placa</th>
                        <th>Horario de Chegada</th>
                        <th>Horario de Saída</th>
                        <th>Duração(dd:hh:mm)</th>
                        <th>Tempo Cobrado(Hora)</th>
                        <th>Preço</th>
                        <th>Total a Pagar</th>
                        <th>Marcar Saída</th>
                    </tr>
                </thead>
                <tbody>
                    {veiculos.map((veiculo) =>
                        <tr key={veiculo.id}>
                            <th>{veiculo.placa}</th>
                            <th>{new Intl.DateTimeFormat('pt-BR', { timeStyle: "short", dateStyle: "short" }).format(Date.parse(veiculo.dataHoraChegada.toString()))}</th>
                            <th>{veiculo.dataHoraSaida && new Intl.DateTimeFormat('pt-BR', { timeStyle: "short", dateStyle: "short" }).format(Date.parse(veiculo.dataHoraSaida.toString()))}</th>
                            <th>{veiculo.duracao}</th>
                            <th>{veiculo.duracao && tempoCobrado(veiculo.duracao)}</th>
                            <th>{precos.map((preco) => {
                            if(veiculo.precoId === preco.id){
                                return preco.valorHora
                            }}
                            )}</th>
                            <th>{veiculo.valorTotal}</th>
                            <th>{veiculo.dataHoraSaida ? null : <Button title="Saída" onClick={() => marcarSaida(veiculo.placa)} />}</th>
                        </tr>
                    )}           
                </tbody>
            </table>
        </Container>
    )
}

export default Carros