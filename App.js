import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const App: () => React$Node = () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [clearDispay, setClearDisplay] = useState(false)
  const [operatior, setOperatior] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  // console.warn(displayValue)

  function addDigit(n) {

    if (n === '.' && displayValue.includes('.')) return
    console.debug(typeof displayValue)
    const clearDisplayZero =
      displayValue === '0' ||
      displayValue === 0 ||
      clearDispay

    if (n === '.' && !clearDispay && displayValue.includes('.')) return

    const currentValue = clearDisplayZero ? '' : displayValue

    const displayValueCurrent = currentValue + n

    setDisplayValue(displayValueCurrent)
    clearDisplayZero && setClearDisplay(false)

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const valuesAux = [...values]
      //setCurrent(newValue)
      valuesAux[current] = newValue
      setValues(valuesAux)
    }
  }

  function clearMemory() {
    setDisplayValue(0)
    setClearDisplay(false)
    setOperatior(null)
    setValues([0, 0])
    setCurrent(0)
  }

  console.warn(values)
  function setOperation(operation) {
    if (current === 0) {
      setCurrent(1)
      setOperatior(operation)
      setClearDisplay(true)
    } else {
      const equals = operation === '='
      const valuesAux = [...values]

      try {
        valuesAux[0] = eval(`${valuesAux[0]} ${operatior} ${valuesAux[1]}`)
        console.warn(eval(`${valuesAux[0]} ${operatior} ${valuesAux[1]}`))

      } catch (e) {
        valuesAux[0] = setValues([0])
      }

      valuesAux[1] = 0

      setDisplayValue(`${valuesAux[0]}`)
      setOperatior(equals ? null : operation)
      setCurrent(equals ? 0 : 1)
      // setClearDisplay(!equals)
      setClearDisplay(true)
      setValues(valuesAux)
    }


  }

  return (

    <View style={styles.body}>

      <Display value={displayValue} />

      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />

        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />

        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />

        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff'
  },

  buttons: {
    borderColor: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default App;
