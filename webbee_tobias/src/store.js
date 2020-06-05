import { applyMiddleware, createStore, compose } from "redux"
import { save, load } from "redux-localstorage-simple"
import _ from 'lodash';


const rndId =(len = 30) => {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}

const initialInventoryTypes = [
    {
        inventoryType: 'Cars',
        titleField: 'License plate',
        id: rndId(),
        fields: [
            { name: 'License plate', type: 'text', id: rndId() },
            { name: 'Maximum speed', type: 'number', id: rndId() },
            { name: 'Seats', type: 'number', id: rndId() },
            { name: 'Build at', type: 'date', id: rndId() },
            { name: 'notes', type: 'textarea', id: rndId() },
        ]
    },
    {
        inventoryType: 'Houses',
        titleField: 'Street',
        id: rndId(),
        fields: [
            { name: 'Street', type: 'text', id: rndId() },
            { name: 'Number of apartments', type: 'number', id: rndId() },
            { name: 'postal_code', type: 'text', id: rndId() },
            { name: 'city', type: 'text', id: rndId() },
            { name: 'country', type: 'text', id: rndId() },
            { name: 'notes', type: 'textarea', id: rndId() },
        ]
    },
];

const initialState = {
    inventoryTypes: initialInventoryTypes,

    inventoryItems: [
        { inventoryTypeId: initialInventoryTypes[0].id, data: {}, id: rndId(), }
    ],

    activePage: 'inventory_canvas',

    inventoryCanvas: {
        inventoryTypeFilter: null
    }
};

const ADD_INVENTORY_ITEM = 'add_inventory_item';
const REMOVE_INVENTORY_ITEM = 'remove_inventory_item';
const CHANGE_INVENTORY_ITEM_FIELD_VALUE = 'change_inventory_item_field_value';
const SET_INVENTORY_TYPE_FILTER = 'set_inventory_type_filter';
const SET_ACTIVE_PAGE = 'set_active_page';
const ADD_TYPE = 'add_type';
const REMOVE_TYPE = 'delete_type';
const ADD_TYPE_FIELD = 'add_type_field';
const REMOVE_TYPE_FIELD = 'remove_type_field';
const MODIFY_TYPE_FIELD_NAME = 'modify_type_field_name';
const MODIFY_TYPE_FIELD_TYPE = 'modify_type_field_type';
const MODIFY_TYPE_TITLE_FIELD = 'modify_type_title_field';
const MODIFY_TYPE_NAME = 'modify_type_name';

const mainReducer = (state, action) => {
    console.log('STATE BEFORE '+action.type, action, state);

    const modifyInventoryTypeAtIndex = (inventoryIndex, foo) => {
        const inventoryType = foo(state.inventoryTypes[action.inventoryIndex]);
        const inventoryTypes = [...state.inventoryTypes];
        inventoryTypes[action.inventoryIndex] = inventoryType;
        return { ...state, inventoryTypes };
    };

    const modifyInventoryTypeField = (inventoryIndex, fieldIndex, foo) => {
        return modifyInventoryTypeAtIndex(inventoryIndex, (inventoryType) => {
             const fields = [...inventoryType.fields];
             fields[fieldIndex] = foo(fields[fieldIndex]);

             return {
                 ...inventoryType,
                 fields
             }
        });
    };

    switch(action.type) {
        case ADD_TYPE:
            state = {
                ...state,
                inventoryTypes: [
                    ...state.inventoryTypes,
                    {
                        inventoryType: '',
                        titleField: 'Title',
                        id: rndId(),
                        fields: [
                            { name: 'Title', type: 'text', id: rndId() },
                        ]
                    }
                ]
            };
            break;

        case REMOVE_TYPE:
            const inventoryTypeId = state.inventoryTypes[action.inventoryIndex].id;

            state = {
                ...state,
                inventoryTypes: state.inventoryTypes.filter((v, i) => i !== action.inventoryIndex),
                inventoryItems: state.inventoryItems.filter((v) => v.inventoryTypeId !== inventoryTypeId)
            };
            break;

        case ADD_TYPE_FIELD:
            state = modifyInventoryTypeAtIndex(action.inventoryIndex, (inventoryType) => {
                return {
                    ...inventoryType,
                    fields: [
                        ...inventoryType.fields,
                        {type: action.fieldType, name: '', id: rndId()}
                    ]
                }
            });
            break;
        case REMOVE_TYPE_FIELD:
            state = modifyInventoryTypeAtIndex(action.inventoryIndex, (inventoryType) => {
                return {
                    ...inventoryType,
                    fields: inventoryType.fields.filter((v, i) => i !== action.fieldIndex)
                }
            });
            break;
        case MODIFY_TYPE_NAME:
            state = modifyInventoryTypeAtIndex(action.inventoryIndex, (inventoryType) => {
                return {
                    ...inventoryType,
                    inventoryType: action.inventoryType
                }
            });
            break;
        case MODIFY_TYPE_TITLE_FIELD:
            state = modifyInventoryTypeAtIndex(action.inventoryIndex, (inventoryType) => {
                return {
                    ...inventoryType,
                    titleField: action.titleField
                }
            });
            break;
        case MODIFY_TYPE_FIELD_NAME:
            state = modifyInventoryTypeField(action.inventoryIndex, action.fieldIndex, (field) => {
                return {
                    ...field,
                    name: action.name
                }
            });
            break;
        case MODIFY_TYPE_FIELD_TYPE:
            state = modifyInventoryTypeField(action.inventoryIndex, action.fieldIndex, (field) => {
                return {
                    ...field,
                    type: action.fieldType
                }
            });
            break;

        case ADD_INVENTORY_ITEM:
            state = {
                ...state, inventoryItems: [...state.inventoryItems,
                    {
                        inventoryTypeId: action.inventoryTypeId,
                        id: rndId(),
                        data: {}
                    }
                ]
            };
            break;
        case REMOVE_INVENTORY_ITEM:
            state = {
                ...state,
                inventoryItems: state.inventoryItems.filter((v, i) => i !== action.inventoryIndex)
            };
            break;

        case CHANGE_INVENTORY_ITEM_FIELD_VALUE:
            let inventoryField = {...state.inventoryItems[action.inventoryIndex]};
            let inventoryFieldData = {...inventoryField.data, [action.name]: action.value};
            inventoryField.data = inventoryFieldData;
            const inventoryItems = [...state.inventoryItems];
            inventoryItems[action.inventoryIndex] = inventoryField;

            state = { ...state, inventoryItems };
            break;
        case SET_INVENTORY_TYPE_FILTER:
            state = {
                ...state,
                activePage: 'inventory_canvas',
                inventoryCanvas: {
                    ...state.inventoryCanvas,
                    inventoryTypeFilter: action.inventoryTypeFilter
                }
            };
            break;
        case SET_ACTIVE_PAGE:
            state = {
                ...state,
                activePage: action.activePage
            }
            break;
    }

    console.log('STATE AFTER '+action.type, action, state);

    return state;
};

