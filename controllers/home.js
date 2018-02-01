module.exports = {
	index: function(req,res){
		var viewModel = {
				camera:{}
		};
		viewModel.camera.ipAddress = "https:/\/www.youtube.com/watch?v=l632Sv6eOvw";
		res.render('index', viewModel);
	}
}
