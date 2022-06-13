import React, {useState}  from "react";
import './TableFilter.scss';

export default function TableFilter({ filterData, onReset }) {
    const [ name, setName ] = useState('');
	const [ condition, setCondition ] = useState('');
	const [ argument, setArgument ] = useState('');
    


    const onClearFilter = () => {
        setName('');
        setCondition('');
        setArgument('');
        onReset();
    };

    const onFilterSubmit = () => { 
        filterData({name, condition, argument});
    }

    const onChangeName = (e) => setName(e.target.value);
    const onChangeСondition = (e) => setCondition(e.target.value);
    const onChangeArgument = (e) => setArgument(e.target.value);

    return (
        <div className="TableFilter">
            <select value={name} onChange={onChangeName} >
                <option value = ''> Выберите колонку </option>
                <option value = 'name'> Название </option>
                <option value = 'count'> Количество </option>
                <option value = 'distance'> Расстояние </option>
            </select>
            <select value = {condition} onChange={onChangeСondition} >
                <option value = ''> Выберите условие </option>
                <option value = 'equal'> Равно </option>
                <option value = 'contain'> Содержит </option>
                <option value = 'more'> Больше </option>
                <option value = 'less'> Меньше </option>
            </select>
            <input value = {argument} onChange={onChangeArgument} type='text' placeholder="Значение фильтра"></input>
            <button onClick={onClearFilter}> Сброс </button>
            <button onClick={onFilterSubmit}> Фильтр </button>
        </div>
    )
}