import React  from 'react';
import styled from 'styled-components';
import { Field } from 'formik';


const CustomInput = styled(({className, field, form, ...props}) => {
  return (
    <div className={className}>
      <select {...field} {...props} />
    </div>
  );
})`
select {
  border: solid 1px #dedede;
  height: 33px;
  width: 100%;
  border-radius: 4px;
  background: transparent; 
}


`;

export const Select = (props) => {
  return <Field {...props} component={CustomInput}/>
}




