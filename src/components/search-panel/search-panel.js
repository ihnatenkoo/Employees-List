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
        this.props.onSearchUpdate(e.target.value.toLowerCase())
    }

    render() {
        const {term} = this.props;
        return (
            <input  onChange={this.onChange}
                    value={term}
                    type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"/>
        )
    }
 
}

export default SearchPanel;