const theStore = createStore(
    mainReducer,
    load({
        preloadedState: initialState
    }),
    compose(
        applyMiddleware(save())
    )
);

const addInventoryItem = (inventoryTypeId) => {
    return { type: ADD_INVENTORY_ITEM, inventoryTypeId }
};

const removeInventoryItem = (inventoryIndex) => {
    return { type: REMOVE_INVENTORY_ITEM, inventoryIndex }
};

const changeInventoryItemFieldValue = (inventoryIndex, name, value) => {
  return {type: CHANGE_INVENTORY_ITEM_FIELD_VALUE, inventoryIndex, name, value};
};

const setInventoryTypeFilter = (inventoryTypeFilter) => {
  return {type: SET_INVENTORY_TYPE_FILTER, inventoryTypeFilter};
};

const setActivePage = (activePage) => {
  return { type: SET_ACTIVE_PAGE, activePage };
};

const addType = () => {
    return {type:ADD_TYPE };
};

const removeType = (inventoryIndex) => {
    return {type: REMOVE_TYPE, inventoryIndex};
};

const addTypeField = (inventoryIndex, fieldType) => {
    return { type: ADD_TYPE_FIELD, inventoryIndex, fieldType };
};

const removeTypeField = (inventoryIndex, fieldIndex) => {
    return { type: REMOVE_TYPE_FIELD, inventoryIndex, fieldIndex };
};

const modifyTypeFieldName = (inventoryIndex, fieldIndex, name) => {
    return { type: MODIFY_TYPE_FIELD_NAME, inventoryIndex, fieldIndex, name };
};

const modifyTypeFieldType = (inventoryIndex, fieldIndex, fieldType) => {
    return { type: MODIFY_TYPE_FIELD_TYPE, inventoryIndex, fieldIndex, fieldType };
};

const modifyTypeTitleField = (inventoryIndex, titleField) => {
    return { type: MODIFY_TYPE_TITLE_FIELD, inventoryIndex, titleField };
};

const modifyTypeName = (inventoryIndex, inventoryType) => {
    return { type: MODIFY_TYPE_NAME, inventoryIndex, inventoryType };
};

/*
const MODIFY_TYPE_TITLE_FIELD = 'modify_type_title_field';
const MODIFY_TYPE_NAME = 'modify_type_name';
 */

export {
    theStore,
    addInventoryItem,
    removeInventoryItem,
    changeInventoryItemFieldValue,
    setInventoryTypeFilter,
    setActivePage,
    addType,
    removeType,
    addTypeField,
    removeTypeField,
    modifyTypeFieldName,
    modifyTypeFieldType,
    modifyTypeTitleField,
    modifyTypeName,
}