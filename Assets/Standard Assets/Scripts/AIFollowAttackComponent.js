#pragma strict

@script RequireComponent (AttackComponent)
@script RequireComponent (CharacterMotor)

public var attackTag : String;

private var attackComponent : AttackComponent;
private var motorComponent : CharacterMotor;

function Awake () {
	attackComponent = GetComponent(AttackComponent);
	motorComponent = GetComponent(CharacterMotor);
}

// Update on the physics timestep.
function FixedUpdate () {
	var attackObject : GameObject = FindAttack();
	if (attackObject) {
		if (Vector3.Distance(transform.position, attackObject.transform.position) <= attackComponent.attackRadius) {
			attackComponent.TryAttack();
		}
		motorComponent.inputMoveDirection = Vector3.Normalize(attackObject.transform.position - transform.position) * motorComponent.maxSpeed;
	} else {
		motorComponent.inputMoveDirection = Vector3.zero;
	}
}

private function FindAttack () : GameObject {
	var closestLivingObject : GameObject = null;
	var closestDistance : float = Mathf.Infinity;
	for (var current : GameObject in GameObject.FindGameObjectsWithTag(attackTag)) {
		var currentDistance : float = Vector3.Distance(transform.position, current.transform.position);
		if (currentDistance < closestDistance && current != gameObject) {
			closestLivingObject = current;
			closestDistance = currentDistance;
		}
	}
	return closestLivingObject;
}
