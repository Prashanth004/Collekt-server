import React from 'react'

function TestTemp(props) {
    const {listName} =props;
    console.log("ListNames : ",listName)
    // return (<div>{ListNames.map(listName=>(<p>{listName}</p>))}</div>)
    return(<p>{listName.List_name}</p>)
}

export default TestTemp
