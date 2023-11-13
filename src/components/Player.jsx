import {useState} from "react";

export default function Player({ initialName, symbol, isActive, saveName }) {

    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    let playerName = <span className="player-name">{name}</span>;
    let btnCaption = 'Edit';


    if (isEditing) {
        playerName = <input type="text" value={name} onChange={handleChange}  required />;
        btnCaption = 'Save'
    }

    let handleClick = () => {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            saveName(symbol, name);
        }
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <li className={isActive ? 'active' : '' }>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleClick()}>{btnCaption}</button>
        </li>
    )
}