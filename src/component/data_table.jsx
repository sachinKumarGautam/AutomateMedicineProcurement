import React from 'react';
import DataTables from 'material-ui-datatables';

class Users extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.MRP}</li>
                ))}
            </ul>
        );
    }
}
export default Users;