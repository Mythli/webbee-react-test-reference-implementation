import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Col, Navbar, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import InventoryItem from './InventoryItem/InventoryItem.component';
import { usePrevious } from '../../utils'

const InventoryList = ({ inventory = [] }) => {
    const { categoryId } = useParams();
    const [newitem, setNewitem] = useState(null);
    const oldInventory = usePrevious([...inventory])
    const CreateButton = () => (
        <Button className="ml-auto" variant="success" onClick={ () => {
            setNewitem({ name: '', category: null, fields: {} });
        } }>Add New Item</Button>
    )
    useEffect(() => {
        if (newitem && inventory.length > oldInventory.length) {
            setNewitem(null);
        }
    }, [newitem, inventory, oldInventory]);
    const inventoryMap = inventory.filter((item) => (
        !categoryId || item.category === categoryId
    )).map((item, i) => <InventoryItem key={ item.id } item={item} />);
    return <>
        <Row>
            { inventoryMap }
            {
                inventoryMap.length === 0
                && !newitem
                && <Col className="text-center">
                    Nothing to Display. Start by Adding some items <br /> <br />
                    <CreateButton />
                </Col>
            }
            {
                newitem &&
                <InventoryItem isNew={newitem} item={newitem} />
            }
        </Row>

        <Navbar fixed="bottom" className="border-top footer-nav">
            <CreateButton />
        </Navbar>
    </>
}

const mapStateToProps = state => {
    return {
        inventory: state.inventoryReducer
    }
}
  

export default connect(mapStateToProps)(InventoryList)