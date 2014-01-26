#pragma strict

public var attackStrength : float = 5.0f;
public var attackRadius : float = 2.25f;
public var attackCycleSeconds : float = 0.75f;
public var attackSound : AudioClip;

private var lastAttackTimeSeconds : float = Mathf.NegativeInfinity;
private var motorComponent : CharacterMotor;
private var animator : Animator;

function Awake () {
	motorComponent = GetComponent(CharacterMotor);
	animator = GetComponent(Animator);
}

public function TryAttack () {
	if (CanAttackNow()) {
		Attack();
	}
}

private function CanAttackNow () : boolean {
	return lastAttackTimeSeconds + attackCycleSeconds < Time.time;
}

private function Attack () {
	var hits : RaycastHit[] = Physics.RaycastAll(gameObject.transform.position, motorComponent.lastInputMoveDirection, attackRadius);
	for (var hit : RaycastHit in hits) {
		// Don't hurt anyone with the same type tag.
		if (hit.collider.gameObject.tag != gameObject.tag) {
			var livingComponent : LivingComponent = hit.collider.gameObject.GetComponent(LivingComponent);
			if (livingComponent) {
				livingComponent.Hurt(attackStrength);
			}
		}
	}
	lastAttackTimeSeconds = Time.time;

	// Use your muscles.
	//gameObject.BroadcastMessage("AttackingNow");
	
	audio.PlayOneShot(attackSound);
}
