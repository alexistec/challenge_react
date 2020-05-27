import React from 'react';
import {Button} from '@material-ui/core';
import {Formik,Form,Field} from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { MyField } from '../../components/MyField';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root:{
        minWidth:275
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display:'flex'
    }
}))


interface Values{
    description: string;
    amount : number;
    date : string;
}

interface IProps {
    onSubmit : (values:Values) => void
};

export const FormTransactions: React.FC<Props> = ({onSubmit}) => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.root}>
                <Formik
                    style={classes.form} 
                    initialValues={{description:'',amount:'',date:''}} 
                    onSubmit={ values =>{
                        onSubmit(values)
                    }}
                >
                    {({values,handleChange,handleBlur})=>(
                        <Form>
                            <div>
                                <Field label="Description" name="description" placeholder="Description" component={MyField}/>
                            </div>
                            <div>
                                <Field label="Amount" name="amount" placeholder="Amount" component={MyField}/>
                            </div>
                            <div>
                                <Field type="date" defaultValue="2017-05-24" label="Date" name="date" placeholder="Date" component={MyField}/>
                            </div>
                            <Button  style={{ marginTop:20,marginBottom:20}} type="submit" color="primary" variant="contained">SAVE</Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}


export default FormTransactions;