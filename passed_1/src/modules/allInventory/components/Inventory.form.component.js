import React, {
  PureComponent,
} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Formik } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClearIcon from '@material-ui/icons/Clear';
import { Input, Label } from "../../../common/components";
import { INPUT_TYPE_ENUM } from '../../../constant';
import { modifyInventory, deleteInventory } from '../actions';
import { getObjectType } from '../../inventory/selector/index.selector';


export const FormikForm = ({
   values,
   errors,
   isValid,
   dirty,
   touched,
   setFieldValue,
   setFieldTouched,
   initialValues,
   handleSubmit,
   data,
   modifyInventory
 }) => {
  const fields = data.fields;
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          {fields.map((datum) => {
            let type = "text";
            if(datum.type === INPUT_TYPE_ENUM.NUMBER){
              type = 'number';
            }
            if(datum.type === INPUT_TYPE_ENUM.DATE){
              type = 'date';
            }
            return (
              <Col key={datum.id} xs={12} className={"field-row"}>
                <Label>{datum.name}</Label>
                <Input type={type} value={datum.value} onChange={(e) => modifyInventory({inventoryId: data.id, id: datum.id, value: e.target.value })} />
              </Col>
            )
          })}
        </Row>
      </form>
    </Container>
  );
};

class InventoryTypeFormComponent extends PureComponent {

  _onFilterFormSubmit(
    values,
    actions
  ) {

  }

  render() {
    const { className, data, objectType, deleteInventory } = this.props;
    const { title, id, fields } = data;
    const { titleFieldId } = objectType;
    const titlePartFromFieldValue = fields.find((datum) => { return datum.id === titleFieldId})?.value ?? '';
    return (
      <div className={className}>
        <h4>{`${title} - ${titlePartFromFieldValue}`}</h4>
        <button className="close-btn" onClick={()=> deleteInventory(id)}>
          <ClearIcon />
        </button>
        <Formik
          enableReinitialize
          onSubmit={(
            values,
            actions
          ) => {
            this._onFilterFormSubmit(values, actions);
          }}
          render={(formikProps) => {
            return (
              <FormikForm
                {...formikProps}
                {...this.props}
                {...this.state}
              />
            );
          }}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = (state, props) => {
  const objectId = props.data.objectTypeId;
  const objectType = getObjectType(state, objectId);
  return {
    objectType: objectType
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      modifyInventory,
      deleteInventory
    },
    dispatch
  );
};

export const InventoryTypeForm = styled(
  connect(mapStateToProps, mapDispatchToProps)(InventoryTypeFormComponent)
)`
  width: 300px;
  border: solid 1px #ccc;
  margin-right: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 10px;
  .field-row {
    margin-bottom: 10px;
  }
  h4 {
    min-height: 40px;
    background: #f7f7f7;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    margin-bottom: 15px;
    font-size: 16px;
    padding: 10px;
    border-bottom: solid 1px #ccc;
    word-break: break-all;
    padding-right: 30px;
  }
  .action-dropdown {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  .input-col {
    float: left;
    width: 60%;
  }
  .dropdown-col {
    float: left;
    width: 40%;
    button {
     width: 100%;
    }
  }
  .close-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    background: transparent;
    border: none;
  }
`;
