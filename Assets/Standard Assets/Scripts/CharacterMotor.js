#pragma strict

@script RequireComponent (CharacterController);

public var inputMoveDirection : Vector3 = Vector3.zero;
public var maxSpeed : float = 5.0f;

private var currentVelocity : Vector3 = Vector3.zero;
private var characterController : CharacterController;

function Awake () {
	characterController = GetComponent(CharacterController);
}

function FixedUpdate () {	
	// Update current velocity based on input.
	var newVelocity : Vector3 = ApplyInputVelocityChange(Vector3.zero);
	newVelocity = RevertToXYPlane(newVelocity, transform.position);
	newVelocity = EnforceMaxSpeed(newVelocity);
	
	// Integrate velocity to get position.
	var currentMovementOffset : Vector3 = newVelocity * Time.fixedDeltaTime;
	
   	// Save lastPosition for actual velocity calculation.
   	var lastPosition : Vector3 = transform.position;
   	// Move our character!
	characterController.Move(currentMovementOffset);
	// Calculate the actual new velocity based on the current and previous position.  
	currentVelocity = (transform.position - lastPosition) / Time.fixedDeltaTime;
}

private function ApplyInputVelocityChange (currentVelocity : Vector3) {
	// Integrate acceleration and input to get position.
	var inputVelocity : Vector3 = inputMoveDirection * maxSpeed;
	return currentVelocity + inputVelocity;
}

private function RevertToXYPlane (inputVelocity : Vector3, position : Vector3) {
	var correctedVelocity : Vector3 = inputVelocity;
	// Spring returning force to z = 0 plane: F = ma = k x ^ 2
	correctedVelocity.z = -position.z * position.z * Time.fixedDeltaTime;
	// Quench Z jitters.
	if (correctedVelocity.z <= 0.01f) {
		correctedVelocity.z = 0.0f;
	}
	return correctedVelocity;
}

private function EnforceMaxSpeed (inputVelocity : Vector3) {
	var correctedVelocity : Vector3 = inputVelocity;
	var planarMagnitude = Mathf.Sqrt(inputVelocity.x * inputVelocity.x + inputVelocity.y * inputVelocity.y);
	// Enforce maxSpeed.
	if (planarMagnitude > maxSpeed) {
		correctedVelocity = inputVelocity;
		correctedVelocity.x = inputVelocity.x / planarMagnitude * maxSpeed;
		correctedVelocity.y = inputVelocity.y / planarMagnitude * maxSpeed;
	}
	// Quench XY jitters.
	else if (planarMagnitude <= 0.01f) {
		correctedVelocity.x = 0.0f;
		correctedVelocity.y = 0.0f;
	}
	return correctedVelocity;
}

