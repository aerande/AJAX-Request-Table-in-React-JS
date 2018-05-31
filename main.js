class PageWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            heading: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.dataLoad = this.dataLoad.bind(this);
    }
    componentDidMount() {
        this.dataLoad();
    }
    dataLoad() {
        let myArr = [];
        var _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.withCredentials = false;
        xhttp.open("GET", "http://libertyville.rice.iit.edu/scripts/4565_lab3.php", true);
        //  xhttp.setRequestHeader( 'Access-Control-Allow-Origin', "http://libertyville.rice.iit.edu/scripts/4565_lab3.php");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                myArr = JSON.parse(this.responseText);
                console.log(myArr);
                _this.setState({
                    data: myArr, heading: <div className="alert alert-success">
                            <h3>Data Updated</h3>
                        </div>
                })
                setTimeout(() => {
                    _this.setState({heading: ""})
                }, 2000);
            }
            if (this.readyState === 4 && this.status != 200) {
                _this.setState({
                    heading: <div className="alert alert-danger">
                            <h3>We are facing an issue, please try again</h3>
                        </div>
                })
                setTimeout(() => {
                    _this.setState({heading: ""})
                }, 2000);
            }
            if (this.readyState === 3) {
                _this.setState({
                    heading: <div className="alert alert-info">
                            <h3>Employee Data Loading...</h3>
                        </div>
                })
                setTimeout(() => {
                    _this.setState({heading: ""})
                }, 2000);
            }
        }

        xhttp.send();
    }

    render()
    {
        return (
            <div>

                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <center>{this.state.heading}</center>
                    </div>
                </div>
                <h1>
                    <center>ITMD 565 - Project 2</center>
                </h1>
                <h2>
                    <center>Mayur Agnani - magnani@hawk.iit.edu</center>
                </h2>

                <center>
                    <button type="button" className="btn btn-primary btn-md" onClick={this.dataLoad}>Load Data</button>
                </center>
                <br/><br/>
                <EmployeesTable emp={this.state.data}/>

            </div>
        );
    }
}

class EmployeesTable extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-8  col-md-offset-2">

                    <table className="table table-bordered table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Title</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.emp.map(function(row) {
                                return (<EmployeesRow key={row.id} ro={row}/>);
                            })}

                        </tbody>

                    </table>
                </div>
            </div>

        );
    }
}

class EmployeesRow extends React.Component {

    render() {

        return (
            <tr key={this.props.id}>
                <td>{this.props.ro.id}</td>
                <td>{this.props.ro.first_name}</td>
                <td>{this.props.ro.last_name}</td>
                <td>{this.props.ro.title}</td>
                <td>{this.props.ro.email}</td>
                <td>{this.props.ro.gender}</td>
                {this.props.ro.active
                    ? <td className="success">true</td>
                    : <td className="danger">false</td>}
            </tr>

        );
    }
}
ReactDOM.render(
    <PageWrapper/>, document.getElementById('root'));
