import * as React from "react";
import {FieldProps} from "formik";
import { TextField } from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";

export const MyField: React.FC<FieldProps & TextFieldProps>  = ({placeholder,defaultValue,type,label,field})=>{
    return(
        <TextField 
            id="outlined-basic"
            defaultValue={defaultValue}
            type={type}
            label={label} 
            placeholder={placeholder} 
            {...field} 
            onChange={field.onChange}
        />
    )
}