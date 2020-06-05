import React, {
  PureComponent,
} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Formik, FieldArray } from 'formik';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClearIcon from '@material-ui/icons/Clear';
import uniqid from 'uniqid';
import { Input, Label, Select } from "../../../common/components";
import { modifyObjectTypeValues, addObjectFieldType, modifyObjectFieldType, modifyObjectTitle, deleteObjectType } from "../actions";
import { INPUT_TYPE_ENUM, INPUT_TYPE_ENUM_VALUE } from '../../../constant';
import { getFieldList } from '../selectors/index.selector';


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
   modifyObjectTypeValues,
   data,
   handleObjectFieldType,
   modifyObjectFieldType,
   modifyObjectTitle
 }) => {

  const _handleObjectStaticFields = (name, value) => {
    const { id } = data;
    modifyObjectTypeValues({id, name, value})
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} className={"field-row"}>
              <Label>Object Type</Label>
              <Input value={values.objectType} onChange={ (e) => _handleObjectStaticFields('name', e.target.value)} />
          </Col>
          <Col xs={12} className={"field-row"}>
              <Label>Object Title</Label>
              <Select value={values.objectTitleId} onChange={(e)=> modifyObjectTitle({id: e.target.value, objectTypeId: data.id })}>
                {values.fields.map((datum) => {
                  return (
                    <option key={datum.id} value={datum.id}>{datum.name}</option>
                  )
                })}
              </Select>
          </Col>
          <Col xs={12} className={"field-row"}>
            <Label>Fields</Label>
            <FieldArray
              name="fields"
              render={() => (
                <div>
                  {values.fields.map((datum) => {
                    const { id, inputType, name } = datum;
                    return (
                      <div className="field-row clearfix" key={datum.id}>
                        <div>
                          <div className="input-col">
                            <Input placeholder={"Enter field name"} value={datum.name} onChange={(e) => modifyObjectFieldType({id, inputType, name: e.target.value })} />
                          </div>
                          <div className="dropdown-col">
                            <Dropdown>
                              <Dropdown.Toggle variant="secondary" id={`dropdown-${datum.id}`}>
                                {INPUT_TYPE_ENUM_VALUE[datum.inputType]}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {Object.keys(INPUT_TYPE_ENUM).map((datum, index) => {
                                  const label = INPUT_TYPE_ENUM_VALUE[datum];
                                  return <Dropdown.Item key={index} onClick={() => modifyObjectFieldType({id, inputType: datum, name })}>{label}</Dropdown.Item>
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  )}
                </div>
              )}
            />
          </Col>
          <Col xs={12} className={"field-row"}>
            <Dropdown className={"action-dropdown"}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Add Field
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(INPUT_TYPE_ENUM).map((datum, index) => {
                  const label = INPUT_TYPE_ENUM_VALUE[datum];
                  return <Dropdown.Item key={index} onClick={() => handleObjectFieldType(datum)}>{label}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

class ObjectTypeFormComponent extends PureComponent {

  componentDidMount(){
    const { fields } = this.props;
    if(!fields.length){
      this._handleObjectFieldType(INPUT_TYPE_ENUM.SMALL_TEXT, 'Title');
    }
  }

  _handleObjectFieldType = (inputType, name) => {
    const { data, addObjectFieldType } = this.props;
    const id = uniqid();
    addObjectFieldType({objectTypeId: data.id, id, inputType: inputType, name })
  }


  _onFilterFormSubmit(
    values,
    actions
  ) {

  }

  render() {
    const { className, data, fields, deleteObjectType } = this.props;
    const { name, id } = data;
    const objectTitleObj = fields.find((datum) => datum.id === data.titleFieldId) || '';
    return (
        <div className={className}>
          <h4>{name}</h4>
          <button className="close-btn" onClick={() => deleteObjectType(id)}>
            <ClearIcon />
          </button>
          <Formik
          enableReinitialize
          initialValues={{
            objectType: name,
            objectTitleId: objectTitleObj?.id ?? '',
            fields: fields
          }}
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
                handleObjectFieldType={this._handleObjectFieldType}
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
  const fields = getFieldList(state, props.data.id);
  return {
    fields
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      modifyObjectTypeValues,
      addObjectFieldType,
      modifyObjectFieldType,
      modifyObjectTitle,
      deleteObjectType
    },
    dispatch
  );
};

export const ObjectTypeForm = styled(
  connect(mapStateToProps, mapDispatchToProps)(ObjectTypeFormComponent)
)`
  width: 300px;
  border: solid 1px #ccc;
  margin-right: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;   
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
