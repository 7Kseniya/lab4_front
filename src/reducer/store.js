import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import pointReducer from "./pointReducer";

const loadState = () => {
    try{ 
        const serializedState = localStorage.getItem("reduxState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined;
    }
};

const store = createStore(pointReducer,  loadState(), applyMiddleware(thunk));
store.subscribe(()=>{
    try {
        const stateToSave = store.getState();
        localStorage.setItem("reduxState", JSON.stringify(stateToSave));
    } catch (error) {
        console.log("save state error", error)
    }
});

export default store;
