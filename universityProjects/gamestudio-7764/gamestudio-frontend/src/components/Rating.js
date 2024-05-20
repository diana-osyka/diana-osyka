import Table from "react-bootstrap/Table";
export function Rating({rating}){
    return(
        <h1 style={{float: 'right', textAlign: 'right'}}>{rating.toFixed(2)} ⭐</h1>
    );
}