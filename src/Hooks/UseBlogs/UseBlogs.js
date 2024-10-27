import { useEffect, useState } from "react"

const UseBlgos = () =>{
    const [blgos, setBlogs] = useState([]);
    useEffect( () =>{
        fetch(`http://localhost:5000/api/v1/blogs`)
        .then(res => res.json())
        .then(data => setBlogs(data));
    }, []);
    return [blgos,setBlogs];
}

export default UseBlgos;