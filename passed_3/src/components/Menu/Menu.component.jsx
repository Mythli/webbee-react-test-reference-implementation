import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

const Menu = ({ categories }) => {
    const location = useLocation();
    const activeId = location.pathname.split('/')[1];
    return (
        <Nav
            activeKey={ '/' + location.pathname.split('/')[1] }
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            {
                categories.map((category) => {
                    return (
                        !category.saved ? null :
                        <Nav.Item key={category.id}>
                            <Nav.Link as={ Link } to={`/${category.id}`} active={activeId === category.id}>{ category.name }</Nav.Link>
                        </Nav.Item>
                    )
                })
            }
            <Nav.Item>
                <Nav.Link as={ Link } active={ activeId === 'manage-categories' } to="manage-categories">Manage Categories</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

const mapStateToProps = state => {
    return {
        categories: state.categoryReducer
    }
}

export default connect(mapStateToProps)(Menu);