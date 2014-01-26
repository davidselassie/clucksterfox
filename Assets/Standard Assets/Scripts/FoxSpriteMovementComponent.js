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
	else if (Mathf.Abs(motor.inputMoveDirection.x) < 0.01f) {
		if (currentState == 3) {
			newState = 1;
		}
		else if (currentState == 4) {
			newState = 2;
		} else {
			newState = currentState;
		}
	}
	else if (motor.inputMoveDirection.x > 0.0) {
		newState = 3;
	}
	else if (motor.inputMoveDirection.x < 0.0) {
		newState = 4;
	}
	
	if (newState != currentState) {
		animator.SetInteger("State", newState);
	}
}
