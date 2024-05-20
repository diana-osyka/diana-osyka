import Table from "react-bootstrap/Table";
export function Scores({scores}){
    return(
        <Table>
            <thead>
            <tr>
                <th><h1 style={{marginTop: '40px'}}>Top scores</h1></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {scores.map(score => (
                <tr key={score.ident}>
                    <td>{score.player}</td>
                    <td>{score.points}</td>
                    <td>{score.game_mode}</td>
                    <td>{new Date(score.playedAt).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
        </Table>);
}