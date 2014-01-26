#pragma strict

public var gun : Transform;

// Use this for initialization
function Awake () {
	var point = Vector3.right + transform.position;
	transform.LookAt(point,Vector3.up);
}

// Update is called once per frame
function Update () {

	if(Input.GetAxis("GunHorizontal"))
    {
       print("Input: " + Input.GetAxis("GunHorizontal"));
    }
	
	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("GunHorizontal"), Input.GetAxis("GunVertical"), 0);
	if(directionVector.magnitude<0.2) return;
	var point = Vector3.Normalize(directionVector) + transform.position;
	transform.LookAt(point,Vector3.forward);
}
