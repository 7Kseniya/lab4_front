import { Alert, AlertTitle, Button, ButtonContainer, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPoints, logoutAuth, resetPoints, sendPoints, setR, setX, setY } from '../reducer/actions/graphActions'
import { useAuth } from '../utils/authentication'
import { changeR, clearSVG, setRound } from '../utils/graph'
import { isInsideCircle, isInsideRectangle, isInsideRhombus } from '../utils/validation'



const Form = () => {
    const x = useSelector((state) => state.x);
    const y = useSelector((state) => state.y);
    const r = useSelector((state) => state.r);
    const points = useSelector(state => state.points)
    const [isRSelected, setIsRSelected] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useAuth()


    useEffect(() => {
        updateSVG();
    }, [points]);

    const updateSVG = () => {
        clearSVG();
        points.forEach((point) => {
            const {x, y, r} = point;
            calculate(x, y, r);
        })
    }

    const handleXChange = (event) => {
        if (event.target.value === "") {
            setErrorMessage("you did not choose r value");
        } else {
            setErrorMessage("");
            dispatch(setX(event.target.value));
        }
    }

    const handleYChange = (event) => {
        const Y = event.target.value;
        const regex = /^-?\d*\.?\d*$/;
        if (!regex.test(Y) || Y < -5 || Y > 3 || Y === "") {
            setErrorMessage("y must be in range [-5; 3]");
            dispatch(setY(null));
        } else {
            setErrorMessage("");
            dispatch(setY(Y));
        }
    }

    const handleRChange = async (event) => {
        if (event.target.value === "") {
            setErrorMessage("choose value");
        } else {
            setErrorMessage("");
            changeR(event.target.value);
            setIsRSelected(true);
            dispatch(setR(event.target.value));
            await dispatch(getPoints(parseFloat(event.target.value)));
        }
    };

    const handleSubmit = async () => {
        try {
            if (!x || !y || !r) {
                setErrorMessage("fill in all fields before sending");
                return;
            }
            setErrorMessage("");
            dispatch(sendPoints(x, y, r));
            await dispatch(getPoints(r));
        } catch (error) {
            console.error("Упс:", error);
        }
    }

    const handleLogout = async () => {
        clearSVG();
        dispatch(logoutAuth());
        await auth.logout();
        navigate("/");
    }

    const handleClear = async () => {
        clearSVG();
        await dispatch(resetPoints());
        setErrorMessage("");
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    let flag;
    const isHit = () => {
        flag = (x>=0 && y>=0 && isInsideCircle(x, y, r/2)) ||
            (x>=0 && y<=0 && isInsideRhombus(x, y, r/2, r/2)) ||
            (x<=0 && y<=0 && isInsideRectangle(x, y, r, r))

    }

    const calculate = (x, y, r) => {
        const width = 400;
        const height = 400;
        const centerX = width / 2;
        const centerY = height / 2;
        const cx = centerX + x * (width / (3.3 * r));
        const cy = centerY - y * (height / (3.3 * r));
        isHit(x, y, r);
        setRound(cx, cy, flag);
    }

    useEffect(() => {
        const svg = document.querySelector('svg')
        const getCoord = (svg, event) => {
            const rect = svg.getBoundingClientRect()
            return {x: event.clientX - rect.left, y: event.clientY - rect.top}
        }
        const drawPoint = async (event) => {
            if (!isRSelected) {
                setErrorMessage("choose radius value");
                return;
            }
            let radius = r;
            const point = getCoord(svg, event);
            const tempX = point.x - 200;
            const tempY = 200 - point.y;
            const temp = 120 / radius;
            const newX = (tempX / temp).toFixed(1);
            const newY = (tempY / temp).toFixed(1);
            dispatch(setX(newX));
            dispatch(setY(newY));
            dispatch(sendPoints(newX, newY, radius));
            calculate(newX, newY, radius);
        }
        svg.addEventListener("click", drawPoint);

        return () => {
            svg.removeEventListener("click", drawPoint)
        }
    }, [isHit, updateSVG, calculate, dispatch, isRSelected, r])

    return (
        <Container>
            <FormControl>
                <FormLabel>choose x: </FormLabel>
                <RadioGroup
                    name='x'
                    aria-label='x'
                    value={x}
                    onChange={handleXChange}>
                    {['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'].map((value) => (
                        <FormControlLabel 
                            key={value} 
                            value={value} 
                            control={<Radio />} 
                            label={value} />
                    ))}
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>enter y: </FormLabel>
                <TextField 
                    id="outlined-basic" 
                    label="Outlined"
                    type='number'
                    defaultValue={'enter number [-5; 3]'} 
                    variant="outlined"
                    onChange={handleYChange}
                    value={y !== null ? y : ""} />
            </FormControl>

            <FormControl>
                <FormLabel>choose r: </FormLabel>
                <RadioGroup
                    name='r'
                    aria-label='r'
                    value={r}
                    onChange={handleRChange}>
                    {['1', '1.5', '2', '2.5', '3', '3.5', '4' ].map((value) => (
                        <FormControlLabel 
                            key={value} 
                            value={value} 
                            control={<Radio />} 
                            label={value} />
                    ))}
                </RadioGroup>
            </FormControl>
            <ButtonContainer>
                <Button onClick={handleSubmit}>submit</Button>
                <Button onClick={handleClear}>clear</Button>
                <Button onClick={handleLogout}>logout</Button>
            </ButtonContainer>
            <Alert id="warninng-message" severity='info' color='warning'>
                    <AlertTitle>info</AlertTitle>
                        {errorMessage}
            </Alert>
        </Container>
    )
}

export default Form