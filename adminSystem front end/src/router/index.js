import React from "react";
import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import LayOut from "../container/layout/index.js";
import { adminRouters } from "../router/config.js";
import { isLogined } from '../utils/auth/auth.js'

export default function App (){
	return (
		isLogined()?
		<LayOut>
		  <Switch>
			{adminRouters.map((value) => {
				
					return <Route exact key={value.path} {...value} />;
			
			  
			})}
		  </Switch>
		</LayOut>:<Redirect to="/login" />
	  );
}


   
  

