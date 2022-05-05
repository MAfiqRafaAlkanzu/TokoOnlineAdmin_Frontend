import { Switch, Route, Redirect } from 'react-router-dom';
// import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import Login from 'pages/login';
import Customer from 'pages/customer';
import Product from 'pages/product';
// import Navbar from 'components/navbar';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <>
            {/* <Sidebar /> */}
            {/* <Navbar /> */}
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path = "/login" component={Login} />
                    <Route path='/customer' component={Customer}/>
                    <Route path = '/product' component={Product}/>
                    <Route path="/settings" component={Settings} />
                    <Route path="/tables" component={Tables} />
                    <Route path="/maps" component={Maps} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
