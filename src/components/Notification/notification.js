import React from  'react';

class Notification extends React.Component {

    constructor()

    {

        super()

        this.state = {notifications:[]}

    }

    componentDidMount()

    {

 

        axios.get(http://localhost:5000/+usrid+"/notifications").then((res) => {

            this.setState({notifications:res.data})

           

        }).catch((err) => {

            console.log(err)

        })

    }

   

    render(){

        return <React.Fragment>

            <form>

                <div style={{textAlign:"center"}}>

                {this.state.notifications.map((element) => {

                    <table>

                        <thead><tr><label><th>Notification order id</th></label><br/>

                        <th><label>Notification Text</label><br/></th></tr></thead>

                        <tr>

                            <td><p>{element.}</p></td>

                            <td><p>{element.}</p></td>

                            <td><button style={{backgroundColor:"orange",color:"white"}}>Mark as Read</button></td>

                        </tr>

                        <tr>

                            <td><p>{element.}</p></td>

                            <td><p>{element.}</p></td>

                            <td><button

                            type="submit"

                            className="btn btn-primary"

                            style={{backgroundColor:"orange",color:"white"}}>Mark as Read</button>

                            </td>

                        </tr>

                    </table>

                     })}

                </div>

            </form>

        </React.Fragment>

       

    }

}

export default Notification;