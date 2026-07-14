import { useEffect, useState } from "react";

interface IResponseData {
    id: string;
    title: string;
    body: string;
}

const Datable = () => {

    const [fetchData,setFetchData] = useState([]);
    const [page,setPage] = useState(0);
    const [search,setSearch] = useState("");
    const [debounceSearch,setDebounceSearch] = useState("");
    const rowsPerPage = 10;

    useEffect(() => {
        (async () => { 
            const responseData = await fetch("https://jsonplaceholder.typicode.com/posts");
            const res = await responseData.json();
            setFetchData(res);        
        })();
    }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceSearch(search);
        },300)

        return ()=> clearTimeout(timer);
    },[search])

    const filteredData = fetchData?.filter((item: IResponseData)=>{
        return item.title.toLowerCase().includes(debounceSearch.toLowerCase())
    })

    const handleNext = ()=>{
        setPage((prev)=> prev < totalPages -1 ? prev + 1 : prev);
    }

    const handlePrev = ()=>{
        setPage((prev)=> {
            if(prev !== 0) return prev - 1
            return prev;
        });
    }

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1>Datatable</h1>
            <input type="text" placeholder="search here ..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{
                width: "300px",
                padding: "10px 20px"
            }}
            />
            </div>
        <table>
           <thead>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Body</td>
            </tr>
           </thead>
           <tbody>
            {
                filteredData?.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)?.map((val: IResponseData)=>{
                    return <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.title}</td>
                        <td>{val.body}</td>
                    </tr>
                })
            }
           </tbody>
        </table>

        <div style={{
            display: "flex",
            gap: "10px"
        }}>
            <button onClick={handlePrev} disabled={page === 0}>prev</button>
            {
                Array.from({length: totalPages},(_,i)=>(
                    <button
                    key={i}
                    className={page === i ? "btn-active" : ""}
                    onClick={()=>setPage(i)}
                    >
                        {i + 1}
                    </button>
                ))
            }
            <button onClick={handleNext} disabled={page === totalPages - 1}>next</button>
        </div>
            <h1 style={{display: "flex",justifyContent: "center"}}>Page {page + 1} of {totalPages}</h1>
        </div>
    )
}

export default Datable