#pragma strict

@script RequireComponent (AttackComponent)
@script RequireComponent (CharacterMotor)

private var attackComponent : AttackComponent;
private var motorComponent : CharacterMotor;

// Use this for initialization
function Awake () {
	attackComponent = GetComponent(AttackComponent);
	motorComponent = GetComponent(CharacterMotor);
}

// Update is called once per frame
function Update () {
	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"), 0);
	
	// Apply the direction to the CharacterMotor
	motorComponent.inputMoveDirection = Vector3.Normalize(directionVector);
	
	if (Input.GetButtonDown("Fire1")) {
		attackComponent.TryAttack();
	}
}
