const InputPriceComponent = ({ onChange }) => {

    return (
        <div className="text-center mb-2">
            <input className='bg-gray-700 w-60'
                type="number"
                name="drop"
                placeholder="Ej: $350.000"
                onChange={onChange} />
        </div>
    );
};

export default InputPriceComponent;