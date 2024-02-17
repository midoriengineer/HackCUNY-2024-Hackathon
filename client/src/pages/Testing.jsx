import { useState, useEffect } from "react";

const Testing = () => {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/testing").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    return ( 
        <div>
            <ul>
                <li>{data.testing1}</li>
                <li>{data.testing2}</li>
            </ul>
        </div>
     );
}
 
export default Testing;