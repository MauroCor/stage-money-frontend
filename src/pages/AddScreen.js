import React, { useState } from 'react';
import ButtonComponent from '../components/ButtonComponent';
import DropComponent from '../components/DropComponent';
import InputPriceComponent from '../components/InputPriceComponent';
import MonthDropComponent from '../components/MonthDropComponent';
import OptionSelectorComponent from '../components/OptionSelectorComponent';
import { postFixedCost } from '../services/fixedCost';
import { postIncome } from '../services/income';
import { postCardSpend } from '../services/cardSpend';
import DropdownComponent from '../components/DropdownComponent';
import InputComponent from '../components/InputComponent';

const AddScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Tarjeta');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desdeValue, setDesdeValue] = useState('');
  const [hastaValue, setHastaValue] = useState('');
  const [cuotas, setCuotas] = useState('1');

  const handleSubmit = async () => {
    let data = {};
    try {
      switch (selectedOption) {
        case 'Egreso':
          data = {
            name,
            price: parseInt(price),
            date_from: desdeValue,
            date_to: hastaValue || null,
          };
          await postFixedCost(data);
          break;
        case 'Ingreso':
          data = {
            name,
            price: parseInt(price),
            date_from: desdeValue,
            date_to: hastaValue || null,
          };
          await postIncome(data);
          break;
        case 'Tarjeta':
          data = {
            name,
            price: parseInt(price),
            fees: parseInt(cuotas),
            date_from: desdeValue,
          };
          await postCardSpend(data);
          break;
        default:
          throw new Error("Opción no válida");
      }
      alert('Agregado correctamente.');
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert('Error: Revise los datos ingresados.');
    }
  };

  return (
    <div>
      <h1 className='font-bold text-center text-xl mt-2'>¿Qué deseas agregar?</h1>
      <div className="p-4">
        <OptionSelectorComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

        <div className="max-w-xs mx-auto space-y-4">
          {(selectedOption === 'Ingreso' || selectedOption === 'Egreso') && (
            <>
              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Nombre</label>
                <DropComponent plhdr={selectedOption === 'Ingreso' ? 'Ej: Sueldo' : 'Ej: Alquiler'}
                  onChange={(e) => setName(e.target.value)}
                  type={selectedOption === 'Ingreso' ? 'income' : 'fixedCost'} />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Monto</label>
                <InputPriceComponent value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Desde</label>
                <MonthDropComponent type='Desde' value={desdeValue} onChange={setDesdeValue} />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Hasta (Opcional)</label>
                <MonthDropComponent type='Hasta' value={hastaValue} onChange={setHastaValue} />
              </div>
            </>
          )}

          {selectedOption === 'Tarjeta' && (
            <>
              <InputComponent
                name="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Heladera"
              />

              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Monto</label>
                <InputPriceComponent value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <DropdownComponent value={cuotas} onChange={(e) => setCuotas(e.target.value)} />
              <div className="flex flex-col">
                <label className="text-xs text-left mb-1 ml-10">Desde</label>
                <MonthDropComponent type='DesdeTarj' value={desdeValue} onChange={setDesdeValue} />
              </div>
            </>
          )}

          <div className="flex justify-center mt-4">
            <ButtonComponent onClick={handleSubmit} text="OK" className='bg-blue-600 rounded-full hover:bg-blue-500 px-2 py-1' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScreen;