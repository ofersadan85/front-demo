import { useEffect, useRef, useState } from "react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export type User = {
    id: number
    username: string
    password: string
    email: string | null
    age: number | null
}

export type PublicUser = {
    id: number
    username: string
    email: string | null
    age: number | null
}

export type NewUser = {
    username: string
    password: string
    email: string | null
    age: number | null
}

type userFormProps = { setRefresh: React.Dispatch<React.SetStateAction<boolean>> }
type userRowProps = { user: PublicUser, setRefresh: React.Dispatch<React.SetStateAction<boolean>> }

export function userRow(user: PublicUser) {
    const deleteImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Xbox_X_button_%28B%2BW%29.svg/70px-Xbox_X_button_%28B%2BW%29.svg.png";

    function deleteRow() {
        const deleteURL = BACKEND_URL + "/users/" + user.id;
        console.log("Deleting Row", deleteURL);
        fetch(deleteURL, { method: "DELETE" })
            .then(() => console.log("Deleted - please refresh"))
            .catch(() => console.log("Failed to delete!"));
    }

    // TODO: Delete this row when it is done deleting in DB

    return <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td><img src={deleteImg} width={18} onClick={deleteRow} /></td>
    </tr>;
}

// export function UserTable({ refresh }: { refresh: boolean }) {
// export function UserTable(properties: { refresh: boolean }) {
// type userTableProps = { refresh: boolean }
// export function UserTable(properties: userTableProps) {
export function UserTable(properties: { refresh: boolean }) {
    const [users, setUsers] = useState<PublicUser[]>([]);

    useEffect(() => {
        const url = BACKEND_URL + "/users";
        fetch(url)
            .then(response => response.json())
            .then((users: PublicUser[]) => setUsers(users))
    }, [properties.refresh]);

    // TODO: Add validation for users - if the user is not valid, don't display it or display an error message
    // TODO: Add a loading spinner animation while the users are being fetched

    return <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            {users.map(userRow)}
        </tbody>
    </table>;
}


export function RefreshUsersButton({ setRefresh }: userFormProps) {
    return <button onClick={() => {
        console.log("This should be in DEV mode only")
        setRefresh(previous => !previous);
    }}>Refresh Users</button>
}


export function CreateUserForm({ setRefresh }: userFormProps) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    function createUser() {
        const userData: NewUser = {
            username: usernameRef.current?.value || "",
            password: passwordRef.current?.value || "",
            email: emailRef.current?.value || null,
            age: Number(ageRef.current?.value) || null
        };
        fetch(BACKEND_URL + "/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(() => { setRefresh(previous => !previous) })
            .catch(() => { alert("Could not create a new user, try again.") })
    }

    return <>
        <input type="text" name="username" placeholder="Username" ref={usernameRef} />
        <input type="password" name="password" placeholder="Password" ref={passwordRef} />
        <input type="email" name="email" ref={emailRef} />
        <input type="number" name="age" ref={ageRef} />
        <button onClick={createUser}>Add User</button>
        {import.meta.env.DEV && <RefreshUsersButton setRefresh={setRefresh} />}
        {/* {import.meta.env.DEV ? <RefreshUsersButton setRefresh={setRefresh} /> : null } */}
    </>;
}

export default function App() {
    const [refresh, setRefresh] = useState(true);
    return <>
        <CreateUserForm setRefresh={setRefresh} />
        <UserTable refresh={refresh} />
    </>
}
