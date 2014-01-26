#pragma strict

private var motor : CharacterMotor;

function Awake () {
	motor = transform.parent.gameObject.GetComponent(CharacterMotor);
}

function FixedUpdate () {
	transform.localPosition = Vector3.ClampMagnitude(motor.lastInputMoveDirection, 0.3f);
}
