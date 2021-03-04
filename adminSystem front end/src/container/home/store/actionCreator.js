const axios = require('axios').default;
const dataResolve=(data)=>{
	return {
		type:"bigOrder",
		data:data
	}
}



export const getData=(tsCode)=>{
	return (dispatch)=>{
		axios.get('https://localhost:5001/stock/getbigorder/'+tsCode)
 			.then(function (response) {
 			  // handle success
 			 
 			  var data=response.data;
 			  dispatch(dataResolve(data))
 			})
 			.catch(function (error) {
 			  // handle error
 			  console.log(error);
 			})
 			.then(function () {
 			  // always executed
 			});


 		
	}
}

export const value=(temTwoArray)=>{
		return{
			type:"change",
			d_arr:temTwoArray
		}
}

export const initial=(d_arr)=>{
	return{
		type:"initial",
		d_arr:d_arr
	}
}