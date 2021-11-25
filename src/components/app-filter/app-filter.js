import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {


    onSelectedFilter = (event) => {
        const dataAtr = event.target.dataset.filter;
        if (event.target.classList.contains('btn')) {
            this.props.onFilterUpdate(dataAtr)
        }
    }


    render() {
        const {filter} = this.props;

        const buttons = [
            {title: "Все сотрудники" , dataAtr: "all"},
            {title: "На повышение" , dataAtr: "to-increase"},
            {title: "З/П больше 1000$" , dataAtr: "more1000"},
            {title: "Избранные" , dataAtr: "favourite"},
        ];

        const buttonsPanel = buttons.map((item,i) => {
            const active = filter === item.dataAtr;
            const clazz = active ? 'btn btn-light' : "btn btn-outline-light";
           

            return (
                <button type="button"
                data-filter={item.dataAtr}
                className={clazz}
                key={i}>
                {item.title}
                </button>
            )
        })


        return (
            <div onClick={this.onSelectedFilter} className="btn-group">
                {buttonsPanel}
                {/* <button type="button"
                        data-filter="all"
                        className="btn btn-light">
                        Все сотрудники
                </button>
                <button type="button"
                        data-filter="to-increase"
                        className="btn btn-outline-light">
                        На повышение
                </button>
                <button type="button"
                        data-filter="more1000"
                        className="btn btn-outline-light">
                        З/П больше 1000$
                </button> */}
            </div>
        )
    }

}

export default AppFilter;