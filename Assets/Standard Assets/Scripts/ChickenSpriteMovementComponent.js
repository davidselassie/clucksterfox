#pragma strict

@script RequireComponent (CharacterMotor)
@script RequireComponent (Animator)
@script RequireComponent (LivingComponent)

private var motor : CharacterMotor;
private var animator : Animator;
private var livingComponent : LivingComponent;

function Awake () {
	motor = GetComponent(CharacterMotor);
	animator = GetComponent(Animator);
	livingComponent = GetComponent(LivingComponent);
}

function Update () {
	var currentState : int = animator.GetInteger("State");
	var newState : int;
	
	if (!livingComponent.Alive()) {
		newState = 5;
	}
	else if (motor.inputMoveDirection.sqrMagnitude < 0.01f) {
		newState = 1;
	}
	else {
		newState = 3;
	}
	
	if (newState != currentState) {
		animator.SetInteger("State", newState);
	}
}
