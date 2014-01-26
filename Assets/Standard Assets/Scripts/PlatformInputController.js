#pragma strict

@script RequireComponent (CharacterMotor)

private var motor : CharacterMotor;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
}

// Update is called once per frame
function Update () {
	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(-Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"), 0);
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = Vector3.Normalize(directionVector);
}
