import Form from '.Form'
import '../styles/MainPage.css'
import Graph from './Graph'
import PointsTable from './PointsTable'


const MainPage = () => {
    <div>
        <div id='window'>
            <div id="coordinatePanelWrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Graph/>
            </div>
            <Form/>
        </div>
        <PointsTable/>
    </div>  

}
export default MainPage
