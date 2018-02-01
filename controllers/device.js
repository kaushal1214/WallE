module.exports ={

	/*-----------------------------------------------------------------------
	* GET request for Testing purpose i.e. to see if the server is responsive
	*------------------------------------------------------------------------*/
	data: function(req,res){
		res.send("Status:OK");
	},

	/*---------------------------------------
	* GET Request to stream the Camera Video
	*----------------------------------------*/
	camera: function(req,res)
	{
		//Store Rendering data
                var viewModel ={ camera:{}};

                var id = req.params.id;

		//Camera locations
		var camera = {
			camera1:'http:/\/10.208.34.109:11000',
			camera2:'',
			camera3:''
		};

		//Select the proper Camera based on the ID provided
		if(id=='1')
			viewModel.camera.ipAddress = camera.camera1;
		else if( id == '2')
			viewModel.camera.ipAddress = camera.camera2;
		else if(id== '3')
			viewModel.camera.ipAddress = camera.camera3;

		viewModel.camera.id= id;
		res.render('camera',viewModel);
	},
	message: function(req,res){
		console.log(req.body);
		res.redirect('/');

	}

};
