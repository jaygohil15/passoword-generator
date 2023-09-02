import "./styles.css";
import { useState, useRef } from "react";

import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import PasswordStrengthBar from 'react-password-strength-bar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A8B8B'
    },
  },
});

export default function App() {

  const [sliderValue, setSliderValue] = useState(50);
  const [password, setPassword] = useState('');
  const inputUPRef = useRef();
  const inputSYMRef = useRef();
  const inputNUMRef = useRef();
  const inputLORef = useRef();

  const handleSliderChange = (e) => {
    console.log(e.target.value)
    setSliderValue(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    console.log(e)
    console.dir(e.target.checked)
  }

  const generatePassword = () => {
      let loLetters = "abcdefghijklmnopqrstuvwxyz",
      upLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      nums='0123456789',
      sym = '!@#$%^&*_+-=',
      charSet = "",
      retVal = "";

      console.log(inputUPRef.current.childNodes[0].checked)
      if(inputUPRef.current.childNodes[0].checked) {
        charSet += upLetters;
      }
      if(inputLORef.current.childNodes[0].checked) {
        charSet += loLetters;
      }
      if(inputSYMRef.current.childNodes[0].checked) {
        charSet += sym;
      }
      if(inputNUMRef.current.childNodes[0].checked) {
        charSet += nums;
      }
      console.log(charSet)

      for (let i = 0; i < sliderValue; ++i) {
          retVal += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setPassword(retVal)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <div className="container">
        <div className="container-head">
          <div className="container-head-string">{password}</div>
          <ContentCopyRoundedIcon className="container-head-copyicon" onClick={handleCopy} />
        </div>
        
        <div className='container-slider'>
          <div className='container-slider-value'>
            <div>Character Length</div>
            <div>{sliderValue}</div>
          </div>
          <Slider defaultValue={50} aria-label="Default" 
          valueLabelDisplay="auto" onChange={handleSliderChange} />
        </div>

        <div className="container-checkbox" >
        <FormGroup onChange={handleCheckboxChange}>
          <FormControlLabel control={<Checkbox defaultChecked ref={inputUPRef} data-type='uppercaseletters'/>} label="Include Uppercase Letters" />
          <FormControlLabel control={<Checkbox ref={inputLORef} data-type='lowercaseletters' />} label="Include Lowercase Letters" />
          <FormControlLabel control={<Checkbox ref={inputNUMRef} data-type='numbers' />} label="Include Numbers" />
          <FormControlLabel control={<Checkbox ref={inputSYMRef} data-type='symbols' />} label="Include Symbols" />
        </FormGroup>
        </div>

        <div>
          <div>STRENGTH</div>
          <PasswordStrengthBar password={password}/>
        </div>
        <Button variant="contained" color='primary' onClick={generatePassword}>Generate</Button>
      </div>
    </div>
    </ThemeProvider>
  );
}
