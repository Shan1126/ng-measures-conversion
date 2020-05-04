import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit-conversion',
  templateUrl: './unit-conversion.component.html',
  styleUrls: ['./unit-conversion.component.scss']
})
export class UnitConversionComponent implements OnInit, OnDestroy {

  measureTypes = [
    { value: 'temperature', viewValue: 'Temperature' },
    { value: 'volume', viewValue: 'Volume' }
  ]

  tempMap = {
    'Degrees Celsius (\'C)': { factor: 1, increment: 0 },
    'Degrees Fahrenheit (\'F)': { factor: 0.555555555555, increment: -32 },
    'Degrees Kelvin (\'K)': { factor: 1, increment: -273.15 },
    'Degrees Rankine (\'R)': { factor: 0.555555555555, increment: -491.67 }
  }

  tempUnits = Object.keys(this.tempMap)


  volMap = {
    'Cups': { factor: 0.0002365882 },
    'Liters': { factor: 0.001 },
    'Tablespoons': { factor: 0.00001478676 },
    'Cubic inches': { factor: 0.00001638706 },
    'Cubic-Foot': { factor: 0.02831685 },
    'Gallons': { factor: 0.003785412 }
  }

  volUnits = Object.keys(this.volMap)

  unitMap = {
    temperature: this.tempMap,
    volume: this.volMap
  }

  unitForm: FormGroup;

  unitFormValueChangesSub: Subscription
  unitTypeCtrlValueChangesSub: Subscription

  unitTypeCtrl: FormControl
  targetValueCtrl: FormControl
  expectedTargetValueCtrl: FormControl

  outputMessage = '';

  get units() {
    const unitType = this.unitTypeCtrl.value
    return unitType
      ? (unitType === 'temperature' ? this.tempUnits : this.volUnits)
      : []
  }

  constructor() { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnDestroy() {
    this.unitTypeCtrlValueChangesSub.unsubscribe();
    this.unitFormValueChangesSub.unsubscribe();
  }

  buildForm() {
    this.unitForm = new FormGroup({
      inputValue: new FormControl('', [Validators.required]),
      inputUnit: new FormControl('', [Validators.required]),
      targetUnit: new FormControl('', [Validators.required]),
      targetValue: new FormControl('', [Validators.required])
    })

    this.unitTypeCtrl = new FormControl('temperature', [Validators.required])
    this.targetValueCtrl = new FormControl('', [Validators.required])
    this.expectedTargetValueCtrl = new FormControl({ value: '', disabled: true }, [Validators.required])

    this.unitTypeCtrlValueChangesSub = this.unitTypeCtrl.valueChanges.subscribe(value => {
      this.unitForm.reset();
    })
  }


  checkAnswer() {
    let result = null;
    if (this.unitForm.valid) {
      const sr = this.unitForm.get('targetValue').value;
      result = this.calculateUnit();
      console.log(result);
      this.expectedTargetValueCtrl.setValue(result);
      this.expectedTargetValueCtrl.updateValueAndValidity();
      this.outputMessage = this.unitForm.invalid 
        ? 'invalid'
        : ( Math.round(10 * sr)/10) === result
          ? 'correct'
          : 'incorrect'
    }
  }

  calculateUnit() {
    const unitType = this.unitTypeCtrl.value;
    const { inputValue, inputUnit, targetUnit } = this.unitForm.value;
    const { increment, factor } = this.unitMap[unitType][inputUnit];
    const { increment: targetIncrement, factor: targetFactor } = this.unitMap[unitType][targetUnit];
    let result = inputValue;
    if (unitType === 'temperature') {
      result = parseFloat(result) + increment;
    }
    result = result * factor;
    result = result / targetFactor;
    if (unitType === 'temperature') {
      result = parseFloat(result) - targetIncrement;
    }
    console.log('result' +result);
    return Math.round(10 * result)/10;
  }

  onUnitTypeSelectionChange(value: any) {
    this.unitForm.reset();
    this.expectedTargetValueCtrl.reset();
  }

}
