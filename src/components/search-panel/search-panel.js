import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    state = {
        term: ""
    }

    onChange = (e) => {
        const term = e.target.value.toLowerCase()
        this.setState({
            term
        })
        this.props.onSearchUpdate(term)
    }

    render() {
        return (
            <input  onChange={this.onChange}
                    value={this.state.term}
                    type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"/>
        )
    }
 
}

export default SearchPanel;