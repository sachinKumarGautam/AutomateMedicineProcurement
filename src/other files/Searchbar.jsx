import React from 'react';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';

export default class Searchbar extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        ans: [],
      }
    }
    getName(event) {
        console.log(event)
        if (event === '') {
          this.setState({
            ans: this.props.items
          })
        }
        else {
          const x=event.length;
          var searchedrow = this.props.items.filter((row) => 
          row['ITEM NAME'].substring(0, x) === event.toUpperCase() ||
          row['BATCH'].substring(0, x) === event.toUpperCase());
          this.setState({
            ans: searchedrow
          })
        }
        this.props.update(this.state.ans)
      }
    render() {
       const { classes } = this.props;
       return (
        <Paper >
          <div>
            <SearchBar
              onChange={this.getName.bind(this)}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: '0 auto',
                maxWidth: 800
              }}
            />
          </div>
        </Paper>
       );
    }
}