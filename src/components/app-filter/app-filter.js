import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
    state = {
        filter: "all"
    }

    onSelectedFilter = (event) => {
        const target = event.target;
        const dataAtr = target.dataset.filter;
        if (target.classList.contain = 'button') {
            this.setState({
                filter: dataAtr
            })
        }
        this.props.onFilterUpdate(this.state.filter)
    }


    render() {
        const buttons = [
            {title: "Все сотрудники" , dataAtr: "all"},
            {title: "На повышение" , dataAtr: "to-increase"},
            {title: " З/П больше 1000$" , dataAtr: "more1000"}
        ]
        const buttonsPanel = buttons.map((item,i) => {
            let classList;
            if (item.dataAtr == this.state.filter) {
                classList = 'btn btn-light'
            } else {
                classList = "btn btn-outline-light"
            }

            return (
                <button type="button"
                data-filter={item.dataAtr}
                className={classList}
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