import DatePicker from 'react-date-picker'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #FFF;
    h3 {
        margin-top: 1rem;
    }
    .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between; 
    }   
    
    Button {        
        background: #007000;
        color: #FFF;
        border: 0;
        border-radius: 1rem;
        width: 10rem;
        height: 2rem;
        transition: filter 0.2;
        font-weight: bold;

        &:hover {
            filter: brightness(0.8);
        }
    }
    table{
        margin-top: 2rem;
        border-collapse: collapse;
    }
    td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 0.5rem;
}     
`

export const ModalContainer = styled.div`
display: flex;
flex-direction: column;
width: 15rem;
label {
    font-weight: bold;
}
input {
    border-radius: 0.3rem;
    height: 2rem;
    border: 0;
}
 Button {        
        margin-top: 2rem;
        background: #007000;
        align-self: center;
        color: #FFF;
        border: 0;
        border-radius: 1rem;
        width: 10rem;
        height: 2rem;
        transition: filter 0.2;
        font-weight: bold;    
        &:hover {
            filter: brightness(0.8);
        }  
    }
    .direita {
        align-self: flex-end;
        cursor: pointer;
    }  
`

export const Wrapper = styled(DatePicker)`
    border-radius: 0.3rem;
    background: #FFF;
    color: black;
    height: 2rem;
    outline: none;
    border: 0;
    input {
        outline: none;
        border: 0;
    }
`