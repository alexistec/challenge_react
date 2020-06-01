import React from 'react';
import {Button} from '@material-ui/core';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Alert } from '@material-ui/lab';
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
                    onSubmit={(values,actions) =>{
                        onSubmit(values)
                    }}
                    validate={values =>{
                        const errors = {};
                        if(!values.description){
                            errors.description = 'Required description';
                        }
                        if(!values.amount){
                            errors.description = 'Required amount';
                        }
                        if(!values.date){
                            errors.description = 'Required date';
                        }

                        return errors;
                    }}
                >
                    {({values,handleChange,handleBlur})=>(
                        <Form>
                            <div>
                                <Field type="text" label="Description" defaultValue="" name="description" placeholder="Description" component={MyField}/>
                            </div>
                            <div>
                                <Field type="number" label="Amount" defaultValue="" name="amount" placeholder="Amount" component={MyField}/>
                            </div>
                            <div>
                                <Field type="date"  defaultValue="" name="date" placeholder="Date" component={MyField}/>
                            </div>
                            <ErrorMessage
                                style={{marginTop:10}}
                                name="description"
                                render={ msg =>
                                    <Alert severity="error">{msg}</Alert>
                                }
                            />
                            <Button  style={{ marginTop:20,marginBottom:20}} type="submit" color="primary" variant="contained">SAVE</Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}


export default FormTransactions;