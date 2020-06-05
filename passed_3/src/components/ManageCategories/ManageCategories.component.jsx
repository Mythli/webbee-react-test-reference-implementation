import React from "react";
import { Button, Col, Navbar, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import CategoryComponent from './Category/Category.component';
import { addNewCategory } from '../../store/actions.js';

const ManageCategories = ({ categories = [], addNewCategory }) => {
    const categoryDom = categories.map((category, i) => <CategoryComponent editMode={true} key={ category.id } category={category} />);
    const CreateButton = () => (
        <Button className="ml-auto" variant="success" onClick={ () => {
            addNewCategory({});
        } }>Add New Category</Button>
    );
    return <Row>
        { categoryDom }
        {
                categoryDom.length === 0
                && <Col className="text-center">
                    Nothing to Display. Start by Adding some items <br /> <br />
                    <CreateButton />
                </Col>
        }
        <Navbar fixed="bottom" className="border-top footer-nav">
            <CreateButton />
        </Navbar>
    </Row>
}

const mapStateToProps = state => {
    return {
        categories: state.categoryReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewCategory: () => { dispatch(addNewCategory()) }
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategories)