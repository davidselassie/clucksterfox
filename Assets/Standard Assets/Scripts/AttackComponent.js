#pragma strict

public var attackStrength : float = 5.0f;
public var attackRadius : float = 1.25f;
public var attackCycleSeconds : float = 0.75f;

private var lastAttackTimeSeconds : float = Mathf.NegativeInfinity;

function Update () {
	if (Input.GetButtonDown("Fire1")) {
		TryAttack();
	}
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
	var nearbyColliders : Collider[] = Physics.OverlapSphere(transform.position, attackRadius);
	for (var collider : Collider in nearbyColliders) {
		// Don't hurt anyone with the same type tag.
		if (collider.gameObject.tag != gameObject.tag) {
			var livingComponent : LivingComponent = collider.gameObject.GetComponent(LivingComponent);
			if (livingComponent) {
				livingComponent.Hurt(attackStrength);
			}
		}
	}
	lastAttackTimeSeconds = Time.time;
}
