import React from "react";

export default function TableHead(): JSX.Element {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
                <th>Edit User</th>
                <th>Create User</th>
            </tr>
        </thead>
    )
}
