import React from  'react';
class Notification extends React.Component {
    render(){
        return <React.Fragment>
            <form>
                <div style={{textAlign:"center"}}>
                    <table>
                        <div className="notification"/>
                        <thead><tr><label><th>Notification order id</th></label><br/>
                        <th><label>Notification Text</label><br/></th></tr></thead>
                        <tr>
                            <td><p>OrderPlaced_kavya@abcd.com1496234817684</p></td>
                            <td><p>Order was placed successfully. Your id is:kavya@abcd.com1496234817684</p></td>
                            <td><button style={{backgroundColor:"orange",color:"white"}}>Mark as Read</button></td>
                        </tr>
                        <tr>
                            <td><p>cancelled_kavya@abcd.com1496234817684</p></td>
                            <td><p>Order was cancelled successfully for order id: kavya@abcd.com1496234817684</p></td>
                            <td><button
                            type="submit"
                            className="btn btn-primary"
                            style={{backgroundColor:"orange",color:"white"}}>Mark as Read</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </form> 
        </React.Fragment>
        
    }
}
export default Notification;
