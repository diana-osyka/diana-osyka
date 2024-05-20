import Table from "react-bootstrap/Table";
export function Comments({comments}){
    return(
        <Table>
        <thead>
        <tr>
            <th><h1 style={{marginTop: '40px'}}>Comments</h1></th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {comments.map(comment => (
            <tr key={comment.ident}>
                <td>{comment.player}</td>
                <td>{comment.commentText}</td>
                <td>{new Date(comment.playedAt).toLocaleDateString()}</td>
            </tr>
        ))}
        </tbody>
    </Table>);
}