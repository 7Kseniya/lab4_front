import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPointsForTable } from '../reducer/actions/graphActions';

const PointsTable = () => {
    const dispatch = useDispatch()
    const points = useSelector(state => state.tablePoints)
    const pointsWithR = useSelector(state => state.points)
    useEffect(() => {
        (async () => {
            try {
                await dispatch(getPointsForTable());
            } catch (error) {
                console.error('Error loading points for the table', error);
            }
        })();
    }, [dispatch, pointsWithR]);

        return(
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#2b0437' }}>
            <TableContainer sx={{ minWidth: 700, maxHeight: 400 }}>
                <Table >
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'secondary' }}>x</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'secondary' }}>y</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'secondary' }}>r</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'secondary' }}>result</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: 'secondary' }}>time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {points.map((point, index) => (
                            <TableRow key={index}>
                            <TableCell align="center">{point.x}</TableCell>
                            <TableCell align="center">{point.y}</TableCell>
                            <TableCell align="center">{point.r}</TableCell>
                            <TableCell align="center">{point.result}</TableCell>
                            <TableCell align="center">{point.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
        </Paper>
    
        )

}

export default PointsTable