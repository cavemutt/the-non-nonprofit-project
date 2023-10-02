import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
// import apiRequest from './apiRequest';

export default function Signup() {

    return (
        <div className="signup-page">
            <Header />
            <SignupForm />
            <OrgTable />

        </div>
    )
} 

function Header() {
    return (
        <header>
            <h2>Signup page</h2>
        </header>
    )
}

function SignupForm() {
    const [newOrgName, setNewOrgName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newOrgType, setNewOrgType] = useState('')

    async function handleSubmitNew() {
        const newOrg = {
            orgName: newOrgName,
            contactName: newContactName,
            orgType: newOrgType
        }
        console.log(newOrg)
        // e.preventDefault()
        try {
            await fetch('https://6510b7753ce5d181df5d78c0.mockapi.io/companies/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newOrg) 
            })
            .then(data => console.log(data))
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="signup-form">
        <form onSubmit={handleSubmitNew}>
            <label htmlFor="orgname">Organization Name : </label>
            <input id="orgname" name="orgname" type="text" placeholder="organization name" onChange={e => setNewOrgName(e.target.value)} />
            <label htmlFor="contact-name">Contact Name : </label>
            <input id="contact-name" type="text" placeholder="full name of contact" onChange={e => setNewContactName(e.target.value)} />
            <label htmlFor="org-type">Type of Organization :</label>
            <select id="org-type" onChange={e => {setNewOrgType(e.target.value)}}>
                <option value="charity">501c3 Charity Organization</option>
                <option value="applying">currently applying for 501c3 status</option>
                <option value="helper">Self-funded to help others</option>
                <option value="self">Seeking help for myself</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

function OrgTable() {
    // const [orgId, setOrgId] = useState('')
    // const [orgName, setOrgName] = useState('')
    // const [contactName, setContactName] = useState('')
    // const [orgType, setOrgType] = useState('')
    const [orgData, setOrgData] = useState([])
    

    async function getOrgs() {
        try {
            await fetch('https://6510b7753ce5d181df5d78c0.mockapi.io/companies/')
            .then(data => data.json())
            .then(data => setOrgData(data))
            
        } catch(err) {
            console.log(err)
        }
        
    
        // setOrgId(data[0].id)
        // setOrgName(data[0].orgName)
        // setContactName(data[0].contactName)
        // setOrgType(data[0].orgType)
    }

    useEffect(() => {
        getOrgs()
    }, [])
    console.log(orgData)
    return (
        <div className="table-container">
        <Table striped hover responsive variant="dark">
          <thead>
            <tr>
              <th>Id#</th>
              <th>Organization Name</th>
              <th>Contact Name</th>
              <th>Organization Type</th>
            </tr>
          </thead>
          <tbody>
              {console.log(orgData)} 
                {orgData.map(org => {
                    return (
                        <Org orgData={org} key={org.id} />
                    )
                })}
          </tbody>
        </Table>

    </div>
    )
}


function Org({ orgData }) {

    const [updateOrg, setUpdateOrg] = useState([])
    const [isToUpdate, setIsToUpdate] = useState(false)
    const [updateOrgName, setUpdateOrgName] = useState('')
    const [updateContactName, setUpdateContactName] = useState('')
    const [updateOrgType, setUpdateOrgType] = useState('')

    async function handleUpdate(e, id) {
        e.preventDefault()
        try {
            await fetch(`https://6510b7753ce5d181df5d78c0.mockapi.io/companies/${id}`)
            .then(data => data.json())
            .then(data => setUpdateOrg(data))
            .then(setIsToUpdate(true))
        } catch (err) {
            console.log(err)
        }

    }

    async function handleDelete(id) {
        console.log(id)
        try {
            await fetch(`https://6510b7753ce5d181df5d78c0.mockapi.io/companies/${id}`, {
                method: 'DELETE'
            }
            )
            .then(data => data.json())        
        } catch(err) {
            console.log(err)
        }
    }

    async function handleUpdateReq(e) {
        const updatedOrg = {
            id: updateOrg.id,
            orgName: updateOrgName,
            contactName: updateContactName,
            orgType: updateOrgType
        }
        e.preventDefault()
        await fetch(`https://6510b7753ce5d181df5d78c0.mockapi.io/companies/${updateOrg.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedOrg)
        })
        .then(alert('updated'))
        .catch(error => console.log(error))
    }

    return (
        <>
        <tr>
            <td>{orgData.id}</td>
            <td>{orgData.orgName}</td>
            <td>{orgData.contactName}</td>
            <td>{orgData.orgType}</td>
            <td>
                <button onClick={e => handleUpdate(e, orgData.id)}>Update</button>
                <button onClick={() => handleDelete(orgData.id)}>Delete</button>
            </td>
        </tr>
        {isToUpdate ? 
            <>
                <tr>
                    <td colSpan={5}>
                        Make updates below :
                    </td>
                </tr>
                <tr>
                    <td colSpan={5} className='update-form'>
                        <form onSubmit={handleUpdateReq}>
                            <div>
                            <p>Org Id# : {updateOrg.id}</p>
                            <label htmlFor="update-name">Organization Name : </label>
                            <input value={updateOrgName || updateOrg.orgName} id="update-name" type="text" onChange={e => setUpdateOrgName(e.target.value)} />
                            <br />
                            <label htmlFor="update-contact">Contact Name : </label>
                            <input value={updateContactName || updateOrg.contactName} id="update-contact" type="text" onChange={e => setUpdateContactName(e.target.value)} />
                            <br />
                            <label htmlFor="update-type">Type of Organization :</label>
                            </div>
                            <div>
                            <select id="update-type" value={updateOrgType || updateOrg.orgType} onChange={e => setUpdateOrgType(e.target.value)}>
                                <option value="charity">501c3 Charity Organization</option>
                                <option value="applying">currently applying for 501c3 status</option>
                                <option value="helper">Self-funded to help others</option>
                                <option value="self">Seeking help for myself</option>
                            </select>
                            <br />
                            <br />
                            <button type="submit">Update</button>

                            </div>
                        </form>
                    </td>
                </tr>
            </>
         : null}
        </>
    )
}

Org.propTypes = {
    orgData: PropTypes.object,
    id: PropTypes.string,
    orgName: PropTypes.string,
    contactName: PropTypes.string,
    orgType: PropTypes.string
}


