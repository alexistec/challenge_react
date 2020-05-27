import React ,{useState} from 'react';
import {NextPage,GetStaticProps} from 'next';
import axios  from 'axios';
import Router from 'next/router';
import ListTransaction from '../components/ListTransaction';
import ModalDialog from '../components/Dialog';
import {
    Card,
    Button,
    CardHeader,
} from '@material-ui/core';



interface Props{
    transactions:[],
    deleteTransactions : () => void
}

const Index: NextPage<Props> = (props) => {
    //console.log(props);
    const [open,setOpen] = useState(false);
    const [idTransaction,setIdTransaction]  = useState('');
    
    const deleteTransactions = (id:string) => {
        setOpen(true);
        setIdTransaction(id)
    }

    const handleClose = () => {
        setOpen(false);
        setIdTransaction('');
    }

    const handleDelete = () =>{
        fetch(`http://localhost:3000/api/transactions/${idTransaction}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
            Router.push('/');
            handleClose();
        })
        .catch(err=>{
            console.error('err', err)
        })  
    }

    return (
        <div>
            <Card>
                <CardHeader
                    action={
                        <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            href="/transactions/new"
                        >
                            New transaction
                        </Button>
                    }
                    title="Historial transacction"
                />
            </Card>
            <ListTransaction 
                item={props.transactions} 
                action={deleteTransactions}
            />
            <ModalDialog
                message={idTransaction}
                openModal={open}
                onConfirm={handleDelete}
                handlerClose={handleClose}
            />
        </div>
    );
};


const fetchData = async ()=> {
    const response = await axios.get('http://localhost:3000/api/transactions',
                                    {headers:{'Content-Type':'application/json'}});
    const transactions =  await response.data;
    return transactions;
    
}

export const getStaticProps : GetStaticProps<Props>  = async (context)=>{
    const data = await fetchData()
    return{
        props:{
            transactions:data,
        }
    }
}

export default Index;
