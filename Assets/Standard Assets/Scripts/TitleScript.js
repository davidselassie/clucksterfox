#pragma strict

var customTexture:GUITexture;


function OnGUI () {
		
	var buttonHeight : int = 100;
	var buttonWidth : int = 200;
	
	customTexture.pixelInset.x = 0;
	customTexture.pixelInset.y = 0;
	customTexture.pixelInset.width = Screen.width;
	customTexture.pixelInset.height = Screen.height;
}

function Update () {
	if(Input.anyKeyDown)
		Application.LoadLevel ("TestScene");
}