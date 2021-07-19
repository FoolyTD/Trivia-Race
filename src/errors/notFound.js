import {useHistory} from 'react-router-dom';

export default function NotFound() {
    const history = useHistory();

    return (
        <div>
          <h1>Page Not Found</h1>
        <button onClick={()=>history.push("/home")}>Go Home</button>  
        </div>
    )
}