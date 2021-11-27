import "./app-info.css";

const AppInfo = (props) => {
    const {data} = props;
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании</h1>
            <h2>Общее число сотрудников: {data.length}</h2>
            {/* Вычисления из JSX лучше выносить в функции, так получается читабельнее */}
            <h2>Премию получат: {data.filter(item => item.increase).length}</h2>
        </div>
    )
}

export default AppInfo;