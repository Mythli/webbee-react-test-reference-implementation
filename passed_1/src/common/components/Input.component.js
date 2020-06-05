import React  from 'react';
import styled from 'styled-components';
import { Field } from 'formik';


const CustomInput = styled(({className, field, form, ...props}) => {
  return (
    <div className={className}>
      <input {...field} {...props} />
    </div>
  );
})`
input {
  border: solid 1px #dedede;
  padding: 5px;
  width: 100%;
  border-radius: 4px;
}


`;

export const Input = (props) => {
  return <Field {...props} component={CustomInput}/>
}




