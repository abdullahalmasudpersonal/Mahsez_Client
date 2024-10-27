import { useEffect, useState } from "react"

const UseHomeFeaturedCategory = () =>{
    const [homeFCategory, setHomeFCategory] = useState([]);
    useEffect( () =>{
        fetch(`HFCategory.json`)
        .then(res => res.json())
        .then(data => setHomeFCategory(data))
    }, []);
    return [ homeFCategory, setHomeFCategory];
}

export default UseHomeFeaturedCategory;