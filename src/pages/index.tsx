import React ,{useState} from 'react';
import {NextPage,GetStaticProps} from 'next';
import axios  from 'axios';
import Router from 'next/router';
import ListTransction from '../../components/ListTransacction';
import {
    Card,
    Button,
    CardHeader,
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        Router.push('/');
    }

    const handleDelete = () =>{
        fetch(`http://localhost:3000/api/transactions/${idTransaction}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
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
                            New transacction
                        </Button>
                    }
                    title="Historial transacction"
                />
            </Card>
            <ListTransction 
                item={props.transactions} 
                action={deleteTransactions}
            />
            {/*ESto aun componente aparte*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="secondary" autoFocus  onClick={handleDelete}>
                        Yes, sure
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


const fetchData = async ()=> {
    const respuesta = await axios.get('http://localhost:3000/api/transactions',{headers:{'Content-Type':'application/json'}});
    const transactions =  await respuesta.data;
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
